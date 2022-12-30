import {Body, Injectable, NotFoundException, ValidationPipe} from '@nestjs/common';
import {CreatePatientDto} from './dto/create-patient.dto';
import {UpdatePatientDto} from './dto/update-patient.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {PatientRepository} from "./patient.repository";
import {UserRepository} from "../users/user.repository";
import {Patient} from "./entities/patient.entity";
import {AllergyRepository} from "../allergies/allergy.repository";
import {Role} from "../users/user-role.enum";
import {Allergy} from "../allergies/entities/allergy.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientsService {

    constructor(
        @InjectRepository(PatientRepository)
        private readonly patientRepository: PatientRepository,
        private readonly userRepository: UserRepository,
        private readonly allergyRepository: AllergyRepository,
    ) {
    }

    async create(@Body(ValidationPipe) createPatientDto: CreatePatientDto): Promise<Patient> {

        // create the user
        createPatientDto.role = Role.PATIENT;
        const salt = await bcrypt.genSalt();
        createPatientDto.password = await this.userRepository.hashPassword(createPatientDto.password, salt);
        const user = await this.userRepository.save(createPatientDto);

        // create the patient
        const patient = new Patient();
        patient.blood_group = createPatientDto.blood_group;
        patient.user = user;

        // create the allergies
        const allergies = this.allergyRepository.create(
            createPatientDto.allergies.map(allergy => ({name: allergy})),
        );
        await this.allergyRepository.save(allergies);
        patient.allergies = allergies;

        // save the patient to the database
        await this.patientRepository.save(patient);

        return patient;
    }

    async findAll(): Promise<Patient[]> {
        return await this.patientRepository.find({
            relations: {
                user: true,
                allergies: true,
            }
        })
    }

    async findOne(id: number): Promise<Patient> {
        const patient = await this.patientRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                user: true,
                allergies: true,
            }
        })
        if (!patient) {
            throw new NotFoundException(`Patient not found`);
        }
        return patient;
    }

    async update(@Body(ValidationPipe) id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {

        updatePatientDto.role = Role.PATIENT

        const patient = await this.findOne(id);

        if (!patient) {
            throw new NotFoundException(`Patient not found. Cannot Update`);
        }

        const {blood_group, allergies, ...updateUserDto} = updatePatientDto;

        patient.blood_group = blood_group;

        const allergyObjects = allergies.map(name => {
            const allergy = new Allergy();
            allergy.name = name;
            return allergy;
        });
        patient.allergies = allergyObjects;
        await this.allergyRepository.save(allergyObjects);

        await this.userRepository.update(patient.user.id, updateUserDto);
        patient.user = await this.userRepository.findOne({
            where: {
                id: patient.user.id,
            }
        });

        return this.patientRepository.save(patient);

    }

    async remove(id: number): Promise<void> {

        const patient = await this.findOne(id)

        if (!patient) {
            throw new NotFoundException(`Patient not found`);
        }
        const allergyIds = patient.allergies.map(allergy => allergy.id);
        await this.allergyRepository.delete(allergyIds);
        await this.userRepository.delete(patient.user.id);
        await this.patientRepository.remove(patient);
    }
}
