import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddNewTypeFeedback1695917993918 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = 'ALTER TABLE feedbacks CHANGE COLUMN type type ENUM(\'PROJECT\', \'CUSTOMER\', \'PERSONAL\', \'RESOURCE\') NOT NULL'
    await queryRunner.query(query)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = 'ALTER TABLE feedbacks CHANGE COLUMN type type ENUM(\'PROJECT\', \'CUSTOMER\', \'PERSONAL\') NOT NULL'
    await queryRunner.query(query)
  }

}
