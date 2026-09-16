import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddRetornoFeriasField1706099363583 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns('resources', [
			new TableColumn({
				name: 'backFromVacation',
                type: 'timestamp',
				default: null
			}),
		])
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('resources', 'backFromVacation')
	}
}
