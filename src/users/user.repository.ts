import {DataSource, Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {Injectable} from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    public async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}