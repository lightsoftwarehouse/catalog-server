import { BodyParams, Controller, Get, Inject, Post } from "@tsed/common";
import DashboardDTO from "../helpers/DashboardDTO";
import PageControl from "../helpers/PageControl";
import { DashboardService } from "../services/DashboardService";
import StatusMessage from "../utils/StatusMessage";

@Controller('/dashboard')
export default class DashboardController {
	@Inject()
	dashboardService: DashboardService;
	
	@Get('/')
	async getDashboardData(): Promise<StatusMessage<DashboardDTO>> {
		return this.dashboardService.getDashboardData();
	}

	@Post('/search')
	async search(@BodyParams() pageControl: PageControl) {
		return true;
	}
}