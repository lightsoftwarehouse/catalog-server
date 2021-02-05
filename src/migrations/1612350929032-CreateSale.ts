import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSale1612350929032 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'sale',
			columns: [
				{ name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
				{ name: 'client', type: 'varchar', isNullable: false },
				{ name: 'contact', type: 'varchar', isNullable: false },
				{ name: 'price', type: 'numeric', isNullable: false },
				{ name: 'status', type: 'varchar', isNullable: false },
				{ name: 'productId', type: 'uuid', isNullable: false },
				{ name: 'createdAt', type: 'timestamp', default: 'now()' },
				{ name: 'updatedAt', type: 'timestamp', default: 'now()' }			
			],
			foreignKeys: [{
				name: 'ProductId',
				columnNames: ['productId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'product',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE'
			}]
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('sale');
    }
}
