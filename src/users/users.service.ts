import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {User} from "./entities/user.entity";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {

        return await this.userRepository.save(createUserDto);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {

        const user = await this.userRepository.findOne({
            where: {
                id: id,
            },
        })
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

        await this.userRepository.update(id, updateUserDto);

        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return user;
    }

    async remove(id: number): Promise<void> {

        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        await this.userRepository.delete(id);
    }
}
