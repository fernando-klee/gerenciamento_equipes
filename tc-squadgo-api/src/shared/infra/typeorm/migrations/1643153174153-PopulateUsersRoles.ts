import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateUsersRoles1643153174153 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO users_roles VALUES (1, 1, now(), now());
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM users_roles WHERE user_id = 1 and role_id = 1')
	}

}
