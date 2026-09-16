import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateResourceHardSkillTable1643719789341 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'resources_hard_skills',
			columns: [
				{
					name: 'resource_id',
					type: 'integer'
				},
				{
					name: 'hard_skill_id',
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
			]
		}))

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
			referencedTableName: 'hard_skills',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('resources_hard_skills', 'ResourcesHardSkillsHardSkillId')
		await queryRunner.dropForeignKey('resources_hard_skills', 'ResourcesHardSkillsResourceId')
		await queryRunner.dropTable('resources_hard_skills')
	}

}
