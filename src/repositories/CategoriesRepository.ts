import { EntityRepository, Repository } from "typeorm";
import Category from '../models/Category';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
	async findAll(): Promise<Category[]> {
		return await this.find({ where: { active: true }, order: { name: 'ASC' }});
	}

	async findById(categoryId: string): Promise<Category | undefined> {
		return await this.findOneOrFail({ id: categoryId });
	}

	async findByName(categoryName: string): Promise<Category | undefined> {
		return await this.findOne({ name: categoryName });
	}

	async findByIds(categoriesIds: String[]): Promise<Category[]> {
		return await this.find({ where: { id: categoriesIds }});
	}
}