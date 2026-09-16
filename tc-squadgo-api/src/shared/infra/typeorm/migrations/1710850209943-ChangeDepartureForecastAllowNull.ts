import {MigrationInterface, QueryRunner} from 'typeorm'

export class ChangeDepartureForecastAllowNull1710850209943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE resources MODIFY departure_forecast timestamp NULL')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE resources MODIFY departure_forecast timestamp NOT NULL')
    }

}
