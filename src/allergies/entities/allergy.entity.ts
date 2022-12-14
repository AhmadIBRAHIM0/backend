import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Patient} from "../../patients/entities/patient.entity";

@Entity()
export class Allergy extends BaseEntity {

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

    @ManyToMany(() => Patient, (patient) => patient.allergies)
    @JoinTable()
    patients: Patient[]

}
