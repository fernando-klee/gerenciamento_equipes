import {MigrationInterface, QueryRunner} from 'typeorm'

export class MakeHoursAndCustomerIdNullableInProject1720115335114 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE projects MODIFY COLUMN hours INT NULL')
		await queryRunner.query('ALTER TABLE projects MODIFY COLUMN customer_id INT NULL')
}

public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE projects MODIFY COLUMN hours INT NOT NULL')
		await queryRunner.query('ALTER TABLE projects MODIFY COLUMN customer_id INT NOT NULL')
}

}
