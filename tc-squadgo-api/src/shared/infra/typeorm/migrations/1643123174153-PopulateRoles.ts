import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateRoles1643123174153 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO roles VALUES (1, 'Administrador', now(), now());
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM permissions WHERE id IN (1)')
	}

}
