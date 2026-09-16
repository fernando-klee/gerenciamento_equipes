import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulatePermissions1643123174154 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO permissions VALUES (1, 'create_user', 'Criar usuário', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (2, 'create_resource', 'Criar recurso', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (3, 'create_customer', 'Criar cliente', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (4, 'create_project', 'Criar projeto', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (5, 'create_role', 'Criar grupo de permissão', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (6, 'edit_user', 'Editar usuário', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (7, 'edit_resource', 'Editar recurso', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (8, 'edit_customer', 'Editar cliente', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (9, 'edit_project', 'Editar projeto', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (10, 'edit_role', 'Editar grupo de permissão', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (11, 'delete_user', 'Deletar usuário', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (12, 'delete_resource', 'Deletar recurso', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (13, 'delete_customer', 'Deletar cliente', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (14, 'delete_project', 'Deletar projeto', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (15, 'delete_role', 'Deletar grupo de permissão', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (16, 'create_hard_skill', 'Criar hard skill', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (17, 'delete_hard_skill', 'Deletar hard skill', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (18, 'update_hard_skill', 'Atualizar hard skill', now(), now());
		`)

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM permissions WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18)')
	}

}
