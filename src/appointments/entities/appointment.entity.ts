import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {Patient} from "../../patients/entities/patient.entity";
import {Doctor} from "../../doctors/entities/doctor.entity";
import {Service} from "../../services/entities/service.entity";

@Entity()
export class Appointment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    code: string;

    @Column()
    problem: string;

    @Column()
    notes: string;

    @Column()
    date: Date

    @Column()
    time: Date

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(
        () => Patient, (patient) => patient.appointment
    ) // specify inverse side as a second parameter
    @JoinColumn()
    patient: Patient

    @OneToOne(
        () => Doctor, (doctor) => doctor.appointment
    ) // specify inverse side as a second parameter
    @JoinColumn()
    doctor: Doctor

    @OneToOne(
        () => Service, (service) => service.appointment
    ) // specify inverse side as a second parameter
    @JoinColumn()
    service: Service

}
