import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterProjectTable1646330490772 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('projects', new TableColumn({
			name: 'status',
			type: 'enum',
			enum: ['EM_ANDAMENTO', 'A_INICIAR', 'INATIVO']
		}), new TableColumn({
			name: 'status',
			type: 'enum',
			enum: ['EM_ANDAMENTO', 'A_INICIAR', 'CONCLUIDO']
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('projects', new TableColumn({
			name: 'status',
			type: 'enum',
			enum: ['EM_ANDAMENTO', 'A_INICIAR', 'CONCLUIDO']
		}), new TableColumn({
			name: 'status',
			type: 'enum',
			enum: ['EM_ANDAMENTO', 'A_INICIAR', 'INATIVO']
		}))
	}

}
