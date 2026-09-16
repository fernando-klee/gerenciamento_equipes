import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddNewConclusionDate1653305100070 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('projects', new TableColumn({
			name: 'conclusion_date',
			type: 'timestamp',
			isNullable: true
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('projects', 'conclusion_date')
	}

}
