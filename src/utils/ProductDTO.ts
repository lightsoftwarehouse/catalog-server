import Image from "../models/Image";

export default interface ProductDTO {
	id?: string;
	name: string;
	client: string;
	contact: string;
	categoryId: string;
	price: number;
	active?: boolean;
	status?: 'available' | 'negotiation' | 'finished';
	images?: Image[];
}