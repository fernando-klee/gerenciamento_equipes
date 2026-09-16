import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddNewColumnsToCustomers1656676448617 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns('customers', [
			new TableColumn({
				name: 'resource_profile',
				type: 'varchar',
				isNullable: true
			}),
			new TableColumn({
				name: 'start_contract_time',
				type: 'timestamp',
				isNullable: true
			}),
			new TableColumn({
				name: 'end_contract_time',
				type: 'timestamp',
				isNullable: true
			}),
			new TableColumn({
				name: 'responsible_name',
				type: 'varchar',
				isNullable: true
			}),
			new TableColumn({
				name: 'responsible_email',
				type: 'varchar',
				isNullable: true
			}),
			new TableColumn({
				name: 'responsible_phone',
				type: 'varchar',
				isNullable: true
			}),
			new TableColumn({
				name: 'objective',
				type: 'varchar',
				length: '1000',
				isNullable: true
			})
		])
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('customers', 'resource_profile')
		await queryRunner.dropColumn('customers', 'start_contract_time')
		await queryRunner.dropColumn('customers', 'end_contract_time')
		await queryRunner.dropColumn('customers', 'responsible_name')
		await queryRunner.dropColumn('customers', 'responsible_email')
		await queryRunner.dropColumn('customers', 'responsible_phone')
		await queryRunner.dropColumn('customers', 'objective')
	}

}
