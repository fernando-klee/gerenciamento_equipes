import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateResourcesRolesTable1656676448618 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'resources_roles',
			columns: [
				{
					name: 'resource_id',
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

		await queryRunner.createForeignKey('resources_roles', new TableForeignKey({
			name: 'ResourcesRolesResourceId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

		await queryRunner.createForeignKey('resources_roles', new TableForeignKey({
			name: 'ResourcesRolesRoleId',
			columnNames: ['role_id'],
			referencedTableName: 'roles',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('resources_roles', 'ResourcesRolesRoleId')
		await queryRunner.dropForeignKey('resources_roles', 'ResourcesRolesResourceId')
		await queryRunner.dropTable('resources_roles')
	}

}
