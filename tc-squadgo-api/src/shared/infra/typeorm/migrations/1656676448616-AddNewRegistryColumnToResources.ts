import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddNewRegistryColumnToResources1656676448616 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns('resources', [
			new TableColumn({
				name: 'registry',
				type: 'varchar',
				isNullable: true
			})
		])
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('resources', 'registry')
	}

}
