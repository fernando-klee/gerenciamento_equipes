import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateResourcesClassificationsTable1649175862621 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'resources_classifications',
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
					name: 'classification_id',
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

		await queryRunner.createForeignKey('resources_classifications', new TableForeignKey({
			name: 'ResourcesClassificationsResourceId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

		await queryRunner.createForeignKey('resources_classifications', new TableForeignKey({
			name: 'ResourcesClassificationsClassificationId',
			columnNames: ['classification_id'],
			referencedTableName: 'classifications',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('resources_classifications', 'ResourcesClassificationsClassificationId')
		await queryRunner.dropForeignKey('resources_classifications', 'ResourcesClassificationsResourceId')
		await queryRunner.dropTable('resources_classifications')
	}

}
