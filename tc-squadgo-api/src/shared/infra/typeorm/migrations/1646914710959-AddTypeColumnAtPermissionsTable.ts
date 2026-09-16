import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddTypeColumnAtPermissionsTable1646914710959 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('permissions', new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJETOS', 'CLIENTES', 'RECURSOS', 'NOTIFICACOES', 'USUARIOS', 'GRUPO_DE_PERMISSOES', 'HARD_SKILLS'],
			isNullable: true
		}))

		await queryRunner.query(`
			UPDATE permissions SET type='USUARIOS' where id = 1;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='RECURSOS' where id = 2;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='CLIENTES' where id = 3;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='PROJETOS' where id = 4;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='GRUPO_DE_PERMISSOES' where id = 5;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='USUARIOS' where id = 6;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='RECURSOS' where id = 7;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='CLIENTES' where id = 8;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='PROJETOS' where id = 9;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='GRUPO_DE_PERMISSOES' where id = 10;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='USUARIOS' where id = 11;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='RECURSOS' where id = 12;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='CLIENTES' where id = 13;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='PROJETOS' where id = 14;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='GRUPO_DE_PERMISSOES' where id = 15;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='HARD_SKILLS' where id = 16;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='HARD_SKILLS' where id = 17;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='HARD_SKILLS' where id = 18;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='NOTIFICACOES' where id = 19;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='NOTIFICACOES' where id = 20;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='NOTIFICACOES' where id = 21;
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('permissions', 'type')
	}

}


