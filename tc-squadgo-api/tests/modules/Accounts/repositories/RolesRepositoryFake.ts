import Role from '../../../../src/modules/Authorizations/infra/typeorm/entities/Role'
import RoleAlreadyExistsException from '../../../../src/shared/infra/exceptions/RoleAlreadyExistsException'
import IRolesRepository from '../../../../src/modules/Authorizations/repositories/IRolesRepository'

export default class RolesRepositoryFake implements IRolesRepository {

	private roles: Role[] = []

	async save(role: Role): Promise<Role> {
		const roleExists = this.roles.findIndex(r => r.name === role.name)
		if (roleExists) throw new RoleAlreadyExistsException()

		Object.assign(role, {
			id: this.roles.length
		})

		this.roles.push(role)

		return Promise.resolve(role)
	}

	async findByName(name: string): Promise<Role | null> {
		const roleExists = this.roles.find(r => r.name === name)

		if(!roleExists) return null

		return roleExists
	}

	async findById(id: number): Promise<Role | null> {
		const roleExists = this.roles.find(r => r.id === id)

		if(!roleExists) return null

		return roleExists
	}

	async list(): Promise<Role[]> {
		return this.roles
	}

	async listByIds(roles_ids: number[]): Promise<Role[]> {
		return this.roles.filter(r => roles_ids.includes(r.id))
	}

	async deleteById(id: number): Promise<void> {
		throw new Error('Method not implemented.')
	}

}
