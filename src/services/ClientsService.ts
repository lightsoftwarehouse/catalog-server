import { Inject, Injectable, Service } from "@tsed/di";
import ClientList from "../helpers/ClientList";
import { ProductsRepository } from "../repositories/ProductsRepository";
import SalesRepository from "../repositories/SalesRepository";
import StatusMessage from "../utils/StatusMessage";

@Injectable()
@Service()
export default class ClientsService {
	@Inject()
	productsRepository: ProductsRepository;

	@Inject()
	salesRepository: SalesRepository;

	async getClients(): Promise<StatusMessage<ClientList[]>> {
		const clientList: ClientList[] = [];

		const clientsFromProducts = await this.productsRepository.findClients();
		const clientsFromSales = await this.salesRepository.findClients();

		[...clientsFromProducts, ...clientsFromSales].map(({ client, contact, createdAt }) => {
			clientList.push({ client, contact, createdAt });
		});

		return new StatusMessage(200, '', clientList);
	}
}