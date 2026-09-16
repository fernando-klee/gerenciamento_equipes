import {MigrationInterface, QueryRunner} from 'typeorm'

export class NewTypeProject1720525129574 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		const query = 'ALTER TABLE projects CHANGE COLUMN type type ENUM(\'PR\', \'PF\', \'POC\')'
		await queryRunner.query(query)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const query = 'ALTER TABLE projects CHANGE COLUMN type type ENUM(\'PR\', \'PF\')'

		await queryRunner.query(query)
	}


}
