import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import {ServiceRepository} from "./service.repository";
import {CategoryRepository} from "../categories/category.repository";

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, ServiceRepository, CategoryRepository]
})
export class ServicesModule {}
