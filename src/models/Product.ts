import { Default, Required } from '@tsed/schema';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import Category from './Category';
import Image from './Image';
import Sale from './Sale';

@Entity('product')
export default class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Required()
	@Column()
	name: string;

	@Column()
	categoryId: string;

	@Column()
	client: string;

	@Column()
	contact: string;

	@Column({ nullable: true })
	description: string;

	@Column()
	status: 'available' | 'negotiation' | 'finished';

	@ManyToOne(() => Category, category => category.product)
	@JoinColumn({ name: 'categoryId'})
	category: Category;

	@OneToOne(() => Sale, sale => sale.product)
	sale: Sale;
	
	@Required()
	@Column({ type: 'numeric' })
	price: number;

	@OneToMany(() => Image, image => image.product, { cascade: ['insert', 'update']})
	@JoinColumn({ name: 'productId' })
	images?: Image[];

	@Column()
	active: boolean;

	@CreateDateColumn()
	@Default(Date.now)
	createdAt: Date = new Date();
	
	@CreateDateColumn()
	@Default(Date.now)
	updatedAt: Date = new Date();
}