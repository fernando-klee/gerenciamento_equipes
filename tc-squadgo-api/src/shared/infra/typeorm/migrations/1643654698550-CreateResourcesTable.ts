import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateResourcesTable1643654698550 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'resources',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isGenerated: true,
					isPrimary: true,
					generationStrategy: 'increment'
				},
				{
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'email',
					type: 'varchar',
					isUnique: true
				},
				{
					name: 'photo_url',
					type: 'varchar',
					isNullable: true
				},
				{
					name: 'status',
					type: 'enum',
					enum: ['ALOCADO', 'DISPONIVEL', 'PARCIALMENTE', 'TREINAMENTO', 'FERIAS']
				},
				{
					name: 'hours_amount',
					type: 'integer'
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
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('resources')
	}

}
