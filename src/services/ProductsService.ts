import { PlatformMulterFile } from "@tsed/common";
import { Inject, Injectable, Service } from "@tsed/di";
import Product from '../models/Product';
import { ProductsRepository } from '../repositories/ProductsRepository';
import PageControl from "../utils/PageControl";
import ProductDTO from "../utils/ProductDTO";
import ProductsListDTO from "../utils/ProductsListDTO";
import StatusMessage from "../utils/StatusMessage";

@Injectable()
@Service()
export class ProductsService {
	@Inject()
	productsRepository: ProductsRepository;

	async findAll(): Promise<ProductsListDTO[]> {
		const products = await this.productsRepository.findAllWithCategoryName();
		const productsList: ProductsListDTO[] = [];

		products.map(({ id, name, client, status, contact, createdAt, price, category: { name: categoryName } }) => {
			const productList: ProductsListDTO = new ProductsListDTO(id, name, categoryName, client, contact, price, status, createdAt);

			productsList.push(productList);
		})

		return productsList;
	}

	async save(productDTO: ProductDTO, requestImages: PlatformMulterFile[]): Promise<boolean> {		
		try {
			if (requestImages) {
				const images = requestImages.map(image => { return { path: image.filename }});
				Object.assign(productDTO, { images });
			} else {
				Object.assign(productDTO, { images: [] });
			}
	
			if (!productDTO.id) {
				Object.assign(productDTO, { status: 'available', active: true });
			}
	
			const product = this.productsRepository.create(productDTO);
			await this.productsRepository.save(product);			
		} catch (error) {
			console.log(error);

			return false;
		}
		

		return true;
	}

	async bestProducts(): Promise<Product[]> {
		return await this.productsRepository.find();
	}

	async listProducts(pageControl: PageControl): Promise<ProductsListDTO[]> {
		return [];
	}

	async delete(productId: string): Promise<StatusMessage<Boolean>> {
		try {
			let product = await this.productsRepository.findById(productId);

			if (!product) {
				return new StatusMessage(500, 'Produto não encontrado', false);
			}

			product.active = false;

			await this.productsRepository.save(product);
		} catch (error) {
			
			return new StatusMessage(500, `Erro ao excluir produto: ${error.message}`, false);
		}

		return new StatusMessage(200, 'Excluído com sucesso', true);
	}
}
