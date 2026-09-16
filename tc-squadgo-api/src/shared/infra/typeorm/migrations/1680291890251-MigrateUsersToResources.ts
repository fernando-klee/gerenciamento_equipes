import { MigrationInterface, QueryRunner } from 'typeorm'
import { addYears } from 'date-fns'
import Resource from '../../../../modules/Resources/infra/typeorm/entities/Resource'

interface User {
	id: any;
	name: any;
	email: any;
	status: any;
	password: any;
	created_at: any;
	updated_at: any;
}
export class MigrateUsersToResources1680291890251 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		const query = 'SELECT * FROM users;'
		const users = await queryRunner.query(query)

		const query2 = 'SELECT * FROM resources;'
		const resources = await queryRunner.query(query2)

		const resourcesFiltered = users.filter((u: { email: any }) => {
			return !resources.some((r: { email: any }) => r.email === u.email)
		})

		const values = resourcesFiltered.map((user: User) => {
			const { id, name, email, status, password, created_at, updated_at } = user
			return { id, name, email, status, password, created_at, updated_at }
		})

		for (const user of values) {
			const { name, email, created_at } = user

			const vacationDate = addYears(created_at, 1)

			const resource = new Resource()
			Object.assign(resource, {
				name,
				email,
				status: 'DISPONIVEL',
				hours_amount: 0,
				leader: false,
				admission_date: created_at,
				vacation_date: vacationDate,
			})

			const query = `INSERT INTO resources (name, email, status, hours_amount, leader)
			VALUES (?, ?, ?, ?, ?)`

			const values = [
				resource.name,
				resource.email,
				resource.status,
				resource.hours_amount,
				resource.leader,
			]

			await queryRunner.query(query, values)
		}
	}
	public async down(queryRunner: QueryRunner): Promise<void> {
		console.log('Ignoring the rollback of converting resources to users.')
	}
}
