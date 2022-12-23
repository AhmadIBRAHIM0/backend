import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PatientRepository} from "./patient.repository";
import {Patient} from "./entities/patient.entity";

@Injectable()
export class PatientsService {

    constructor(
        @InjectRepository(PatientRepository)
        private patientRepository: PatientRepository,
    ) {
    }

    async create(createPatientDto: CreatePatientDto): Promise<Patient> {

            return await this.patientRepository.save(createPatientDto);
    }

    async findAll(): Promise<Patient[]> {

        return await this.patientRepository.find();
    }

    async findOne(id: number): Promise<Patient> {

            const patient = await this.patientRepository.findOne({
                where: {
                    id: id,
                },
            })
            if (!patient) {
                throw new NotFoundException(`Patient not found`);
            }
            return patient;
    }

}
