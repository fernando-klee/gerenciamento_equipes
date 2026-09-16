import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddActionColumnToPermissionstable1651173099270 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('permissions', new TableColumn({
			name: 'action',
			type: 'enum',
			enum: ['CREATE', 'UPDATE', 'VIEW', 'DELETE', 'NOTIFY']
		}))

		await queryRunner.query(`
			UPDATE permissions SET action='CREATE' where id = 1;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='CREATE' where id = 2;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='CREATE' where id = 3;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='CREATE' where id = 4;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='CREATE' where id = 5;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='UPDATE' where id = 6;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='UPDATE' where id = 7;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='UPDATE' where id = 8;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='UPDATE' where id = 9;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='UPDATE' where id = 10;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='DELETE' where id = 11;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='DELETE' where id = 12;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='DELETE' where id = 13;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='DELETE' where id = 14;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='DELETE' where id = 15;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='CREATE' where id = 16;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='DELETE' where id = 17;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='UPDATE' where id = 18;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='NOTIFY' where id = 19;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='NOTIFY' where id = 20;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='NOTIFY' where id = 21;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='CREATE' where id = 22;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='UPDATE' where id = 23;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='VIEW' where id = 24;
		`)

		await queryRunner.query(`
			UPDATE permissions SET action='NOTIFY' where id = 25;
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('permissions', 'action')
	}

}
