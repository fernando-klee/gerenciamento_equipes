import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm'

export class RemoveForeignKeyNotification1697648117874 implements MigrationInterface {
	private foreignKey = new TableForeignKey({
    name: 'NotificationsUserId',
    columnNames: ['user_id'],
    referencedTableName: 'users',
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })


    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropForeignKey('notifications', this.foreignKey)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createForeignKey('notifications', this.foreignKey)
    }

}
