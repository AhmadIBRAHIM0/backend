import {PartialType} from "@nestjs/mapped-types";
import {IsNotEmpty, IsNumber} from "class-validator";
import {CreateUserDto} from "../../users/dto/create-user.dto";

export class CreateDoctorDto extends PartialType(CreateUserDto) {

    @IsNotEmpty()
    @IsNumber()
    specialityId: number;

    @IsNotEmpty()
    @IsNumber()
    departmentId: number;
}

