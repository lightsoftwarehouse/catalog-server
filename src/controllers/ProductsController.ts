import { BodyParams, Controller, Delete, Get, Inject, MultipartFile, PathParams, PlatformMulterFile, Post } from '@tsed/common';
import Product from '../models/Product';
import ProductsService from '../services/ProductsService';
import PageControl from '../helpers/PageControl';
import ProductDTO from '../utils/ProductDTO';
import ProductsListDTO from '../utils/ProductsListDTO';
import StatusMessage from '../utils/StatusMessage';

@Controller('/products')
export class ProductsController {
	@Inject()
	productsService: ProductsService;

	@Get('/')
	async get(): Promise<ProductsListDTO[]> {
		return await this.productsService.findAll();
	}

	@Get('/availables')
	async getAvailables(): Promise<ProductDTO[]> {
		return await this.productsService.findAvailableProducts();
	}

	@Post('/')
	async save(@BodyParams() product: ProductDTO, @MultipartFile('images') images: PlatformMulterFile[]): Promise<boolean> {
		return await this.productsService.save(product, images);
	}

	@Get('/best-products')
	async bestProducts(): Promise<Product[]> {
		return await this.productsService.bestProducts();
	}

	@Post('/list-products')
	async listProducts(@BodyParams() pageControl: PageControl): Promise<ProductsListDTO[]> {
		return await this.productsService.listProducts(pageControl);
	}

	@Get('/:productId')
	async findById(@PathParams('productId') productId: string): Promise<StatusMessage<ProductsListDTO | boolean>> {
		return await this.productsService.findById(productId);
	}

	@Delete('/:productId')
	async delete(@PathParams('productId') productId: string): Promise<StatusMessage<Boolean>> {
		return await this.productsService.delete(productId);
	}
}