import { Inject, Injectable, Service } from '@tsed/di';
import Category from '../models/Category';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CategoryListDTO } from '../utils/CategoryListDTO';
import StatusMessage from '../utils/StatusMessage';

@Injectable()
@Service()
export class CategoryService {
	@Inject()
	categoryRepository: CategoriesRepository;

	async findAll(): Promise<CategoryListDTO[]> {
		const categories = await this.categoryRepository.findAll();

		return categories.map(({ id, name, createdAt }) => {
			return { id, name, createdAt }
		});
	}

	async save(category: Category): Promise<boolean> {
		const hasAlreadySameCategory = await this.categoryRepository.findByName(category.name);

		if (hasAlreadySameCategory) {
			return false;
		}

		category.active = true;

		const categoryResponse = await this.categoryRepository.save(category); 

		return !!categoryResponse.id;
	}

	async update(category: Category): Promise<boolean> {
		if (!category.id) {
			return false;
		}

		await this.categoryRepository.save(category); 

		return true;
	}

	async delete(categoryId: string): Promise<StatusMessage<Boolean>> {
		console.log("My ID is: " + categoryId);
		try {
			let category = await this.categoryRepository.findById(categoryId);

			if (!category) {
				return new StatusMessage(500, 'Categoria não encontrada', false);
			}

			category.active = false;

			await this.categoryRepository.save(category);
		} catch (error) {			
			console.log(error);
			return new StatusMessage(500, error.message, false);
		}

		return new StatusMessage(200, '', true);
	}
}