import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateSpecialityDto} from './dto/create-speciality.dto';
import {UpdateSpecialityDto} from './dto/update-speciality.dto';
import {SpecialityRepository} from "./speciality.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Speciality} from "./entities/speciality.entity";

@Injectable()
export class SpecialitiesService {

    constructor(
        @InjectRepository(SpecialityRepository)
        private readonly specialityRepository: SpecialityRepository,
    ) {
    }

    async create(createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {

        return await this.specialityRepository.save(createSpecialityDto);
    }

    async findAll(): Promise<Speciality[]> {

        return await this.specialityRepository.find();
    }

    async findOne(id: number): Promise<Speciality> {

        const speciality = await this.specialityRepository.findOne({
            where: {
                id: id,
            },
        })
        if (!speciality) {
            throw new NotFoundException(`Speciality not found`);
        }
        return speciality;
    }

    async update(id: number, updateSpecialityDto: UpdateSpecialityDto): Promise<Speciality> {

        await this.specialityRepository.update(id, updateSpecialityDto);

        const speciality = this.findOne(id)

        if (!speciality) {
            throw new NotFoundException(`Speciality not found`);
        }
        return speciality;
    }

    async remove(id: number): Promise<void> {

        const result = await this.specialityRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Could not delete, Speciality not found`);
        }
    }
}
