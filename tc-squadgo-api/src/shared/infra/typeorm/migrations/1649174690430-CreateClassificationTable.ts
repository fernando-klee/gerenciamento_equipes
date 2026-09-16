import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateClassificationTable1649174690430 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'classifications',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'description',
					type: 'varchar',
					isUnique: true
				},
				{
					name: 'created_at',
					type: 'timestamp',
					default: 'now()'
				},
				{
					name: 'updated_at',
					type: 'timestamp',
					default: 'now()'
				}
			]
		}))

		await queryRunner.query(`
			INSERT INTO classifications VALUES (1, 'Designer', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO classifications VALUES (2, 'Gestor', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO classifications VALUES (3, 'Programador', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO classifications VALUES (4, 'Testador', now(), now());
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('classifications')
	}

}
