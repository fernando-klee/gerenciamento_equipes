import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm'

export class CreateSkillsVoteTable1718991129436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'skills_vote',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'id_skills_pending',
                        type: 'int',
                    },
                    {
                        name: 'resource_id',
                        type: 'int',
                    },
                    {
                        name: 'answer',
                        type: 'enum',
                        enum: ['SIM', 'NAO'],
                    },
                    {
                        name: 'reason',
                        type: 'text',
                        isNullable: true,
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

        await queryRunner.createForeignKey('skills_vote', new TableForeignKey({
			name: 'SkillsVoteSkillsPending',
			columnNames: ['id_skills_pending'],
			referencedTableName: 'skills_pending',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

        await queryRunner.createForeignKey('skills_vote', new TableForeignKey({
			name: 'ResourceLeaderResourceId',
			columnNames: ['resource_id'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('skills_vote', 'ResourceLeaderResourceId')
        await queryRunner.dropForeignKey('skills_vote', 'SkillsVoteSkillsPending')
        await queryRunner.dropTable('skills_vote')
    }
}
