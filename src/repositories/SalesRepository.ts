import { EntityRepository, Repository } from "typeorm";
import ClientList from "../helpers/ClientList";
import Sale from "../models/Sale";

@EntityRepository(Sale)
export default class SalesRepository extends Repository<Sale> {
	async findAll(): Promise<Sale[]> {
		return await this.find({ relations: ['product', 'product.category'] });
	}

	async findByStatus(status: 'canceled' | 'finished'): Promise<Sale[]> {
		return await this.find({ status });
	}

	async findClients(): Promise<ClientList[]> {
		return await this.find({ select: ['client', 'contact', 'createdAt'] });
	}
}