import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from "./entities/user.entity";
import {UserRepository} from "./user.repository";
import * as bcrypt from "bcrypt";
import {Role} from "./user-role.enum";

@Injectable()
export class UsersSeedService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {
    }

    async createUser(): Promise<void> {
        const seedDataExists = await this.userRepository.findOne({
            where: {
                email: 'admin@medisys.com',
            },
        });
        if (!seedDataExists) {
            const admin = new User();
            admin.email = 'admin@medisys.com'
            const salt = await bcrypt.genSalt();
            admin.password = await bcrypt.hash('$Uk@B1y@t', salt);
            admin.role = Role.ADMIN
            admin.first_name = 'Admin'
            admin.last_name = 'Admin'
            await this.userRepository.save(admin);
        }
    }
}
