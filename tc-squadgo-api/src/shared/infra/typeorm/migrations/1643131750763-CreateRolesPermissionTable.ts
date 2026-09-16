import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateRolesPermissionTable1643131750763 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'roles_permissions',
			columns: [
				{
					name: 'role_id',
					type: 'integer'
				},
				{
					name: 'permission_id',
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

		await queryRunner.createForeignKey('roles_permissions', new TableForeignKey({
			name: 'RolesPermissionRoleId',
			columnNames: ['role_id'],
			referencedTableName: 'roles',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

		await queryRunner.createForeignKey('roles_permissions', new TableForeignKey({
			name: 'RolesPermissionPermissionId',
			columnNames: ['permission_id'],
			referencedTableName: 'permissions',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('roles_permissions', 'RolesPermissionPermissionId')
		await queryRunner.dropForeignKey('roles_permissions', 'RolesPermissionRoleId')
		await queryRunner.dropTable('roles_permissions')
	}

}
