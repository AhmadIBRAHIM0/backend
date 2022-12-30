import {Body, Injectable, NotFoundException, ValidationPipe} from '@nestjs/common';
import {CreateDepartmentDto} from './dto/create-department.dto';
import {UpdateDepartmentDto} from './dto/update-department.dto';
import {Department} from "./entities/department.entity";
import {DepartmentRepository} from "./department.repository";

@Injectable()
export class DepartmentsService {

    constructor(
        private readonly departmentRepository: DepartmentRepository,
    ) {
    }

    async create(@Body(ValidationPipe) createDepartmentDto: CreateDepartmentDto): Promise<Department> {

        try {
            return await this.departmentRepository.save(createDepartmentDto);
        } catch (e) {
            throw e;

        }
    }

    async findAll(): Promise<Department[]> {

        return await this.departmentRepository.find();
    }

    async findOne(id: number): Promise<Department> {

        const department = await this.departmentRepository.findOne({
            where: {
                id: id,
            }
        })
        if (!department) {
            throw new NotFoundException(`Department not found`);
        }
        return department;
    }

    async update(@Body(ValidationPipe) id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {

        const result = await this.departmentRepository.update(id, updateDepartmentDto);

        if (result.affected && result.affected > 0) {
            const department = await this.findOne(id);
            if (!department) {
                throw new Error(`Unable to retrieve updated department with id ${id}`);
            }
            return department;
        }

        throw new Error(`Failed to update department with id ${id}`);
    }

    async remove(id: number): Promise<void> {

        const result = await this.departmentRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Could not delete, Department not found`);
        }
    }
}
