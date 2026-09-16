import { query } from 'express'
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateProjectResourceTable1643896322602 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'projects_resources',
			columns: [
				{
					name: 'project_id',
					type: 'integer'
				},
				{
					name: 'resource_id',
					type: 'integer'
				}
			]
		}))

		await queryRunner.createForeignKey('projects_resources', new TableForeignKey({
			name: 'ProjectsResourcesProjectId',
			columnNames: ['project_id'],
			referencedTableName: 'projects',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

		await queryRunner.createForeignKey('projects_resources', new TableForeignKey({
			name: 'ProjectsResourcesResourceId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('projects_resources', 'ProjectsResourcesProjectId')
		await queryRunner.dropForeignKey('projects_resources', 'ProjectsResourcesResourceId')
		await queryRunner.dropTable('projects_resources')
	}

}
