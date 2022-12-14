import {BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Allergy} from "../../allergies/entities/allergy.entity";
import {Appointment} from "../../appointments/entities/appointment.entity";

@Entity()
export class Patient extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    blood_group: string;

    @OneToOne(
        () => User, (user) => user.patient
    ) // specify inverse side as a second parameter
    @JoinColumn()
    user: User

    @ManyToMany(() => Allergy, (allergy) => allergy.patients)
    allergies: Allergy[]

    @OneToOne(
        () => Appointment, (appointment) => appointment.patient
    ) // specify inverse side as a second parameter
    appointment: Appointment

}