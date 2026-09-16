import {MigrationInterface, QueryRunner, Table, TableColumn} from 'typeorm'

export class MakeSkillsInOneTable1651688109014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('soft_skills')

        await queryRunner.addColumn('hard_skills', new TableColumn({
            name: 'type',
            type: 'enum',
            enum: ['HARD', 'SOFT']
        }))

        await queryRunner.renameTable('hard_skills', 'skills')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
			name: 'soft_skills',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'description',
					type: 'varchar'
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

        await queryRunner.dropColumn('skills', 'type')

        await queryRunner.renameTable('skills', 'hard_skills')
	}
}