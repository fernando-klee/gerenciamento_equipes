import {MigrationInterface, QueryRunner} from 'typeorm'

export class DeleteNotificationsUsers1697648274236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.query(
				'DELETE FROM notifications WHERE resource_id NOT IN (SELECT id FROM resources);'
		)
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
