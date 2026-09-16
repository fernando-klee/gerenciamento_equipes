import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateUsers1643123174152 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO users VALUES (1, 'Adriano Baumgartner', 'adriano@testingcompany.com.br', true, '$2a$10$YqwbF6KDRsaZNriNSRWOZ.6NCOR8VisENJ2WexYro5TqIw1Jf0v9i', now(), now());
		`)

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM permissions WHERE id IN (1)')
	}

}
