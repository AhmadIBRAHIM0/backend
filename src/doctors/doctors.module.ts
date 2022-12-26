import {Module} from '@nestjs/common';
import {DoctorsService} from './doctors.service';
import {DoctorsController} from './doctors.controller';
import {UserRepository} from "../users/user.repository";
import {DoctorRepository} from "./doctor.repository";
import {SpecialityRepository} from "../specialities/speciality.repository";
import {DepartmentRepository} from "../departments/department.repository";
import {ScheduleRepository} from "../schedules/schedule.repository";

@Module({
    controllers: [DoctorsController],
    providers: [
        DoctorsService,
        UserRepository,
        DoctorRepository,
        SpecialityRepository,
        DepartmentRepository,
        ScheduleRepository
    ],
})
export class DoctorsModule {
}
