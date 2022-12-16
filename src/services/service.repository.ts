import {DataSource, Repository} from "typeorm";
import {Service} from "./entities/service.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ServiceRepository extends Repository<Service> {
    constructor(private dataSource: DataSource) {
        super(Service, dataSource.createEntityManager());
    }
}