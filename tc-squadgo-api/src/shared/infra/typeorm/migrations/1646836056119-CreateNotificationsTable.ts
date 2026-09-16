import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateNotificationsTable1646836056119 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'notifications',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isGenerated: true,
					isPrimary: true,
					generationStrategy: 'increment'
				},
				{
					name: 'description',
					type: 'varchar'
				},
				{
					name: 'user_id',
					type: 'integer'
				},
				{
					name: 'readed',
					type: 'boolean',
					default: 'false'
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

		await queryRunner.createForeignKey('notifications', new TableForeignKey({
			name: 'NotificationsUserId',
			columnNames: ['user_id'],
			referencedTableName: 'users',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('notifications', 'NotificationsUserId')
		await queryRunner.dropTable('notifications')
	}

}
