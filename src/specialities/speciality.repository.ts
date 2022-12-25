import {Speciality} from "./entities/speciality.entity";
import {DataSource, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class SpecialityRepository extends Repository<Speciality> {

    constructor(private dataSource: DataSource) {
        super(Speciality, dataSource.createEntityManager());
    }
}