import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
