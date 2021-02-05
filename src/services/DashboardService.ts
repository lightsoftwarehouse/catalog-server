import { Inject, Injectable, Service } from "@tsed/di";
import DashboardDTO from "../helpers/DashboardDTO";
import { ProductsRepository } from "../repositories/ProductsRepository";
import StatusMessage from "../utils/StatusMessage";

@Injectable()
@Service()
export class DashboardService {
	@Inject()
	productsRepository: ProductsRepository;

	async getDashboardData(): Promise<StatusMessage<DashboardDTO>> {
		const products = await this.productsRepository.count() || 0;
		const dashboard: DashboardDTO = { clients: 10, products, sales: 39 };

		return new StatusMessage(200, '', dashboard);
	}

	async search(): Promise<any[]> {
		return [];
	}
}