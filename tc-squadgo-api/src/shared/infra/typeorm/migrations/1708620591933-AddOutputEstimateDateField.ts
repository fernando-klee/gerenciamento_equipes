import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddOutputEstimateDateField1708620591933
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns('resources', [
			new TableColumn({
				name: 'output_estimate',
				type: 'timestamp',
				isNullable: true,
				default: null,
			}),
		])
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('resources', 'output_estimate')
	}
}
