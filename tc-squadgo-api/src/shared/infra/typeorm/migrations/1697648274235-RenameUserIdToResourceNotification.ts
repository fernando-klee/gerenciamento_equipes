import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameUserIdToResourceNotification1697648274235 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE notifications CHANGE user_id resource_id INT(11) NOT NULL;')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE notifications RENAME COLUMN resource_id TO user_id;')
    }
}
