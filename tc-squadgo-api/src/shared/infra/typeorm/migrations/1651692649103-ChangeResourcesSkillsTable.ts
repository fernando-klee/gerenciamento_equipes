import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from 'typeorm'

export class ChangeResourcesSkillsTable1651692649103 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('resources_hard_skills', 'ResourcesHardSkillsResourceId')
        await queryRunner.dropForeignKey('resources_hard_skills', 'ResourcesHardSkillsHardSkillId')

        await queryRunner.renameTable('resources_hard_skills', 'resources_skills')

        await queryRunner.changeColumn('resources_skills',
            new TableColumn({
                name: 'hard_skill_id',
                type: 'integer'
            }),
            new TableColumn({
                name: 'skill_id',
                type: 'integer'
            })
        )

        await queryRunner.createForeignKey('resources_skills', new TableForeignKey({
            name: 'ResourcesSkillsResourceId',
            columnNames: ['resource_id'],
            referencedTableName: 'resources',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))

        await queryRunner.createForeignKey('resources_skills', new TableForeignKey({
            name: 'ResourcesSkillsSkillId',
            columnNames: ['skill_id'],
            referencedTableName: 'skills',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))

        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('resources_skills', 'ResourcesSkillsSkillId')
        await queryRunner.dropForeignKey('resources_skills', 'ResourcesSkillsResourceId')

        await queryRunner.renameTable('resources_skills', 'resources_hard_skills')

        await queryRunner.changeColumn('resources_hard_skills',
            new TableColumn({
                name: 'skill_id',
                type: 'integer'
            }),
            new TableColumn({
                name: 'hard_skill_id',
                type: 'integer'
            })
        )

        await queryRunner.createForeignKey('resources_hard_skills', new TableForeignKey({
            name: 'ResourcesHardSkillsResourceId',
            columnNames: ['resource_id'],
            referencedTableName: 'resources',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
    
        await queryRunner.createForeignKey('resources_hard_skills', new TableForeignKey({
            name: 'ResourcesHardSkillsHardSkillId',
            columnNames: ['hard_skill_id'],
            referencedTableName: 'skills',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))

    }

}
