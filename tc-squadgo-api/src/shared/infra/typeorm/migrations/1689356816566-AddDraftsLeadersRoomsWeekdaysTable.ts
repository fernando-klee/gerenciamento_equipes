import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class AddDraftsLeadersRoomsWeekdaysTable1689356816566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'drafts_leaders_rooms_weekdays',
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

        await queryRunner.createForeignKey('drafts_leaders_rooms_weekdays', new TableForeignKey({
            name: 'DraftsLeadersRoomsWeekdaysDraftRoomsResourcesWeekdaysId',
            columnNames: ['room_resource_weekday_id'],
            referencedTableName: 'drafts_rooms_resources_weekdays',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
        
		await queryRunner.createForeignKey('drafts_leaders_rooms_weekdays', new TableForeignKey({
			name: 'DraftsLeadersRoomsWeekdaysResourceId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('drafts_leaders_rooms_weekdays', 'DraftsLeadersRoomsWeekdaysResourceId')
        await queryRunner.dropForeignKey('drafts_leaders_rooms_weekdays', 'DraftsLeadersRoomsWeekdaysDraftRoomsResourcesWeekdaysId')

        await queryRunner.dropTable('drafts_leaders_rooms_weekdays')
    }

}
