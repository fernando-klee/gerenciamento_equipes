import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateVersionNotesTable1650281472857 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'version_notes',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isGenerated: true,
					isPrimary: true,
					generationStrategy: 'increment'
				},
				{
					name: 'title',
					type: 'varchar'
				},
				{
					name: 'link',
					type: 'varchar'
				},
				{
					name: 'number',
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
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('version_notes')
	}

}
