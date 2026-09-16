import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateProjectService from '../../services/CreateProjectService'
import ListProjectsService from '../../../Projects/services/ListProjectsService'
import UpdateProjectService from '../../services/UpdateProjectService'
import CloseProjectService from '../../providers/implementations/CloseProjectService'
import ListProjectHistoricService from '../../services/ListProjectHistoricService'
import AddOrUpdateResourceInProjectService from '../../services/AddOrUpdateResourceInProjectService'
import RemoveResourceFromProjectService from '../../services/RemoveResourceFromProjectService'
import ListProjectResourcesService from '../../services/ListProjectResourcesService'

export default class ProjectControllers {
	async create(req: Request, res: Response): Promise<void> {
		const { user_id } = req
		const data = req.body
		const service = container.resolve(CreateProjectService)

		const projectCreated = await service.execute({ ...data, user_id })

		res.status(201).json(projectCreated)
	}

	async update(req: Request, res: Response): Promise<void> {
		const { user_id } = req
		const { project_id } = req.params
		const data = req.body
		const service = container.resolve(UpdateProjectService)

		const projectUpdated = await service.execute({ ...data, id: project_id, user_id })

		res.status(201).json(projectUpdated)
	}

	async index(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListProjectsService)

		const projects = await service.execute()

		res.status(202).json(projects)
	}

	async getHistoric(req: Request, res: Response): Promise<void> {
		const { project_id } = req.params
		const { currentPage } = req.query
		const service = container.resolve(ListProjectHistoricService)
		const historics = await service.execute({ project_id: Number(project_id), currentPage: Number(currentPage) })

		res.status(202).json(historics)
	}

	async closeProejct(req: Request, res: Response): Promise<void> {
		const { user_id } = req
		const { project_id } = req.params
		const service = container.resolve(CloseProjectService)

		const projects = await service.execute(user_id, Number(project_id))

		res.status(202).json(projects)
	}

	async indexProjectResources(req: Request, res: Response): Promise<void> {
		const { project_id } = req.params

		const service = container.resolve(ListProjectResourcesService)

		const resources = await service.execute(Number(project_id))

		res.status(201).json(resources)
	}

	async updateOrCreateResourceHours(req: Request, res: Response): Promise<void> {
		const { user_id } = req
		const { project_id, resource_id } = req.params
		const { hours_amount } = req.body
		const service = container.resolve(AddOrUpdateResourceInProjectService)

		const data = {
			user_id: String(user_id),
			project_id: Number(project_id),
			resource_id: Number(resource_id),
			hours_amount: Number(hours_amount)
		}

		const projectUpdated = await service.execute(data)

		res.status(201).json(projectUpdated)
	}

	async removeResourceFromProject(req: Request, res: Response): Promise<void> {
		const { user_id } = req
		const { project_id, resource_id } = req.params

		const service = container.resolve(RemoveResourceFromProjectService)

		const data = {
			user_id: String(user_id),
			resource_id: Number(resource_id),
			project_id: Number(project_id)
		}

		const projectUpdated = await service.execute(data)

		res.status(201).json(projectUpdated)
	}

}
