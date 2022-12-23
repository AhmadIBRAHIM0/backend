import {DataSource, Repository} from "typeorm";
import {Allergy} from "./entities/allergy.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AllergyRepository extends Repository<Allergy> {
    constructor(private dataSource: DataSource) {
        super(Allergy, dataSource.createEntityManager());
    }
}