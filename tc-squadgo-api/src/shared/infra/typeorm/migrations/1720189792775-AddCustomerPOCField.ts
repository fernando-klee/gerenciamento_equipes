import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm'

export class AddCustomerPOCField1720189792775 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns('projects', [
			new TableColumn({
				name: 'customer_poc',
				type: 'varchar',
				isNullable: true,
				default: null,
			}),
		])
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('projects', 'customer_poc')
	}

}
