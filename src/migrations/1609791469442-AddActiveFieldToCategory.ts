import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddActiveFieldToCategory1609791469442 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('category', new TableColumn({ name: 'active', type: 'boolean', isNullable: true }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('category', 'active');
	}
}
