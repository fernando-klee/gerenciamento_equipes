import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm'

export class ChangeFeedbackDescriptionColumn1652877479771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('feedbacks', new TableColumn(
            {
                name: 'description',
                type: 'varchar'
            }
        ), new TableColumn(
            {
                name: 'description',
                type: 'varchar',
                length: '500'
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('feedbacks', new TableColumn(
            {
                name: 'description',
                type: 'varchar',
                length: '500'
            }
        ), new TableColumn(
            {
                name: 'description',
                type: 'varchar'
            }
        ))
    }

}
