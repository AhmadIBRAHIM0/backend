import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {PatientEntity} from "../patients/entities/patient.entity";

export const typeormConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    username: "user",
    password: "root",
    database: "nest",
    entities: [User,PatientEntity],
    synchronize: true
}