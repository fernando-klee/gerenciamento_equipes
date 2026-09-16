import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class AddLeadersRoomsWeekdaysTable1689353389342 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'leaders_rooms_weekdays',
			columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
				{
					name: 'resource_id',
					type: 'integer'
				},
                {
					name: 'room_resource_weekday_id',
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

        await queryRunner.createForeignKey('leaders_rooms_weekdays', new TableForeignKey({
			name: 'LeadersRoomsWeekDaysResourceId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
        }))
        
		await queryRunner.createForeignKey('leaders_rooms_weekdays', new TableForeignKey({
			name: 'LeadersRoomsWeekDaysRoomResourceWeekDayId',
			columnNames: ['room_resource_weekday_id'],
			referencedTableName: 'rooms_resources_weekdays',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('leaders_rooms_weekdays', 'LeadersRoomsWeekDaysRoomResourceWeekDayId')
        await queryRunner.dropForeignKey('leaders_rooms_weekdays', 'LeadersRoomsWeekDaysResourceId')

        await queryRunner.dropTable('leaders_rooms_weekdays')
    }

}
