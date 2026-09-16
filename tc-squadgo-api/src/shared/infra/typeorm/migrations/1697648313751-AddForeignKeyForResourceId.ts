import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm'

export class AddForeignKeyForResourceId1697648313751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createForeignKey('notifications', new TableForeignKey({
				name: 'NotificationsResourceId',
				columnNames: ['resource_id'],
				referencedTableName: 'resources',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropForeignKey('notifications', 'NotificationsResourceId')
    }

}
