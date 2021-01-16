import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddActiveFieldToProduct1609972244935 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('product', new TableColumn({ name: 'active', type: 'boolean', isNullable: true }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('product', 'active');
    }
}
