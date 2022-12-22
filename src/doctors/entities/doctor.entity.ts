import {BaseEntity, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Speciality} from "../../specialities/entities/speciality.entity";
import {Department} from "../../departments/entities/department.entity";
import {Appointment} from "../../appointments/entities/appointment.entity";
import {Schedule} from "../../schedules/entities/schedule.entity";

@Entity('doctors')
export class Doctor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(
        () => User, (user) => user.doctor
    ) // specify inverse side as a second parameter
    @JoinColumn()
    user: User

    @OneToOne(
        () => Speciality, (speciality) => speciality.doctor
    ) // specify inverse side as a second parameter
    @JoinColumn()
    speciality: Speciality

    @OneToOne(
        () => Department, (department) => department.doctor
    ) // specify inverse side as a second parameter
    @JoinColumn()
    department: Department

    @OneToOne(
        () => Appointment, (appointment) => appointment.doctor
    ) // specify inverse side as a second parameter
    appointment: Appointment

    @OneToMany(() => Schedule, (schedule) => schedule.doctor)
    schedules: Schedule[]

}