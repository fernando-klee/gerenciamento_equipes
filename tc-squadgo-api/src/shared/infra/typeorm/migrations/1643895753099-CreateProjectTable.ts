import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateProjectTable1643895753099 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'projects',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'hours',
					type: 'integer'
				},
				{
					name: 'type',
					type: 'enum',
					enum: ['PF', 'PR']
				},
				{
					name: 'status',
					type: 'enum',
					enum: ['EM_ANDAMENTO', 'A_INICIAR', 'INATIVO']
				},
				{
					name: 'start_estimate',
					type: 'timestamp',
					isNullable: true
				},
				{
					name: 'responsible_id',
					type: 'integer'
				},
				{
					name: 'customer_id',
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

		await queryRunner.createForeignKey('projects', new TableForeignKey({
			name: 'ProjectsResponsibleId',
			columnNames: ['responsible_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		}))

		await queryRunner.createForeignKey('projects', new TableForeignKey({
			name: 'ProjectsCustomerId',
			columnNames: ['customer_id'],
			referencedTableName: 'customers',
			referencedColumnNames: ['id'],
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('projects', 'ProjectsCustomerId')
		await queryRunner.dropForeignKey('projects', 'ProjectsResponsibleId')
		await queryRunner.dropTable('projects')
	}

}
