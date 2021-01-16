import { Default, Required } from '@tsed/schema';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from './Product';

@Entity('category')
export default class Category {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@Required()
	name: string;

	@Column()
	active: boolean;

	@OneToMany(() => Product, product => product.category)
	product: Product[];

	@CreateDateColumn()
	@Default(Date.now)
	@Column()
	createdAt: Date = new Date();
	
	@CreateDateColumn()
	@Default(Date.now)
	@Column()
	updatedAt: Date = new Date();
}