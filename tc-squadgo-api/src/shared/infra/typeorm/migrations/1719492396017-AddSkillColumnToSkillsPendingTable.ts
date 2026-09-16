import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from 'typeorm'

export class AddSkillColumnToSkillsPendingTable1719492396017 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns('skills_pending', [
			new TableColumn({
				name: 'skill_id',
				type: 'integer',
				isNullable: true,
				default: null,
			}),
		])

        await queryRunner.createForeignKey('skills_pending', new TableForeignKey({
			name: 'SkillIdSkillPending',
			columnNames: ['skill_id'],
			referencedTableName: 'skills',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('skills_pending', 'SkillIdSkillPending')
		await queryRunner.dropColumn('skills_pending', 'skill_id')

    }

}
