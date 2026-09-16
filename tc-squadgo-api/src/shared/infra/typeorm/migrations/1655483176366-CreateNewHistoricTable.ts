import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateNewHistoricTable1655483176366 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'resource_projects_historic',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'resource_id',
					type: 'integer'
				},
				{
					name: 'project_id',
					type: 'integer'
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

		await queryRunner.createForeignKey('resource_projects_historic', new TableForeignKey({
			name: 'ResourceProjectsHistoricResourceId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

		await queryRunner.createForeignKey('resource_projects_historic', new TableForeignKey({
			name: 'ResourceProjectsHistoricProjectId',
			columnNames: ['project_id'],
			referencedTableName: 'projects',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('resource_projects_historic')
	}

}
