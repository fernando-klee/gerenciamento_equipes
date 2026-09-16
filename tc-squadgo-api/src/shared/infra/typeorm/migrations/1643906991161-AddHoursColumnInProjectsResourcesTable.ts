import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddHoursColumnInProjectsResourcesTable1643906991161 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('projects_resources', new TableColumn({
			name: 'id',
			type: 'integer',
			isPrimary: true,
			isGenerated: true,
			generationStrategy: 'increment'
		}))

		await queryRunner.addColumn('projects_resources', new TableColumn({
			name: 'hours_amount',
			type: 'integer',
			default: 0
		}))

		await queryRunner.addColumn('projects_resources', new TableColumn({
			name: 'created_at',
			type: 'timestamp',
			default: 'now()'
		}))

		await queryRunner.addColumn('projects_resources', new TableColumn({
			name: 'updated_at',
			type: 'timestamp',
			default: 'now()'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('projects_resources', 'hours_amount')
		await queryRunner.dropColumn('projects_resources', 'id')
		await queryRunner.dropColumn('projects_resources', 'created_at')
		await queryRunner.dropColumn('projects_resources', 'updated_at')
	}

}
