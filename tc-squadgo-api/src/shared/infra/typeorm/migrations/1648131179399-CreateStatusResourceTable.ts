import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateStatusResourceTable1648131179399 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'status_resource',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isGenerated: true,
					isPrimary: true,
					generationStrategy: 'increment'
				},
				{
					name: 'description',
					type: 'varchar'
				},
				{
					name: 'name',
					type: 'varchar'
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
			INSERT INTO status_resource VALUES (1, 'Ativo', 'ATIVO', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO status_resource VALUES (2, 'Férias', 'FERIAS', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO status_resource VALUES (3, 'Treinamento', 'TREINAMENTO', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO status_resource VALUES (4, 'Inativo', 'INATIVO', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO status_resource VALUES (5, 'Outros', 'OUTROS',  now(), now());
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('status_resource')
	}

}
