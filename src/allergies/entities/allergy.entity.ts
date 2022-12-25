import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Patient} from "../../patients/entities/patient.entity";

@Entity('allergies')
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

    @ManyToOne(() => Patient, (patient) => patient.allergies
    )
    @JoinTable()
    patient: Patient

}
