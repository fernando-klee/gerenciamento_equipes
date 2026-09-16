import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class CreateNewPropAtProjectTable1649706675985 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('projects', new TableColumn({
			name: 'end_estimate',
			type: 'timestamp',
			isNullable: true
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('projects', 'end_estimate')
	}

}
