import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdatePermissionsTable1655471213323 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			DELETE FROM permissions where id = 31;
		`)

		await queryRunner.changeColumn('permissions', new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJECTS', 'CUSTOMERS', 'RESOURCES', 'USERS',
				'PERMISSIONS_GROUP', 'SKILLS', 'VERSION_NOTES', 'GERAL',
				'CONFIGURATIONS_MENU', 'DASHBOARD', 'CUSTOMERS_MENU', 'SKILLS_MENU', 'GERAL_VISION_MENU'
			],
			isNullable: true
		}), new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJECTS', 'CUSTOMERS', 'RESOURCES', 'USERS',
				'PERMISSIONS_GROUP', 'SKILLS', 'VERSION_NOTES', 'GERAL',
				'CONFIGURATIONS_MENU', 'DASHBOARD_MENU', 'CUSTOMERS_MENU', 'SKILLS_MENU', 'GERAL_VISION'
			],
			isNullable: true
		}))

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (37, 'view_geral_vision', 'Visualizar dados de visão geral', 'GERAL_VISION', 'VIEW');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (38, 'view_dashboard_menu', 'Visualizar menu do dashboard', 'DASHBOARD_MENU', 'VIEW');
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			DELETE FROM permissions where id = 38;
		`)

		await queryRunner.query(`
			DELETE FROM permissions where id = 37;
		`)

		await queryRunner.changeColumn('permissions', new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJECTS', 'CUSTOMERS', 'RESOURCES', 'USERS',
				'PERMISSIONS_GROUP', 'SKILLS', 'VERSION_NOTES', 'GERAL',
				'CONFIGURATIONS_MENU', 'DASHBOARD_MENU', 'CUSTOMERS_MENU', 'SKILLS_MENU', 'GERAL_VISION'
			],
			isNullable: true
		}), new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJECTS', 'CUSTOMERS', 'RESOURCES', 'USERS',
				'PERMISSIONS_GROUP', 'SKILLS', 'VERSION_NOTES', 'GERAL',
				'CONFIGURATIONS_MENU', 'DASHBOARD', 'CUSTOMERS_MENU', 'SKILLS_MENU', 'GERAL_VISION_MENU'
			],
			isNullable: true
		}))
	}

}
