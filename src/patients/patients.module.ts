import {Module} from '@nestjs/common';
import {PatientsService} from './patients.service';
import {PatientsController} from './patients.controller';
import {PatientRepository} from "./patient.repository";
import {UserRepository} from "../users/user.repository";
import {AllergyRepository} from "../allergies/allergy.repository";

@Module({
    controllers: [PatientsController],
    providers: [PatientsService, PatientRepository, UserRepository, AllergyRepository]
})
export class PatientsModule {
}
