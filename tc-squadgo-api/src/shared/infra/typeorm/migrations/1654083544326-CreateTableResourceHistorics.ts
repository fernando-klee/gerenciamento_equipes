import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateTableResourceHistorics1654083544326 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'resources_historic',
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
					name: 'type',
					type: 'enum',
					enum: [
						'ADD_PROJECT',
						'REMOVE_PROJECT',
						'CHANGE_PROJECT_HOURS',
						'NEW_FEEDBACK',
						'INCREASE_SKILL',
						'DECREASE_SKILL',
						'STATUS_CHANGED',
						'TYPE_CHANGED',
						'RESOURCE_CREATED',
						'STATUS_INACTIVE']
				},
				{
					name: 'resource_id',
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

		await queryRunner.createForeignKey('resources_historic', new TableForeignKey({
			name: 'ResourcesHistoricResourceId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('resources_historic')
	}

}
