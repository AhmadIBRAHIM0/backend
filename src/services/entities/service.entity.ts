import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Category} from "../../categories/entities/category.entity";
import {Appointment} from "../../appointments/entities/appointment.entity";

@Entity('services')
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

    @ManyToOne(
        () => Category, (category) => category.services
    ) // specify inverse side as a second parameter
    @JoinColumn()
    category: Category

    @OneToMany(
        () => Appointment, (appointment) => appointment.service
    ) // specify inverse side as a second parameter
    appointments: Appointment[]

}
