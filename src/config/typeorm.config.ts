import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: "user",
    password: "root",
    database: "nest",
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true
}