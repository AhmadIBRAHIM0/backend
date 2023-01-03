import {Injectable} from '@nestjs/common';
import {CreateAppointmentDto} from './dto/create-appointment.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Appointment} from "./entities/appointment.entity";
import {AppointmentRepository} from "./appointment.repository";
import {PatientRepository} from "../patients/patient.repository";
import {DoctorRepository} from "../doctors/doctor.repository";
import {ServiceRepository} from "../services/service.repository";
import * as uuid from 'uuid';
import {User} from "../users/entities/user.entity";

@Injectable()
export class AppointmentsService {

    constructor(
        @InjectRepository(AppointmentRepository)
        private readonly appointmentRepository: AppointmentRepository,
        @InjectRepository(PatientRepository)
        private readonly patientRepository: PatientRepository,
        @InjectRepository(DoctorRepository)
        private readonly doctorRepository: DoctorRepository,
        @InjectRepository(ServiceRepository)
        private readonly serviceRepository: ServiceRepository,
    ) {
    }

    async create(createAppointmentDto: CreateAppointmentDto, user: User): Promise<Appointment> {

        createAppointmentDto.code = uuid.v1()
        const patient = user.patient;
        const doctor = await this.doctorRepository.findOne({
            where: {
                id: createAppointmentDto.doctorId,
            }
        });
        const service = await this.serviceRepository.findOne({
            where: {
                id: createAppointmentDto.serviceId,
            }
        });
        const appointment = this.appointmentRepository.create({
            ...createAppointmentDto,
            patient,
            doctor,
            service,
        })

        return this.appointmentRepository.save(appointment);
    }

    async findAll(): Promise<Appointment[]> {
        return await this.appointmentRepository.find({
            relations: ['patient', 'doctor', 'service']
        });
    }

    async findOne(id: number): Promise<Appointment> {

        try {
            return await this.appointmentRepository.findOneOrFail({
                where: {
                    id: id,
                },
                relations: ['patient', 'doctor', 'service']
            });
        } catch (e) {
            throw e
        }

    }

    async remove(id: number): Promise<void> {
        try {
            await this.appointmentRepository.delete(id);
        } catch (e) {
            throw e
        }
    }
}
