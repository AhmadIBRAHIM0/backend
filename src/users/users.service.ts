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
            throw new NotFoundException(`User with not found`);
        }
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
