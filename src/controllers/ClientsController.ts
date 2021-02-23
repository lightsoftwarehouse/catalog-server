import { Controller, Get, Inject } from "@tsed/common";
import ClientList from "../helpers/ClientList";
import ClientsService from "../services/ClientsService";
import StatusMessage from "../utils/StatusMessage";

@Controller('/clients')
export default class ClientsController {
	@Inject()
	clientsService: ClientsService;

	@Get('/')
	async getClients(): Promise<StatusMessage<ClientList[]>> {
		return await this.clientsService.getClients();
	}
}