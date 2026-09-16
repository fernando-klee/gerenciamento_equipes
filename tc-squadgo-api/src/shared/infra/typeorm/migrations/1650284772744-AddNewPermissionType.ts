import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddNewPermissionType1650284772744 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('permissions', new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJETOS', 'CLIENTES', 'RECURSOS', 'NOTIFICACOES', 'USUARIOS', 'GRUPO_DE_PERMISSOES', 'HARD_SKILLS'],
			isNullable: true
		}), new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJETOS', 'CLIENTES', 'RECURSOS', 'NOTIFICACOES', 'USUARIOS', 'GRUPO_DE_PERMISSOES', 'HARD_SKILLS', 'VERSION_NOTES'],
			isNullable: true
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('permissions', new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJETOS', 'CLIENTES', 'RECURSOS', 'NOTIFICACOES', 'USUARIOS', 'GRUPO_DE_PERMISSOES', 'HARD_SKILLS', 'VERSION_NOTES'],
			isNullable: true
		}), new TableColumn({
			name: 'type',
			type: 'enum',
			enum: ['PROJETOS', 'CLIENTES', 'RECURSOS', 'NOTIFICACOES', 'USUARIOS', 'GRUPO_DE_PERMISSOES', 'HARD_SKILLS'],
			isNullable: true
		}))
	}

}


