import { BodyParams, Controller, Delete, Get, Inject, PathParams, Post, Put, QueryParams } from '@tsed/common';
import { boolean, Returns } from '@tsed/schema';
import Category from '../models/Category';
import { CategoryService } from '../services/CategoryService';
import { CategoryListDTO } from '../utils/CategoryListDTO';
import StatusMessage from '../utils/StatusMessage';

@Controller('/categories')
export class CategoriesController {
	@Inject()
	categoryService: CategoryService;

	@Get('/')
	async findAll(): Promise<CategoryListDTO[]> {
		return await this.categoryService.findAll();
	}

	@Post('/')
	@Returns(500, String).Description("Erro ao salvar")
	@Returns(200, Boolean)
	async save(@BodyParams() category: Category): Promise<boolean> {
		return await this.categoryService.save(category); 				
	}

	@Put('/')
	async update(@BodyParams() category: Category): Promise<boolean> {
		return await this.categoryService.update(category);
	}

	@Get('/:categoryId')
	async delete(@PathParams('categoryId') categoryId: string): Promise<StatusMessage<Boolean>> {
		return await this.categoryService.delete(categoryId);
	}

}