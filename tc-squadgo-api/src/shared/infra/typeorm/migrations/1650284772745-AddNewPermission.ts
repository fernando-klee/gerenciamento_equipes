import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddNewPermission1650284772745 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO permissions VALUES (22, 'create_version_note', 'Criar Notas da Versão', now(), now(), 'VERSION_NOTES');
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (23, 'update_version_note', 'Atualizar Notas da Versão', now(), now(), 'VERSION_NOTES');
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (24, 'view_version_note', 'Visualizar Notas da Versão', now(), now(), 'VERSION_NOTES');
		`)

		await queryRunner.query(`
			INSERT INTO permissions VALUES (25, 'new_version_note_notify', 'Notificação com Novas Notas da Versão', now(), now(), 'NOTIFICACOES');
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM permissions WHERE id IN (22, 23, 24, 25)')
	}

}
