import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateRolesPermissions1643143174153 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 1, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 2, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 3, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 4, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 5, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 6, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 7, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 8, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 9, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 10, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 11, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 12, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 14, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 15, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 16, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 17, now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO roles_permissions VALUES (1, 18, now(), now());
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM roles_permissions WHERE user_id = 1')
	}

}
