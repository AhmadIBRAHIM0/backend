import { Module } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { SpecialitiesController } from './specialities.controller';
import {SpecialityRepository} from "./speciality.repository";

@Module({
  controllers: [SpecialitiesController],
  providers: [SpecialitiesService, SpecialityRepository]
})
export class SpecialitiesModule {}
