import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class ChangeUsersToResources1687977786679 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remover a foreign key antiga
        await queryRunner.dropForeignKey('feedbacks', 'FeedbacksReporterId')

        // Adicionar a nova foreign key relacionada à tabela "resources"
        await queryRunner.createForeignKey(
            'feedbacks',
            new TableForeignKey({
                name: 'FeedbacksReporterId',
                columnNames: ['reporter_id'],
                referencedTableName: 'resources',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a foreign key nova
        await queryRunner.dropForeignKey('feedbacks', 'FeedbacksReporterId')

        // Adicionar a foreign key antiga relacionada à tabela "users"
        await queryRunner.createForeignKey(
            'feedbacks',
            new TableForeignKey({
                name: 'FeedbacksReporterId',
                columnNames: ['reporter_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        )
    }
}
