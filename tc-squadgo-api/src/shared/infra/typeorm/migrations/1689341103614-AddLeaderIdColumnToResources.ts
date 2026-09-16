import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddLeaderIdColumnToResources1689341103614
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'resources',
			new TableColumn({
				name: 'leader_id',
				type: 'integer',
                isNullable: true
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('resources', 'leader_id')
	}
}
