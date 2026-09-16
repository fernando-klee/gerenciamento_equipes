import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class ChangeTypeToEnglishAtPermissions1651176161216 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(`
			UPDATE permissions SET type=null;
		`)

		await queryRunner.changeColumn('permissions', new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJETOS', 'CLIENTES', 'RECURSOS', 'NOTIFICACOES', 'USUARIOS', 'GRUPO_DE_PERMISSOES',
				'HARD_SKILLS', 'VERSION_NOTES'],
			isNullable: true
		}), new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJECTS', 'CUSTOMERS', 'RESOURCES', 'USERS',
				'PERMISSIONS_GROUP', 'SKILLS', 'VERSION_NOTES', 'GERAL',
				'CONFIGURATIONS_MENU', 'DASHBOARD', 'CUSTOMERS_MENU', 'SKILLS_MENU', 'GERAL_VISION_MENU'
			],
			isNullable: true
		}))

		await queryRunner.query(`
			UPDATE permissions SET type='USERS' where id = 1;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='RESOURCES' where id = 2;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='CUSTOMERS' where id = 3;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='PROJECTS' where id = 4;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='PERMISSIONS_GROUP' where id = 5;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='USERS' where id = 6;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='RESOURCES' where id = 7;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='CUSTOMERS' where id = 8;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='PROJECTS' where id = 9;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='PERMISSIONS_GROUP' where id = 10;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='USERS' where id = 11;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='RESOURCES' where id = 12;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='CUSTOMERS' where id = 13;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='PROJECTS' where id = 14;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='PERMISSIONS_GROUP' where id = 15;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='SKILLS' where id = 16;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='SKILLS' where id = 17;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='SKILLS' where id = 18;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='CUSTOMERS' where id = 19;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='PROJECTS' where id = 20;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='RESOURCES' where id = 21;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='VERSION_NOTES' where id = 22;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='VERSION_NOTES' where id = 23;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='VERSION_NOTES' where id = 24;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='VERSION_NOTES' where id = 25;
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			UPDATE permissions SET type=null;
		`)

		await queryRunner.changeColumn('permissions', new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJECTS', 'CUSTOMERS', 'RESOURCES', 'USERS',
				'PERMISSIONS_GROUP', 'SKILLS', 'VERSION_NOTES', 'GERAL',
				'CONFIGURATIONS_MENU', 'DASHBOARD', 'CUSTOMERS_MENU', 'SKILLS_MENU', 'GERAL_VISION_MENU'
			],
			isNullable: true
		}), new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJETOS', 'CLIENTES', 'RECURSOS', 'NOTIFICACOES', 'USUARIOS',
				'GRUPO_DE_PERMISSOES', 'HARD_SKILLS', 'VERSION_NOTES'],
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
			UPDATE permissions SET type='CLIENTES' where id = 19;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='PROJETOS' where id = 20;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='RECURSOS' where id = 21;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='VERSION_NOTES' where id = 22;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='VERSION_NOTES' where id = 23;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='VERSION_NOTES' where id = 24;
		`)

		await queryRunner.query(`
			UPDATE permissions SET type='VERSION_NOTES' where id = 25;
		`)
	}
}
