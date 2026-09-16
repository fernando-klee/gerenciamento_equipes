import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterProjectsTable1646662772459 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('projects', new TableColumn(
			{
				name: 'responsible_id',
				type: 'integer'
			},
		), new TableColumn({
			name: 'responsible_id',
			type: 'integer',
			isNullable: true
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('projects', new TableColumn(
			{
				name: 'responsible_id',
				type: 'integer',
				isNullable: true
			},
		), new TableColumn({
			name: 'responsible_id',
			type: 'integer'
		}))
	}

}
