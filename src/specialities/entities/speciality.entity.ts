import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Doctor} from "../../doctors/entities/doctor.entity";

@Entity('specialities')
export class Speciality extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(
        () => Doctor, (doctor) => doctor.speciality
    ) // specify inverse side as a second parameter
    doctors: Doctor[]

}
