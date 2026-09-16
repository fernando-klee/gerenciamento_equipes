import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm'

export class AddDepartureForecastField1710423088110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns('resources', [
			new TableColumn({
				name: 'departure_forecast',
				type: 'timestamp',
				default: null,
			}),
		])
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('resources', 'departure_forecast')
	}

}
