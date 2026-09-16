import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm'

export class ChangeFeedbackDescriptionColumnAgain1652877479772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('feedbacks', new TableColumn(
            {
                name: 'description',
                type: 'varchar',
                length: '500'
            }
        ), new TableColumn(
            {
                name: 'description',
                type: 'varchar',
                length: '1500'
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('feedbacks', new TableColumn(
            {
                name: 'description',
                type: 'varchar',
                length: '1500'
            }
        ), new TableColumn(
            {
                name: 'description',
                type: 'varchar',
                length: '500'
            }
        ))
    }

}
