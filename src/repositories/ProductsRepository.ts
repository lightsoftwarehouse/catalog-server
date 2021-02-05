import { EntityRepository, Repository } from 'typeorm';
import Product from '../models/Product';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
	async findAllWithCategoryName(): Promise<Product[]> {
		return await this.find({ where: { active: true }, relations: ['category'] });
	}

	async findAllActives(): Promise<Product[]> {
		return await this.find({ active: true });
	}

	async findAvailables(): Promise<Product[]> {
		return await this.find({ active: true, status: 'available' });
	}

	async findById(productId: string): Promise<Product | undefined> {
		return await this.findOne({ id: productId }, { relations: ['category', 'images']});
	}

	async findByName(productName: string): Promise<Product | undefined> {
		return await this.findOne({ name: productName });
	}
}