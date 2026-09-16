import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterTableResources1648046085696 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('resources', new TableColumn(
			{
				name: 'status',
				type: 'enum',
				enum: ['ALOCADO', 'DISPONIVEL', 'PARCIALMENTE', 'TREINAMENTO', 'FERIAS', 'INATIVO']
			},
		), new TableColumn({
			name: 'status',
			type: 'enum',
			enum: ['ALOCADO', 'DISPONIVEL', 'PARCIALMENTE', 'TREINAMENTO', 'FERIAS', 'INATIVO', 'OUTROS']
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('resources', new TableColumn(
			{
				name: 'status',
				type: 'enum',
				enum: ['ALOCADO', 'DISPONIVEL', 'PARCIALMENTE', 'TREINAMENTO', 'FERIAS', 'INATIVO', 'OUTROS']
			},
		), new TableColumn({
			name: 'status',
			type: 'enum',
			enum: ['ALOCADO', 'DISPONIVEL', 'PARCIALMENTE', 'TREINAMENTO', 'FERIAS', 'INATIVO']
		}))
	}

}
