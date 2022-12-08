import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    username: "user",
    password: "root",
    database: "nest",
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true
}