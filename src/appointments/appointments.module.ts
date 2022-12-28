import {Module} from '@nestjs/common';
import {AppointmentsService} from './appointments.service';
import {AppointmentsController} from './appointments.controller';
import {AppointmentRepository} from "./appointment.repository";
import {PatientRepository} from "../patients/patient.repository";
import {DoctorRepository} from "../doctors/doctor.repository";
import {ServiceRepository} from "../services/service.repository";

@Module({
    controllers: [AppointmentsController],
    providers: [
        AppointmentsService,
        AppointmentRepository,
        PatientRepository,
        DoctorRepository,
        ServiceRepository
    ]
})
export class AppointmentsModule {
}
