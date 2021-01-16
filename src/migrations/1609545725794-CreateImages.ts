import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateImages1609545725794 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'images',
			columns: [
				{ name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'  }, 
				{ name: 'path', type: 'varchar' }, 
				{ name: 'productId', type: 'uuid'}
			],
			foreignKeys: [{
				name: 'ImageProduct',
				columnNames: ['productId'],
				referencedTableName: 'product',
				referencedColumnNames: ['id'],
				onUpdate: 'cascade',
				onDelete: 'cascade'
			}]
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('images');
    }
}
