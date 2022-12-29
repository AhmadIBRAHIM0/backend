import {Injectable} from '@nestjs/common';
import {CreatePatientDto} from "../patients/dto/create-patient.dto";
import {PatientsService} from "../patients/patients.service";

@Injectable()
export class AuthService {

    constructor(
        private patientsService: PatientsService,
    ) {
    }

    async register(createPatientDto: CreatePatientDto): Promise<void> {

        await this.patientsService.create(createPatientDto);
    }

}
