import {MigrationInterface, QueryRunner} from 'typeorm'

export class RemoveSomePremissions1651849538650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM permissions WHERE id = 12;
        `)

        await queryRunner.query(`
            DELETE FROM permissions WHERE id = 14;
        `)

        await queryRunner.query(`
            DELETE FROM permissions WHERE id = 30;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (12, 'delete_resource', 'Deletar recurso', 'RESOURCES', 'DELETE');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (14, 'delete_project', 'Deletar projeto', 'PROJECTS', 'DELETE');
		`)

		await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (30, 'view_menu_config', 'Visualizar menu configurações', 'CONFIGURATIONS_MENU', 'VIEW');
		`)
    }

}
