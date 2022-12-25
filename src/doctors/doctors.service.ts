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
    ) {
    }

    async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        console.log(createDoctorDto);

        createDoctorDto.role = Role.DOCTOR
        const user = await this.userRepository.save(createDoctorDto);
        const doctor = new Doctor()
        doctor.user = user
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
        return await this.doctorRepository.save(doctor)
    }

    async findAll(): Promise<Doctor[]> {

        return await this.doctorRepository.find({
            relations: {
                user: true,
                speciality: true,
                department: true,
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
            }
        })
    }

    async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {

        updateDoctorDto.role = Role.DOCTOR

        const {specialityId, departmentId, ...updateUserDto} = updateDoctorDto;
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

        return await this.findOne(id)

    }

    async remove(id: number): Promise<void> {

        const doctor = await this.findOne(id)
        await this.userRepository.delete(doctor.user.id)
        await this.doctorRepository.delete(id)
    }
}
