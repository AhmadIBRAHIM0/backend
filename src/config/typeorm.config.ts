import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Patient} from "../patients/entities/patient.entity";
import {Allergy} from "../allergies/entities/allergy.entity";
import {Department} from "../departments/entities/department.entity";
import {Doctor} from "../doctors/entities/doctor.entity";
import {Service} from "../services/entities/service.entity";
import {Speciality} from "../specialities/entities/speciality.entity";
import {Schedule} from "../schedules/entities/schedule.entity";
import {Category} from "../categories/entities/category.entity";
import {Appointment} from "../appointments/entities/appointment.entity";

export const typeormConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    username: "user",
    password: "root",
    database: "nest",
    entities: [User, Patient, Allergy, Department, Doctor, Service, Speciality, Schedule, Category, Appointment],
    synchronize: true
}