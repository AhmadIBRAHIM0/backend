import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtPayload} from "./jwt-payload.interface";
import {UserRepository} from "../users/user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'mySecretSecret',
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                email: payload.email
            }
        })

        if (!user) {
            throw new UnauthorizedException()
        }

        return user;
    }

}