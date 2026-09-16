import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateUsersRolesTable1643131750764 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'users_roles',
			columns: [
				{
					name: 'user_id',
					type: 'integer'
				},
				{
					name: 'role_id',
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

		await queryRunner.createForeignKey('users_roles', new TableForeignKey({
			name: 'UsersRolesUserId',
			columnNames: ['user_id'],
			referencedTableName: 'users',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

		await queryRunner.createForeignKey('users_roles', new TableForeignKey({
			name: 'UsersRolesRoleId',
			columnNames: ['role_id'],
			referencedTableName: 'roles',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('users_roles', 'UsersRolesRoleId')
		await queryRunner.dropForeignKey('users_roles', 'UsersRolesUserId')
		await queryRunner.dropTable('users_roles')
	}

}
