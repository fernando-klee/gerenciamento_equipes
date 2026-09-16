import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTableSubstatus1648130020529 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'substatus_status_resource',
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
					type: 'varchar',
					isUnique: true
				},
				{
					name: 'color',
					type: 'varchar',
					isNullable: true
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
			INSERT INTO substatus_status_resource VALUES (1, 'Disponível', 'DISPONIVEL', 'green', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO substatus_status_resource VALUES (2, 'Parcialmente', 'PARCIALMENTE', 'blue', now(), now());
		`)

		await queryRunner.query(`
			INSERT INTO substatus_status_resource VALUES (3, 'Alocado', 'ALOCADO', 'red', now(), now());
		`)

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('substatus_status_resource')
	}

}
