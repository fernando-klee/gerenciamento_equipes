import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateProjectHistoricTable1649246162075 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'projects_historic',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'description',
					type: 'varchar'
				},
				{
					name: 'project_id',
					type: 'integer'
				},
				{
					name: 'type',
					type: 'enum',
					enum: [
						'NEW_PROJECT', 'CLOSING_PROJECT', 'NAME', 'HOURS', 'TYPE', 'STATUS', 'START_ESTIMATE', 'RESPONSIBLE_ID', 'CUSTOMER_ID', 'ADD_RESOURCE',
						'REMOVE_RESOURCE', 'INCREASE_RESOURCE_HOURS', 'DECREASE_RESOURCE_HOURS']
				},
				{
					name: 'created_at',
					type: 'timestamp',
					default: 'now()'
				},
				{
					name: 'updated_at',
					type: 'timestamp',
					default: 'now()'
				}
			]
		}))

		await queryRunner.createForeignKey('projects_historic', new TableForeignKey({
			name: 'ProjectsHistoricProjectId',
			columnNames: ['project_id'],
			referencedTableName: 'projects',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('projects_historic', 'ProjectsHistoricProjectId')
		await queryRunner.dropTable('projects_historic')
	}

}
