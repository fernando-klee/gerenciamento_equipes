import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateResourcesTypesTable1647449913976 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'resources_types',
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
					name: 'type_id',
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

		await queryRunner.createForeignKey('resources_types', new TableForeignKey({
			name: 'ResourcesTypesUserId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

		await queryRunner.createForeignKey('resources_types', new TableForeignKey({
			name: 'ResourcesTypesTypeId',
			columnNames: ['type_id'],
			referencedTableName: 'types',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('resources_types', 'ResourcesTypesTypeId')
		await queryRunner.dropForeignKey('resources_types', 'ResourcesTypesUserId')
		await queryRunner.dropTable('resources_types')
	}

}
