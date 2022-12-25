import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import {DepartmentRepository} from "./department.repository";

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentRepository]
})
export class DepartmentsModule {}
