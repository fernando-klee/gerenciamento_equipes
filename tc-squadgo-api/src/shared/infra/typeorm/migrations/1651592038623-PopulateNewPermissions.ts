import {MigrationInterface, QueryRunner} from 'typeorm'

export class PopulateNewPermissions1651592038623 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles_permissions VALUES (1, 26, now(), now());
        `)

        await queryRunner.query(`
            INSERT INTO roles_permissions VALUES (1, 27, now(), now());
        `)

        await queryRunner.query(`
            INSERT INTO roles_permissions VALUES (1, 28, now(), now());
        `)

        await queryRunner.query(`
            INSERT INTO roles_permissions VALUES (1, 29, now(), now());
        `)

        await queryRunner.query(`
            INSERT INTO roles_permissions VALUES (1, 30, now(), now());
        `)

        await queryRunner.query(`
            INSERT INTO roles_permissions VALUES (1, 31, now(), now());
        `)

        await queryRunner.query(`
            INSERT INTO roles_permissions VALUES (1, 32, now(), now());
        `)

        await queryRunner.query(`
            INSERT INTO roles_permissions VALUES (1, 33, now(), now());
        `)

        await queryRunner.query(`
            INSERT INTO roles_permissions VALUES (1, 34, now(), now());
        `)

        await queryRunner.query(`
            INSERT INTO roles_permissions VALUES (1, 35, now(), now());
        `)

        await queryRunner.query(`
            INSERT INTO roles_permissions VALUES (1, 36, now(), now());
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM roles_permissions WHERE role_id = 1 and permission_id = 26')
        await queryRunner.query('DELETE FROM roles_permissions WHERE role_id = 1 and permission_id = 27')
        await queryRunner.query('DELETE FROM roles_permissions WHERE role_id = 1 and permission_id = 28')
        await queryRunner.query('DELETE FROM roles_permissions WHERE role_id = 1 and permission_id = 29')
        await queryRunner.query('DELETE FROM roles_permissions WHERE role_id = 1 and permission_id = 30')
        await queryRunner.query('DELETE FROM roles_permissions WHERE role_id = 1 and permission_id = 31')
        await queryRunner.query('DELETE FROM roles_permissions WHERE role_id = 1 and permission_id = 32')
        await queryRunner.query('DELETE FROM roles_permissions WHERE role_id = 1 and permission_id = 33')
        await queryRunner.query('DELETE FROM roles_permissions WHERE role_id = 1 and permission_id = 34')
        await queryRunner.query('DELETE FROM roles_permissions WHERE role_id = 1 and permission_id = 35')
        await queryRunner.query('DELETE FROM roles_permissions WHERE role_id = 1 and permission_id = 36')
    }

}
