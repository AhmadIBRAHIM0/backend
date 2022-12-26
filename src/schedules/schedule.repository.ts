import {DataSource, Repository} from "typeorm";
import {Schedule} from "./entities/schedule.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ScheduleRepository extends Repository<Schedule> {

    constructor(
        private dataSource: DataSource
    ) {
        super(Schedule, dataSource.createEntityManager());
    }
}