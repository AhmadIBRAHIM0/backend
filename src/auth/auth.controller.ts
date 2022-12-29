import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreatePatientDto} from "../patients/dto/create-patient.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/register')
    register(@Body() createPatientDto: CreatePatientDto) {
        return this.authService.register(createPatientDto)
    }
}
