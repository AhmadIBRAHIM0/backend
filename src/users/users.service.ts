import {Body, Injectable, NotFoundException, ValidationPipe} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {User} from "./entities/user.entity";
import {Role} from "./user-role.enum";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
    }

    async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {

        createUserDto.role = Role.ADMIN
        const salt = await bcrypt.genSalt();
        console.log(this.userRepository.hashPassword(createUserDto.password, salt))
        createUserDto.password = await this.userRepository.hashPassword(createUserDto.password, salt);
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

    async update(@Body(ValidationPipe) id: number, updateUserDto: UpdateUserDto): Promise<User> {

        updateUserDto.role = Role.ADMIN
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
