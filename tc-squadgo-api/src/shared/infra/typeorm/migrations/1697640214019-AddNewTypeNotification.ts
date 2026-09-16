import {MigrationInterface, QueryRunner} from 'typeorm'

export class AddNewTypeNotification1697640214019 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			const query = 'ALTER TABLE notifications CHANGE COLUMN type type ENUM(\'RESOURCES\', \'PROJECTS\', \'CUSTOMERS\', \'VERSION_NOTES\', \'PONTO\')'
			await queryRunner.query(query)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			const query = 'ALTER TABLE notifications CHANGE COLUMN type type ENUM(\'RESOURCES\', \'PROJECTS\', \'CUSTOMERS\', \'VERSION_NOTES\') '

			await queryRunner.query(query)
    }

}
