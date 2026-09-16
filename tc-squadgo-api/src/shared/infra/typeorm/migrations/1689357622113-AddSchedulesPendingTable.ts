import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm'

export class AddSchedulesPendingTable1689357622113
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'schedules_pending',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'creator_id',
						type: 'integer',
					},
					{
						name: 'month',
						type: 'integer',
					},
					{
						name: 'status',
						type: 'enum',
						enum: ['APROVADO', 'PENDENTE', 'REPROVADO']
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
			})
		)

		await queryRunner.createForeignKey(
			'schedules_pending',
			new TableForeignKey({
				name: 'SchedulesPendingResourceCreatorId',
				columnNames: ['creator_id'],
				referencedTableName: 'resources',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('schedules_pending', 'SchedulesPendingResourceCreatorId')

        await queryRunner.dropTable('schedules_pending')
    }
}
