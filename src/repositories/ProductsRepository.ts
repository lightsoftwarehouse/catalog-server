import { EntityRepository, Repository } from 'typeorm';
import Product from '../models/Product';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
	async findAllWithCategoryName(): Promise<Product[]> {
		return await this.find({ relations: ['category'] });
	}

	async findAllActives(): Promise<Product[]> {
		return await this.find({ active: true });
	}

	async findById(productId: string): Promise<Product | undefined> {
		return await this.findOne({ id: productId }, { relations: ['category']});
	}

	async findByName(productName: string): Promise<Product | undefined> {
		return await this.findOne({ name: productName });
	}
}