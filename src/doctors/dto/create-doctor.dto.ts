import {PartialType} from "@nestjs/mapped-types";
import {IsArray, IsNotEmpty, IsNumber} from "class-validator";
import {CreateUserDto} from "../../users/dto/create-user.dto";
import {ISchedule} from "../../schedules/schedule.interface";

export class CreateDoctorDto extends PartialType(CreateUserDto) {

    @IsNotEmpty()
    @IsNumber()
    specialityId: number;

    @IsNotEmpty()
    @IsNumber()
    departmentId: number;

    @IsNotEmpty()
    @IsArray()
    schedules: ISchedule[];
}

