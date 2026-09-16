import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateTableResourceStatus1648134938191 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'resources_status',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isGenerated: true,
					isPrimary: true,
					generationStrategy: 'increment'
				},
				{
					name: 'resource_id',
					type: 'integer'
				},
				{
					name: 'status_id',
					type: 'integer'
				},
				{
					name: 'substatus_id',
					type: 'integer',
					isNullable: true
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

		await queryRunner.createForeignKey('resources_status', new TableForeignKey({
			name: 'ResourcesStatusResourceId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		}))

		await queryRunner.createForeignKey('resources_status', new TableForeignKey({
			name: 'ResourcesStatusStatusId',
			columnNames: ['status_id'],
			referencedTableName: 'status_resource',
			referencedColumnNames: ['id'],
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		}))

		await queryRunner.createForeignKey('resources_status', new TableForeignKey({
			name: 'ResourcesStatusSubstatusId',
			columnNames: ['substatus_id'],
			referencedTableName: 'substatus_status_resource',
			referencedColumnNames: ['id'],
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('resources_status', 'ResourcesStatusSubstatusId')
		await queryRunner.dropForeignKey('resources_status', 'ResourcesStatusStatusId')
		await queryRunner.dropForeignKey('resources_status', 'ResourcesStatusResourceId')
		await queryRunner.dropTable('resources_status')
	}

}
