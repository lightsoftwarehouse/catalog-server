import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProduct1607382752703 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable((new Table({
			name: 'product',
			columns: [
				{ name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
				{ name: 'name', type: 'varchar', isNullable: false },
				{ name: 'description', type: 'varchar', isNullable: true },
				{ name: 'client', type: 'varchar', isNullable: true },
				{ name: 'contact', type: 'varchar', isNullable: false },
				{ name: 'status', type: 'varchar', isNullable: true },
				{ name: 'categoryId', type: 'uuid', isNullable: false },
				{ name: 'price', type: 'numeric', isNullable: false },
				{ name: 'createdAt', type: 'timestamp', default: 'now()' },
				{ name: 'updatedAt', type: 'timestamp', default: 'now()' }			
			], 
			foreignKeys: [{
				name: 'CategoryId',
				columnNames: ['categoryId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'category',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE'
			}]
		})));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('product');
    }
}
