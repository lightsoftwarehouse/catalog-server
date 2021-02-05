import Image from "../models/Image";

export default class ProductsListDTO {
	constructor(
		private id: string,
		private name: string,
		private categoryId: string,
		private category: string,
		private client: string,
		private contact: string,
		private price: number,
		private status: string,
		private images: Image[],
		private createdAt: Date
	) {} 
}