import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm'

export class CreateOneOnOneTable1820525129574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'one_on_one',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'description',
                        type: 'text'
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: ['LEADER', 'RESOURCE']
                    },
                    {
                        name: 'leader_id',
                        type: 'integer'
                    },
                    {
                        name: 'resource_id',
                        type: 'integer'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
            }),
        )

        await queryRunner.createForeignKey('one_on_one', new TableForeignKey({
            name: 'FK_OneOnOne_Leader',
            columnNames: ['leader_id'],
            referencedTableName: 'resources',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))

        await queryRunner.createForeignKey('one_on_one', new TableForeignKey({
            name: 'FK_OneOnOne_Resource',
            columnNames: ['resource_id'],
            referencedTableName: 'resources',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('one_on_one', 'FK_OneOnOne_Resource')
        await queryRunner.dropForeignKey('one_on_one', 'FK_OneOnOne_Leader')
        await queryRunner.dropTable('one_on_one')
    }
}
