import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Category} from "../../categories/entities/category.entity";
import {Appointment} from "../../appointments/entities/appointment.entity";

@Entity()
export class Service extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(
        () => Category, (category) => category.service
    ) // specify inverse side as a second parameter
    @JoinColumn()
    category: Category

    @OneToOne(
        () => Appointment, (appointment) => appointment.service
    ) // specify inverse side as a second parameter
    appointment: Appointment

}
