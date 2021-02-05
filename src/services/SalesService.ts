import { Inject, Injectable, Service } from "@tsed/di";
import { SaleDTO } from "../helpers/SaleDTO";
import SalesList from "../helpers/SalesList";
import Sale from "../models/Sale";
import { ProductsRepository } from "../repositories/ProductsRepository";
import SalesRepository from "../repositories/SalesRepository";
import StatusMessage from "../utils/StatusMessage";

@Injectable()
@Service()
export class SalesService {
	@Inject()
	salesRepository: SalesRepository;

	@Inject()
	productRepository: ProductsRepository;

	async findAll(): Promise<SalesList[]> {
		const sales = await this.salesRepository.findAll();
		const salesList: SalesList[] = [];

		sales.map(({ id, productId, product, contact, price, createdAt }) => {
			const { category: { name: categoryName }, name } = product;

			salesList.push({ productId, saleId: id, name, category: categoryName, contact, price, createdAt  })
		});

		return salesList;
	}

	async save(saleDTO: SaleDTO): Promise<StatusMessage<Boolean>> {
		const product = await this.productRepository.findById(saleDTO.productId);

		if (!product) {
			return new StatusMessage(200, 'Produto não encontrado', false);
		}

		const sale = this.salesRepository.create(saleDTO);
		Object.assign(sale, { status: 'finished' });
		await this.salesRepository.save(sale);

		product.status = 'finished';
		await this.productRepository.save(product);

		return new StatusMessage(200, '', true);
	}

	async findByStatus(status: 'canceled' | 'finished'): Promise<StatusMessage<Sale[]>> {
		const sales = await this.salesRepository.findByStatus(status);
		return new StatusMessage(200, '', sales);
	}

	async cancelSale(saleId: string): Promise<StatusMessage<Boolean>> {
		const sale = await this.salesRepository.findOneOrFail(saleId);

		if (!sale) {
			return new StatusMessage(300, 'Venda não encontrada', false);
		}

		return new StatusMessage(200, '', true);
	}
}