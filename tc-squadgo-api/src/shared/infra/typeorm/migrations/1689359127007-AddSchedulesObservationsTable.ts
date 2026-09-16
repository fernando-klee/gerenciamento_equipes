import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class AddSchedulesObservationsTable1689359127007 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'schedules_observations',
			columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
				{
					name: 'description',
					type: 'varchar'
				},
                {
					name: 'relator_id',
					type: 'integer'
				},
                {
					name: 'target_id',
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

		await queryRunner.createForeignKey('schedules_observations', new TableForeignKey({
			name: 'ScheduleObservationResourcesRelatorId',
			columnNames: ['relator_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
        
		await queryRunner.createForeignKey('schedules_observations', new TableForeignKey({
			name: 'ScheduleObservationResourcesTargetId',
			columnNames: ['target_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('schedules_observations', 'ScheduleObservationResourcesTargetId')
        await queryRunner.dropForeignKey('schedules_observations', 'ScheduleObservationResourcesRelatorId')

        await queryRunner.dropTable('schedules_observations')
    }

}
