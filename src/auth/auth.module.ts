import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PatientsService} from "../patients/patients.service";
import {PatientRepository} from "../patients/patient.repository";
import {UserRepository} from "../users/user.repository";
import {AllergyRepository} from "../allergies/allergy.repository";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: 'mySecretSecret',
            signOptions: {
                expiresIn: 3600
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PatientsService, PatientRepository, UserRepository, AllergyRepository, JwtStrategy],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule {
}
