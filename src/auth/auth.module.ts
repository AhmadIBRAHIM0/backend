import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {PatientsService} from "../patients/patients.service";
import {PatientRepository} from "../patients/patient.repository";
import {UserRepository} from "../users/user.repository";
import {AllergyRepository} from "../allergies/allergy.repository";

@Module({
  controllers: [AuthController],
  providers: [AuthService, PatientsService, PatientRepository, UserRepository, AllergyRepository]
})
export class AuthModule {}
