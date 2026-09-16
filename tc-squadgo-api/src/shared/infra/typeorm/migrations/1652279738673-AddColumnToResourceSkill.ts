import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm'

export class AddColumnToResourceSkill1652279738673 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('resources_skills', new TableColumn({
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
        }))

        await queryRunner.addColumn('resources_skills', new TableColumn({
            name: 'point',
            type: 'integer',
            default: 0
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('resources_skills', 'point')
        await queryRunner.dropColumn('resources_skills', 'id')
    }

}
