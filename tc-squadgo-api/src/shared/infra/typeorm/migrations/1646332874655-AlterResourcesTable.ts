import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterResourcesTable1646332874655 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('resources', new TableColumn(
			{
				name: 'status',
				type: 'enum',
				enum: ['ALOCADO', 'DISPONIVEL', 'PARCIALMENTE', 'TREINAMENTO', 'FERIAS']
			},
		), new TableColumn({
			name: 'status',
			type: 'enum',
			enum: ['ALOCADO', 'DISPONIVEL', 'PARCIALMENTE', 'TREINAMENTO', 'FERIAS', 'INATIVO']
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('resources', new TableColumn(
			{
				name: 'status',
				type: 'enum',
				enum: ['ALOCADO', 'DISPONIVEL', 'PARCIALMENTE', 'TREINAMENTO', 'FERIAS', 'INATIVO']
			},
		), new TableColumn({
			name: 'status',
			type: 'enum',
			enum: ['ALOCADO', 'DISPONIVEL', 'PARCIALMENTE', 'TREINAMENTO', 'FERIAS']
		}))
	}

}





