import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddNewPermissions1686834554988 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.changeColumn('permissions', new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJECTS', 'CUSTOMERS', 'RESOURCES', 'USERS', 'PERMISSIONS_GROUP', 'SKILLS', 'VERSION_NOTES', 'GERAL', 'CONFIGURATIONS_MENU', 'DASHBOARD_MENU', 'CUSTOMERS_MENU', 'SKILLS_MENU', 'GERAL_VISION'
			],
			isNullable: true
		}), new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJECTS', 'CUSTOMERS', 'RESOURCES', 'USERS', 'PERMISSIONS_GROUP', 'SKILLS', 'VERSION_NOTES', 'GERAL', 'CONFIGURATIONS_MENU', 'DASHBOARD_MENU', 'CUSTOMERS_MENU', 'SKILLS_MENU', 'GERAL_VISION', 'APP'
			],
			isNullable: true
		}))

		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (39, 'view_email_app', 'Visualizar App do email', 'APP', 'VIEW');
			`)

		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (40, 'view_discord_app', 'Visualizar App do discord', 'APP', 'VIEW');
			`)

		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (41, 'view_whatsapp_app', 'Visualizar App do whatsapp', 'APP', 'VIEW');
			`)

		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (42, 'view_ideias_app', 'Visualizar App de ideias', 'APP', 'VIEW');
			`)

		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (43, 'view_ponto_app', 'Visualizar App do ponto', 'APP', 'VIEW');
			`)

		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (44, 'view_squad_app', 'Visualizar App do squadgo', 'APP', 'VIEW');
			`)

		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (45, 'view_rh_app', 'Visualizar App de recursos humanos', 'APP', 'VIEW');
			`)
		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (46, 'view_doc_app', 'Visualizar App de documentação', 'APP', 'VIEW');
			`)
		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (47, 'view_quali_app', 'Visualizar App de qualigo', 'APP', 'VIEW');
			`)

		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (48, 'view_farm_app', 'Visualizar App de device farm', 'APP', 'VIEW');
			`)

		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (49, 'view_aboutme_app', 'Visualizar App de sobre mim', 'APP', 'VIEW');
			`)


	}

	public async down(queryRunner: QueryRunner): Promise<void> {


		await queryRunner.query(`
				DELETE FROM permissions WHERE id IN (39,40,41,42,43,44,45,46,47,48,49);
			`)


		await queryRunner.changeColumn('permissions', new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJECTS', 'CUSTOMERS', 'RESOURCES', 'USERS', 'PERMISSIONS_GROUP', 'SKILLS', 'VERSION_NOTES', 'GERAL', 'CONFIGURATIONS_MENU', 'DASHBOARD_MENU', 'CUSTOMERS_MENU', 'SKILLS_MENU', 'GERAL_VISION', 'APP'
			],
			isNullable: true
		}), new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJECTS', 'CUSTOMERS', 'RESOURCES', 'USERS', 'PERMISSIONS_GROUP', 'SKILLS', 'VERSION_NOTES', 'GERAL', 'CONFIGURATIONS_MENU', 'DASHBOARD_MENU', 'CUSTOMERS_MENU', 'SKILLS_MENU', 'GERAL_VISION'
			],
			isNullable: true
		}))


	}

}