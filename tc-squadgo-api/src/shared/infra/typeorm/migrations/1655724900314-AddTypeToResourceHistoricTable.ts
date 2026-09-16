import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddTypeToResourceHistoricTable1655724900314 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('resources_historic', new TableColumn(
			{
				name: 'type',
				type: 'enum',
				enum: [
					'ADD_PROJECT',
					'REMOVE_PROJECT',
					'CHANGE_PROJECT_HOURS',
					'NEW_FEEDBACK',
					'INCREASE_SKILL',
					'DECREASE_SKILL',
					'STATUS_CHANGED',
					'TYPE_CHANGED',
					'RESOURCE_CREATED',
					'STATUS_INACTIVE']
			}
		), new TableColumn(
			{
				name: 'type',
				type: 'enum',
				enum: [
					'ADD_PROJECT',
					'REMOVE_PROJECT',
					'CHANGE_PROJECT_HOURS',
					'NEW_FEEDBACK',
					'INCREASE_SKILL',
					'DECREASE_SKILL',
					'STATUS_CHANGED',
					'TYPE_CHANGED',
					'RESOURCE_CREATED',
					'STATUS_INACTIVE',
					'BECOME_RESPONSIBLE']
			}
		))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			DELETE FROM resources_historic where type = 'BECOME_RESPONSIBLE';
		`)

		await queryRunner.changeColumn('resources_historic', new TableColumn(
			{
				name: 'type',
				type: 'enum',
				enum: [
					'ADD_PROJECT',
					'REMOVE_PROJECT',
					'CHANGE_PROJECT_HOURS',
					'NEW_FEEDBACK',
					'INCREASE_SKILL',
					'DECREASE_SKILL',
					'STATUS_CHANGED',
					'TYPE_CHANGED',
					'RESOURCE_CREATED',
					'STATUS_INACTIVE',
					'BECOME_RESPONSIBLE']
			}
		), new TableColumn(
			{
				name: 'type',
				type: 'enum',
				enum: [
					'ADD_PROJECT',
					'REMOVE_PROJECT',
					'CHANGE_PROJECT_HOURS',
					'NEW_FEEDBACK',
					'INCREASE_SKILL',
					'DECREASE_SKILL',
					'STATUS_CHANGED',
					'TYPE_CHANGED',
					'RESOURCE_CREATED',
					'STATUS_INACTIVE']
			}
		))
	}

}
