import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class ChangeStatusResourceTable1649698809665 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			DELETE FROM status_resource where id = 5;
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			INSERT INTO status_resource VALUES (5, 'Outros', 'OUTROS',  now(), now());
		`)
	}

}
