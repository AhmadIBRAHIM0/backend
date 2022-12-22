import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, ManyToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Doctor} from "../../doctors/entities/doctor.entity";

@Entity('schedules')
export class Schedule extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day: string

    @Column()
    start: Date

    @Column()
    end: Date

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(
        () => Doctor, (doctor) => doctor.schedules
    ) // specify inverse side as a second parameter
    @JoinColumn()
    doctor: Doctor

}