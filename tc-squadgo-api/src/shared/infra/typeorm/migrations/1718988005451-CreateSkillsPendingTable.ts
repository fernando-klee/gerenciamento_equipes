import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class CreateSkillsPendingTable1718988005451 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'skills_pending',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'resource_indicate',
                        type: 'integer',
                    },
                    {
                        name: 'leader_id',
                        type: 'integer',
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['PENDENTE', 'RECUSADO', 'APROVADO'],
                        default: '\'PENDENTE\'',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
            }),
        )

        await queryRunner.createForeignKey('skills_pending', new TableForeignKey({
			name: 'ResourceIndicateResourceId',
			columnNames: ['resource_indicate'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

        await queryRunner.createForeignKey('skills_pending', new TableForeignKey({
			name: 'ResourceIndicateLeaderResourceId',
			columnNames: ['resource_indicate'],
			referencedTableName: 'resources',
			referencedColumnNames: ['id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('skills_pending', 'ResourceIndicateLeaderResourceId')
        await queryRunner.dropForeignKey('skills_pending', 'ResourceIndicateResourceId')
        await queryRunner.dropTable('skills_pending')
    }

}
