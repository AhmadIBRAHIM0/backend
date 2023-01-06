import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreatePatientDto} from "../patients/dto/create-patient.dto";
import {PatientsService} from "../patients/patients.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../users/user.repository";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt-payload.interface";
import {IAuthResponse} from "./auth-response.interface";


@Injectable()
export class AuthService {

    constructor(
        private patientsService: PatientsService,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {
    }

    async register(createPatientDto: CreatePatientDto): Promise<void> {

        await this.patientsService.create(createPatientDto);
    }

    async login(email: string, password: string): Promise<IAuthResponse> {

        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = {email};
        const accessToken = this.jwtService.sign(payload);

        return {
            'accessToken': accessToken,
            "email": user.email,
            'role': user.role
        };
    }

}
