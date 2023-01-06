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
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { SchedulesModule } from './schedules/schedules.module';
import {UsersSeedService} from "./users/users-seed.service";
import {UserRepository} from "./users/user.repository";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./guards/roles.guard";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeormConfig),
      UsersModule,
      SpecialitiesModule,
      DepartmentsModule,
      AllergiesModule,
      CategoriesModule,
      AppointmentsModule,
      ServicesModule,
      AuthModule,
      PatientsModule,
      DoctorsModule,
      SchedulesModule,
  ],
    providers: [
        UsersSeedService,
        UserRepository,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        }
    ],
})
export class AppModule {}
