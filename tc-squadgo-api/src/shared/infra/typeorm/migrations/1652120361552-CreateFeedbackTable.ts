import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateFeedbackTable1652120361552 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'feedbacks',
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
					enum: ['PROJECT', 'CUSTOMER', 'PERSONAL']
				},
				{
					name: 'resource_id',
					type: 'integer'
				},
				{
					name: 'project_id',
					type: 'integer',
					isNullable: true
				},
				{
					name: 'customer_id',
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

		await queryRunner.createForeignKey('feedbacks', new TableForeignKey({
			name: 'FeedbacksResourceId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

		await queryRunner.createForeignKey('feedbacks', new TableForeignKey({
			name: 'FeedbacksProjectId',
			columnNames: ['project_id'],
			referencedTableName: 'projects',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

		await queryRunner.createForeignKey('feedbacks', new TableForeignKey({
			name: 'FeedbacksCustomerId',
			columnNames: ['customer_id'],
			referencedTableName: 'customers',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('feedbacks')
	}

}
