import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeEditToUpdateAtPermissions1651174910167 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			UPDATE permissions SET slug='update_user' where id = 6;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='update_resource' where id = 7;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='update_customer' where id = 8;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='update_project' where id = 9;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='update_role' where id = 10;
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			UPDATE permissions SET slug='edit_role' where id = 10;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='edit_project' where id = 9;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='edit_customer' where id = 8;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='edit_resource' where id = 7;
		`)

		await queryRunner.query(`
			UPDATE permissions SET slug='edit_user' where id = 6;
		`)
	}

}
