export default class ProductsListDTO {
	constructor(
		private id: string,
		private name: string,
		private category: string,
		private client: string,
		private contact: string,
		private price: number,
		private status: string,
		private createdAt: Date
	) {} 
}