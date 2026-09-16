import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class AddRoomsResourcesWeekdaysTable1689351317425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'rooms_resources_weekdays',
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

        await queryRunner.createForeignKey('rooms_resources_weekdays', new TableForeignKey({
            name: 'RoomsResourcesWeekdaysRoomsId',
            columnNames: ['room_id'],
            referencedTableName: 'rooms',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
        
		await queryRunner.createForeignKey('rooms_resources_weekdays', new TableForeignKey({
			name: 'RoomsResourcesWeekdaysResourceCreatorId',
			columnNames: ['creator_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

		await queryRunner.createForeignKey('rooms_resources_weekdays', new TableForeignKey({
			name: 'RoomsResourcesWeekdaysResourceId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('rooms_resources_weekdays', 'RoomsResourcesWeekdaysResourceId')
        await queryRunner.dropForeignKey('rooms_resources_weekdays', 'RoomsResourcesWeekdaysResourceCreatorId')
        await queryRunner.dropForeignKey('rooms_resources_weekdays', 'RoomsResourcesWeekdaysRoomsId')

        await queryRunner.dropTable('rooms_resources_weekdays')
    }

}
