import {PartialType} from '@nestjs/mapped-types';
import {CreatePatientDto} from './create-patient.dto';
import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdatePatientDto extends PartialType(CreatePatientDto) {

    @IsNotEmpty()
    @IsString()
    blood_group: string;

    @IsOptional()
    @IsArray()
    allergies: string[];
}
