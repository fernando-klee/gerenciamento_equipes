import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateSetoresTable1718819932702 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            INSERT INTO departments (name) VALUES 
            ('Administrativo'),
            ('Comercial'),
            ('Inovação'),
            ('Criação/Criatividade'),
            ('Técnica'),
            ('Marketing');
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DELETE FROM departments WHERE name IN 
            ('Administrativo', 'Comercial', 'Inovação', 'Criação/Criatividade', 'Técnica', 'Marketing');
        `)
	}
}
