import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinColumn, ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {Patient} from "../../patients/entities/patient.entity";
import {Doctor} from "../../doctors/entities/doctor.entity";
import {Service} from "../../services/entities/service.entity";

@Entity('appointments')
export class Appointment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    code: string;

    @Column()
    problem: string;

    @Column()
    notes: string;

    @Column()
    date: Date

    @Column()
    time: string

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

    @ManyToOne(
        () => Doctor, (doctor) => doctor.appointments
    ) // specify inverse side as a second parameter
    @JoinColumn()
    doctor: Doctor

    @ManyToOne(
        () => Service, (service) => service.appointments
    ) // specify inverse side as a second parameter
    @JoinColumn()
    service: Service

}
