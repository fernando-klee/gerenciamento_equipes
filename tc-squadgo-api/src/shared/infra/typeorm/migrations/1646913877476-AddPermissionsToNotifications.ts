import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPermissionsToNotifications1646913877476 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO permissions VALUES (19, 'new_customer_notify', 'Notificação com Cliente Novo', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (20, 'new_project_notify', 'Notificação com Projeto Novo', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (21, 'new_resource_notify', 'Notificação com Recurso Novo', now(), now());
	`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM permissions WHERE id IN (21, 20, 19)')
	}

}
