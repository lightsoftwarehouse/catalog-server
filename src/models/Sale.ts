import { Default } from "@tsed/schema";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./Product";

@Entity('sale')
export default class Sale {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => Product)
	@JoinColumn({ name: 'productId' })
	product: Product;

	@Column()
	productId: string;

	@Column()
	client: string;
	
	@Column()
	contact: string;
	
	@Column()
	price: number;

	@Column()
	status: 'canceled' | 'finished';

	@CreateDateColumn()
	@Default(Date.now)
	createdAt: Date = new Date();
	
	@CreateDateColumn()
	@Default(Date.now)
	updatedAt: Date = new Date();
}