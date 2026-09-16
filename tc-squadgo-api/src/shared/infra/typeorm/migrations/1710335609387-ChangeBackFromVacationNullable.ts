import {MigrationInterface, QueryRunner} from 'typeorm'

export class ChangeBackFromVacationNullable1710335609387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE resources MODIFY backFromVacation timestamp NULL DEFAULT NULL;')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE resources MODIFY backFromVacation timestamp NOT NULL;')
    }

}
