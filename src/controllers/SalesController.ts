import { BodyParams, Controller, Delete, Get, Inject, PathParams, Post } from "@tsed/common";
import { SaleDTO } from "../helpers/SaleDTO";
import SalesList from "../helpers/SalesList";
import Sale from "../models/Sale";
import { SalesService } from "../services/SalesService";
import StatusMessage from "../utils/StatusMessage";

@Controller('/sales')
export class SalesController {
	@Inject()
	salesService: SalesService;

	@Get('/')
	async get(): Promise<SalesList[]> {
		return this.salesService.findAll();
	}

	@Post()
	async saveSale(@BodyParams() sale: SaleDTO): Promise<StatusMessage<Boolean>> {
		return this.salesService.save(sale);
	}

	@Delete('/saleId')
	async cancelSale(@PathParams() saleId: string): Promise<StatusMessage<Boolean>> {
		return this.salesService.cancelSale(saleId);
	}
}