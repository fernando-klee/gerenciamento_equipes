import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm'

export class AddNewColumnToResourcesTable1656589736954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.addColumn('resources', new TableColumn({
				name: 'leader',
				type: 'boolean',
				default: false
			}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropColumn('resources', 'leader')
    }

}
