import {DataSource, Repository} from "typeorm";
import {Doctor} from "./entities/doctor.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DoctorRepository extends Repository<Doctor> {

    constructor(private dataSource: DataSource) {
        super(Doctor, dataSource.createEntityManager());
    }
}