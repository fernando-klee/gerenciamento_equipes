import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddStatusToCustomerTable1643648126853 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('customers', new TableColumn({
			name: 'status',
			type: 'enum',
			enum: ['ATIVO', 'INATIVO']
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('customers', 'status')
	}

}
