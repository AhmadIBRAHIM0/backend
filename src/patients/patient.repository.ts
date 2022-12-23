import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {Patient} from "./entities/patient.entity";


@Injectable()
export class PatientRepository extends Repository<Patient> {
    constructor(private dataSource: DataSource) {
        super(Patient, dataSource.createEntityManager());
    }
}