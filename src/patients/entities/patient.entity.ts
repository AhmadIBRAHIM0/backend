import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity()
export class PatientEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    blood_group:string;

    @OneToOne(
        () => User, (user) => user.patient
    ) // specify inverse side as a second parameter
    user: User
}