import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {UserRepository} from "./user.repository";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        AuthModule
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
})
export class UsersModule {
}
