import {IsNotEmpty, IsString} from "class-validator";

export class CreateServiceDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    categoryId: number;
}
