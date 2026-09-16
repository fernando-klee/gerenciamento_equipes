import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateTypesTable1647451415453 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO types VALUES (1, 'Manual', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO types VALUES (2, 'Automação', now(), now());
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM types WHERE id IN (2, 1)')
	}

}
