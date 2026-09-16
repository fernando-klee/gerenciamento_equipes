import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm'

export class AddNewResourceColumns1656599863877 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.addColumns('resources', [
				new TableColumn({
					name: 'admission_date',
					type: 'timestamp',
					isNullable: true
				}),

				new TableColumn({
					name: 'vacation_date',
					type: 'timestamp',
					isNullable: true
				})
			])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropColumn('resources', 'vacation_date')
			await queryRunner.dropColumn('resources', 'admission_date')
    }

}
