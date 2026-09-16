import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique} from 'typeorm'

export class CreateSkillsDepartmentsTable1718820312990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'skills_departments',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'skill_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'department_id',
                    type: 'int',
                    isNullable: false
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
            ]
        }))

        await queryRunner.createForeignKey('skills_departments', new TableForeignKey({
            name: 'SkillsDepartmentsSkillId',
            columnNames: ['skill_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'skills',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))

        await queryRunner.createForeignKey('skills_departments', new TableForeignKey({
            name: 'SkillsDepartmentsDepartmentId',
            columnNames: ['department_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'departments',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('skills_departments', 'SkillsDepartmentsSkillId')
        await queryRunner.dropForeignKey('skills_departments', 'SkillsDepartmentsDepartmentId')

		await queryRunner.dropTable('skills_departments')
    }

}
