import {MigrationInterface, QueryRunner} from 'typeorm'

export class AddPermissionsWorkSchedule1696015361695 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
				INSERT INTO permissions (id, slug, description, type, action)
					VALUES (50, 'view_work_schedule', 'Visualizar escalas', 'WORK_SCHEDULES', 'VIEW');
			`)

			await queryRunner.query(`
			INSERT INTO permissions (id, slug, description, type, action)
				VALUES (51, 'create_work_schedule', 'Criar escalas', 'WORK_SCHEDULES', 'CREATE');
		`)

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
				DELETE FROM permissions WHERE id IN (50, 51);
			`)

	}

}
