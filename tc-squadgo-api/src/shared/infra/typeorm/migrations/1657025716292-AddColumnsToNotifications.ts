import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm'

export class AddColumnsToNotifications1657025716292 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.addColumns('notifications', [
				new TableColumn({
					name: 'type',
					type: 'enum',
					enum: ['RESOURCES', 'PROJECTS', 'CUSTOMERS', 'VERSION_NOTES'],
					isNullable: true
				}),
				new TableColumn({
					name: 'object_id',
					type: 'integer',
					isNullable: true
				})
			])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropColumn('notifications', 'type')
			await queryRunner.dropColumn('notifications', 'object_id')
    }

}
