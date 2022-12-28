import {DataSource, Repository} from "typeorm";
import {Appointment} from "./entities/appointment.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AppointmentRepository extends Repository<Appointment> {

    constructor(private dataSource: DataSource) {
        super(Appointment, dataSource.createEntityManager());
    }
}