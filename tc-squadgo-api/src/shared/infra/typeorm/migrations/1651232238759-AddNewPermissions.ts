import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddNewPermissions1651232238759 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (26, 'view_users', 'Visualizar usuários', 'USERS', 'VIEW');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (27, 'view_customers', 'Visualizar clientes', 'CUSTOMERS', 'VIEW');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (28, 'view_resources', 'Visualizar recursos', 'RESOURCES', 'VIEW');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (29, 'view_roles', 'Visualizar grupos de permissões', 'PERMISSIONS_GROUP', 'VIEW');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (30, 'view_menu_config', 'Visualizar menu configurações', 'CONFIGURATIONS_MENU', 'VIEW');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (31, 'view_dashboard', 'Visualizar dados do dashboard', 'DASHBOARD', 'VIEW');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (32, 'view_menu_customers', 'Visualizar menu clientes', 'CUSTOMERS_MENU', 'VIEW');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (33, 'view_menu_skills', 'Visualizar menu skills', 'SKILLS_MENU', 'VIEW');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (34, 'view_skills', 'Visualizar skills', 'SKILLS', 'VIEW');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (35, 'view_projects', 'Visualizar projetos', 'PROJECTS', 'VIEW');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (36, 'view_menu_geral_vision', 'Visualizar visão geral', 'PROJECTS', 'VIEW');
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='create_skill', description='Criar skill' where id = 16;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='delete_skill', description='Deletar skill' where id = 17;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='update_skill', description='Atualizar skill' where id = 18;
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			DELETE FROM permissions WHERE id IN (26,27,28,29,30,31,32,33,34,35,36);
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='create_hard_skill', description='Criar hard skill' where id = 16;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='delete_hard_skill', description='Deletar hard skill' where id = 17;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='update_hard_skill', description='Atualizar hard skill' where id = 18;
		`)
	}

}
