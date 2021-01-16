import { EntityRepository, Repository } from 'typeorm';
import Category from '../models/Category';
import Product from '../models/Product';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
	async findAllWithCategoryName(): Promise<any[]> {
		return await this.find({ relations: ['category']});
		return await 
			this.createQueryBuilder('p')
					.innerJoin('p.categoryId', 'c', 'p.categoryId = c.id')
				.getMany();
	}

	async findAllActives(): Promise<Product[]> {
		return await this.find({ active: true });
	}

	async findById(productId: string): Promise<Product | undefined> {
		return await this.findOne({ id: productId });
	}

	async findByName(productName: string): Promise<Product | undefined> {
		return await this.findOne({ name: productName });
	}
}