import {MigrationInterface, QueryRunner} from 'typeorm'

export class AddNewTypeCreateFeedback1695928408178 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
    const query = 'ALTER TABLE resources_historic CHANGE COLUMN type type ENUM(\'ADD_PROJECT\', \'REMOVE_PROJECT\', \'CHANGE_PROJECT_HOURS\', \'NEW_FEEDBACK\', \'INCREASE_SKILL\', \'DECREASE_SKILL\', \'STATUS_CHANGED\', \'TYPE_CHANGED\', \'RESOURCE_CREATED\', \'STATUS_INACTIVE\', \'BECOME_RESPONSIBLE\', \'NEW_FEEDBACK_RESOURCE\') NOT NULL'
    await queryRunner.query(query)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		const query = 'ALTER TABLE resources_historic CHANGE COLUMN type type ENUM(\'ADD_PROJECT\', \'REMOVE_PROJECT\', \'CHANGE_PROJECT_HOURS\', \'NEW_FEEDBACK\', \'INCREASE_SKILL\', \'DECREASE_SKILL\', \'STATUS_CHANGED\', \'TYPE_CHANGED\', \'RESOURCE_CREATED\', \'STATUS_INACTIVE\', \'BECOME_RESPONSIBLE\') NOT NULL'
    await queryRunner.query(query)
  }

}
