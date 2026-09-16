import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class AddDraftsRoomsResourcesWeekdaysTable1689355449862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'drafts_rooms_resources_weekdays',
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
					name: 'room_id',
					type: 'integer'
				},
                {
					name: 'week_day',
					type: 'integer'
				},
                {
					name: 'creator_id',
					type: 'integer'
				},
                {
					name: 'month',
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

        await queryRunner.createForeignKey('drafts_rooms_resources_weekdays', new TableForeignKey({
            name: 'DraftsRoomsResourcesWeekdaysResourceId',
            columnNames: ['resource_id'],
            referencedTableName: 'resources',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
        
		await queryRunner.createForeignKey('drafts_rooms_resources_weekdays', new TableForeignKey({
			name: 'DraftsRoomsResourcesWeekdaysRoomId',
			columnNames: ['room_id'],
			referencedTableName: 'rooms',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

        await queryRunner.createForeignKey('drafts_rooms_resources_weekdays', new TableForeignKey({
            name: 'DraftsRoomsResourcesWeekdaysResourceCreatorId',
            columnNames: ['creator_id'],
            referencedTableName: 'resources',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
	}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('drafts_rooms_resources_weekdays', 'DraftsRoomsResourcesWeekdaysResourceCreatorId')
        await queryRunner.dropForeignKey('drafts_rooms_resources_weekdays', 'DraftsRoomsResourcesWeekdaysRoomId')
        await queryRunner.dropForeignKey('drafts_rooms_resources_weekdays', 'DraftsRoomsResourcesWeekdaysResourceId')

        await queryRunner.dropTable('drafts_rooms_resources_weekdays')
    }

}
