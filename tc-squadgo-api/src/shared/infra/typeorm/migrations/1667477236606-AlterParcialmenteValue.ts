import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm'

export class AlterParcialmenteValue1667477236606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('UPDATE substatus_status_resource SET description = "Parcialmente Disponível" WHERE id = 2')

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('UPDATE substatus_status_resource SET description = "Parcialmente" WHERE id = 2')
    }

}
