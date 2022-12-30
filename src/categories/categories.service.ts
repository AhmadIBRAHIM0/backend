import {Body, Injectable, NotFoundException, ValidationPipe} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryRepository} from "./category.repository";
import {Category} from "./entities/category.entity";

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository,
    ) {
    }

    async create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto): Promise<Category> {

        return await this.categoryRepository.save(createCategoryDto);
    }

    async findAll(): Promise<Category[]> {

        return await this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {

        const category = await this.categoryRepository.findOne({
            where: {
                id: id,
            },
        })
        if (!category) {
            throw new NotFoundException(`Category not found`);
        }
        return category;
    }

    async update(@Body(ValidationPipe) id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {

        await this.categoryRepository.update(id, updateCategoryDto);

        const category = this.findOne(id)

        if (!category) {
            throw new NotFoundException(`Category not found`);
        }
        return category;
    }

    async remove(id: number): Promise<void> {

        const result = await this.categoryRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Could not delete, Category not found`);
        }
    }
}
