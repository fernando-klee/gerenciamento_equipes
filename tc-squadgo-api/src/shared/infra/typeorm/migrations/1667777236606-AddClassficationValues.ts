import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class AddClassficationValues1667777236606 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(`
			INSERT INTO classifications VALUES (5, 'VideoMaker', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO classifications VALUES (6, 'Outros', now(), now());
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM classifications WHERE id = 5')
		await queryRunner.query('DELETE FROM classifications WHERE id = 6')
	}

}
