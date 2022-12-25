import {PartialType} from "@nestjs/mapped-types";
import {CreateUserDto} from "../../users/dto/create-user.dto";
import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreatePatientDto extends PartialType(CreateUserDto){

    @IsNotEmpty()
    @IsString()
    blood_group: string;

    @IsOptional()
    @IsArray()
    allergies: string[];
}
