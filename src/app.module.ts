import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfig} from "./config/typeorm.config";
import { UsersModule } from './users/users.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { DepartmentsModule } from './departments/departments.module';
import { AllergiesModule } from './allergies/allergies.module';
import { CategoriesModule } from './categories/categories.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(typeormConfig),
      UsersModule,
      SpecialitiesModule,
      DepartmentsModule,
      AllergiesModule,
      CategoriesModule,
      AppointmentsModule,
      ServicesModule
  ],
})
export class AppModule {}

// TODO - change relations "one to one"
