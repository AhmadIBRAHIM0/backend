import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateAppointmentDto {

    code: string;

    @IsString()
    @IsNotEmpty()
    problem: string;

    @IsString()
    notes: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty()
    time: string;

    @IsNumber()
    @IsNotEmpty()
    patientId: number;

    @IsNumber()
    @IsNotEmpty()
    doctorId: number;

    @IsNumber()
    @IsNotEmpty()
    serviceId: number;
}
