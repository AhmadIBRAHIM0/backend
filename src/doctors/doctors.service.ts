import {Injectable} from '@nestjs/common';
import {CreateDoctorDto} from './dto/create-doctor.dto';
import {UpdateDoctorDto} from './dto/update-doctor.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DoctorRepository} from "./doctor.repository";
import {UserRepository} from "../users/user.repository";
import {Role} from "../users/user-role.enum";
import {Doctor} from "./entities/doctor.entity";
import {SpecialityRepository} from "../specialities/speciality.repository";
import {DepartmentRepository} from "../departments/department.repository";
import {ScheduleRepository} from "../schedules/schedule.repository";
import {Schedule} from "../schedules/entities/schedule.entity";

@Injectable()
export class DoctorsService {

    constructor(
        @InjectRepository(DoctorRepository)
        private readonly doctorRepository: DoctorRepository,
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        @InjectRepository(SpecialityRepository)
        private readonly specialityRepository: SpecialityRepository,
        @InjectRepository(DepartmentRepository)
        private readonly departmentRepository: DepartmentRepository,
        @InjectRepository(ScheduleRepository)
        private readonly scheduleRepository: ScheduleRepository,
    ) {
    }

    async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {

        createDoctorDto.role = Role.DOCTOR
        const doctor = new Doctor()
        doctor.speciality = await this.specialityRepository.findOne({
            where: {
                id: createDoctorDto.specialityId,
            }
        })
        doctor.department = await this.departmentRepository.findOne({
            where: {
                id: createDoctorDto.departmentId,
            }
        })
        const schedules = this.scheduleRepository.create(createDoctorDto.schedules.map(schedule => ({
            start: schedule.start,
            end: schedule.end,
            day: schedule.day,
        })))

        doctor.schedules = await this.scheduleRepository.save(schedules)

        doctor.user = await this.userRepository.save(createDoctorDto)

        return await this.doctorRepository.save(doctor)
    }

    async findAll(): Promise<Doctor[]> {

        return await this.doctorRepository.find({
            relations: {
                user: true,
                speciality: true,
                department: true,
                schedules: true,
            }
        })
    }

    async findOne(id: number): Promise<Doctor> {

        return await this.doctorRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                user: true,
                speciality: true,
                department: true,
                schedules: true,
            }
        })
    }

    async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {

        updateDoctorDto.role = Role.DOCTOR

        const {specialityId, departmentId, schedules, ...updateUserDto} = updateDoctorDto;
        const doctor = await this.findOne(id)
        await this.userRepository.update(doctor.user.id, updateUserDto)
        await this.doctorRepository.update(doctor.id, {
            speciality: await this.specialityRepository.findOne({
                where: {
                    id: specialityId,
                }
            }),
            department: await this.departmentRepository.findOne({

                where: {
                    id: departmentId,
                }
            })
        })
        await this.scheduleRepository.remove(doctor.schedules);

        const schedulesObject = schedules.map(schedule => {
            const scheduleObject = new Schedule()
            scheduleObject.start = schedule.start
            scheduleObject.end = schedule.end
            scheduleObject.day = schedule.day
            return scheduleObject
        })

        // Set the schedules for the doctor
        doctor.schedules = schedulesObject;

        // Save the schedules
        await this.scheduleRepository.save(schedulesObject);

        // Save the updated doctor
        await this.doctorRepository.save(doctor);


        return await this.findOne(id)

    }

    async remove(id: number): Promise<void> {

        const doctor = await this.findOne(id)
        await this.userRepository.delete(doctor.user.id)
        await this.scheduleRepository.remove(doctor.schedules)
        await this.doctorRepository.delete(id)
    }
}
