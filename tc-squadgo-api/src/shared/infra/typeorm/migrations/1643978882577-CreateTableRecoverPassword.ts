import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateTableRecoverPassword1643978882577 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'password_recover',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'user_id',
					type: 'integer'
				},
				{
					name: 'token',
					type: 'varchar'
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

		await queryRunner.createForeignKey('password_recover', new TableForeignKey({
			name: 'PasswordRecoverUserId',
			columnNames: ['user_id'],
			referencedTableName: 'users',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('password_recover', 'PasswordRecoverUserId')
		await queryRunner.dropTable('password_recover')
	}

}
