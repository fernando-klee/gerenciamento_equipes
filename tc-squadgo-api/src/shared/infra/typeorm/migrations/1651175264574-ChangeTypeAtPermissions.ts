import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeTypeAtPermissions1651175264574 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			UPDATE permissions SET slug='notify_new_customer', type='CLIENTES' where id = 19;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='notify_new_project', type='PROJETOS' where id = 20;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='notify_new_resource', type='RECURSOS' where id = 21;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='notify_new_version_note', type='VERSION_NOTES' where id = 25;
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			UPDATE permissions SET slug='new_version_note_notify', type='NOTIFICACOES' where id = 25;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='new_resource_notify', type='NOTIFICACOES' where id = 21;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='new_project_notify', type='NOTIFICACOES' where id = 20;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='new_customer_notify', type='NOTIFICACOES' where id = 19;
		`)
	}

}
