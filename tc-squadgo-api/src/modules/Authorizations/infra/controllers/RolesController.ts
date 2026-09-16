import { Request, Response } from 'express'
import ListRolesService from '../../services/ListRolesService'
import UpdateRoleService from '../../services/UpdateRoleService'
import { container } from 'tsyringe'
import CreateRoleService from '../../services/CreateRoleService'
import DeleteRoleService from '../../services/DeleteRoleService'
import FindRoleService from '../../services/FindRoleService'

export default class RolesController {
	async index(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListRolesService)

		const roles = await service.execute()

		res.status(201).json(roles)
	}

	async create(req: Request, res: Response): Promise<void> {
		const { name, permissions_ids } = req.body

		const service = container.resolve(CreateRoleService)

		const slugCreated = await service.execute(name, permissions_ids)

		res.status(201).json(slugCreated)
	}

	async update(req: Request, res: Response): Promise<void> {
		const role_id = Number(req.params.role_id)
		const { name, permissions_ids } = req.body

		const service = container.resolve(UpdateRoleService)

		const slugCreated = await service.execute({ name, permissions_ids, role_id })

		res.status(201).json(slugCreated)
	}

	async delete(req: Request, res: Response): Promise<void> {
		const role_id = Number(req.params.role_id)

		const service = container.resolve(DeleteRoleService)

		await service.execute(role_id)

		res.status(202).json()
	}

	async findById(req: Request, res: Response): Promise<void> {
		const role_id = Number(req.params.role_id)

		const service = container.resolve(FindRoleService)

		const roleFound = await service.execute(role_id)

		res.status(201).json(roleFound)
	}
}
