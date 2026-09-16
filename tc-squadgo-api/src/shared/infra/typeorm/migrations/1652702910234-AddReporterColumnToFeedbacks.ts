import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddReporterColumnToFeedbacks1652702910234 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('feedbacks', new TableColumn({
			name: 'reporter_id',
			type: 'integer',
			isNullable: true
		}))

		await queryRunner.createForeignKey('feedbacks', new TableForeignKey({
			name: 'FeedbacksReporterId',
			columnNames: ['reporter_id'],
			referencedTableName: 'users',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('feedbacks', 'FeedbacksReporterId')
		await queryRunner.dropColumn('feedbacks', 'reporter_id')
	}

}
