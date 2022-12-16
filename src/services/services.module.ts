import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import {ServiceRepository} from "./service.repository";

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, ServiceRepository]
})
export class ServicesModule {}
