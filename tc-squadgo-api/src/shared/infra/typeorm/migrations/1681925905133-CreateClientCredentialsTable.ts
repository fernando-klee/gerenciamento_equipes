import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class CreateClientCredentialsTable1681925905133 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(new Table({
				name: 'client_credentials',
				columns: [
					{
						name: 'client_id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'client_secret',
						type: 'varchar',
					},
					{
						name: 'client_name',
						type: 'varchar',
					}
				]
			}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropTable('client_credentials')
    }

}
