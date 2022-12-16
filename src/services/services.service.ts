import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateServiceDto} from './dto/create-service.dto';
import {UpdateServiceDto} from './dto/update-service.dto';
import {ServiceRepository} from "./service.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Service} from "./entities/service.entity";

@Injectable()
export class ServicesService {

    constructor(
        @InjectRepository(ServiceRepository)
        private serviceRepository: ServiceRepository,
    ) {
    }

    async create(createServiceDto: CreateServiceDto): Promise<Service> {

        return await this.serviceRepository.save(createServiceDto);

    }

    async findAll(): Promise<Service[]> {

        return await this.serviceRepository.find();
    }

    async findOne(id: number): Promise<Service> {

        const service = await this.serviceRepository.findOne({
            where: {
                id: id,
            },
        })
        if (!service) {
            throw new NotFoundException(`Service not found`);
        }
        return service;
    }

    async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {

        // TODO : update service
        // await this.serviceRepository.update(id, updateServiceDto);
        console.log(updateServiceDto['categoryId'])

        const service = this.findOne(id)

        if (!service) {
            throw new NotFoundException(`Service not found`);
        }
        return service;
    }

    async remove(id: number): Promise<void> {

        const result = await this.serviceRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Could not delete, Service not found`);
        }
    }
}
