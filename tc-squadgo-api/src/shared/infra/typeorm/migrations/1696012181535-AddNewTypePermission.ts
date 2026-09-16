import {MigrationInterface, QueryRunner} from 'typeorm'

export class AddNewTypePermission1696012181535 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = 'ALTER TABLE permissions CHANGE COLUMN type type ENUM(\'PROJECTS\', \'CUSTOMERS\', \'RESOURCES\', \'USERS\', \'PERMISSIONS_GROUP\', \'SKILLS\', \'VERSION_NOTES\', \'GERAL\', \'CONFIGURATIONS_MENU\', \'DASHBOARD_MENU\', \'CUSTOMERS_MENU\', \'SKILLS_MENU\', \'GERAL_VISION\', \'APP\', \'WORK_SCHEDULES\') NOT NULL'
    await queryRunner.query(query)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		const query = 'ALTER TABLE permissions CHANGE COLUMN type type ENUM(\'PROJECTS\', \'CUSTOMERS\', \'RESOURCES\', \'USERS\', \'PERMISSIONS_GROUP\', \'SKILLS\', \'VERSION_NOTES\', \'GERAL\', \'CONFIGURATIONS_MENU\', \'DASHBOARD_MENU\', \'CUSTOMERS_MENU\', \'SKILLS_MENU\', \'GERAL_VISION\', \'APP\') NOT NULL'
    await queryRunner.query(query)
	}
}
