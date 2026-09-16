import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UpdateResourceService from '../../services/UpdateResourceService'
import CreateResourceService from '../../services/CreateResourceService'
import ListResourceService from '../../services/ListResourceService'
import ListResourceServiceOutputEstimate from '../../services/ListResourceServiceOutputEstimate'
import GetResourceAvailableHours from '../../providers/implementations/GetResourceAvailableHours'
import UploadPhotoResourceService from '../../services/UploadPhotoResourceService'
import ListResourceActivesService from '../../services/ListResourceActivesService'
import GetProjectsOfUserService from '../../services/GetProjectsOfUserService'
import FindResourceById from '../../services/FindResourceById'
import ListProjectsByResourceService from '../../services/ListProjectsByResourceService'
import ShowSimpleProfileService from '../../services/ShowSimpleProfileService'
import ListResourceSkillsService from '../../services/ListResourceSkillsService'
import UpdateResourceSkillsService from '../../services/UpdateResourceSkillsService'
import ListResponsiblesService from '../../services/ListResponsiblesService'
import ListResourcesSchedules from '../../services/ListResourcesSchedules'
import UpdateOutputEstimateService from '../../services/UpdateOutputEstimateService'
import ListResourceByLeaderAndProject from '../../../Resources/services/ListResourceByLeaderAndProjectService'
import ListFormattedForPortalLeadersProjectsResourcesService from '../../services/ListFormattedForPortalLeadersProjectsResourcesService'

export default class ResourcesControllers {
	async create(req: Request, res: Response): Promise<void> {
		const { user_id } = req
		const {
			name,
			email,
			status,
			hours_amount,
			leader,
			classification_id,
			types_ids,
			admission_date,
			vacation_date,
		} = req.body

		const service = container.resolve(CreateResourceService)
		const resourceCreated = await service.execute({
			user_id,
			name,
			email,
			status,
			leader,
			hours_amount,
			classification_id,
			types_ids,
			admission_date: new Date(admission_date),
			vacation_date: vacation_date ? new Date(vacation_date) : null,
		})

		res.status(201).json(resourceCreated)
	}

	async find(req: Request, res: Response): Promise<void> {
		const { resource_id } = req.params
		const service = container.resolve(FindResourceById)
		const resource = await service.execute(Number(resource_id))

		res.status(202).json(resource)
	}

	async showSimpleProfile(req: Request, res: Response): Promise<void> {
		const { resource_id } = req.params
		const service = container.resolve(ShowSimpleProfileService)
		const resource = await service.execute(Number(resource_id))

		res.status(202).json(resource)
	}

	async index(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListResourceService)
		const resources = await service.execute()

		res.status(202).json(resources)
	}

	async indexOutputEstimate(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListResourceServiceOutputEstimate)
		const resources = await service.execute()

		res.status(202).json(resources)
	}

	async indexResponsibles(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListResponsiblesService)
		const responsibles = await service.execute()

		res.status(202).json(responsibles)
	}

	async indexActives(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListResourceActivesService)
		const resources = await service.execute()

		res.status(202).json(resources)
	}

	async listOrganogramData(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListResourceByLeaderAndProject)
		const resources = await service.execute()

		res.status(202).json(resources)
	}

	// async listLeaderProjectResource(req: Request, res: Response): Promise<void> {
	// 	const service = container.resolve(ListLeadersProjectsResources)
	// 	const resources = await service.execute()

	// 	res.status(202).json(resources)
	// }

	// const { leader_id } = req.params.resource_id

	// const service = container.resolve(ListResourceByLeaderAndProject)
	// const resources = await service.execute(Number(leader_id))


	// res.status(202).json(resources)

	async listLeaderProjectResource(req: Request, res: Response): Promise<void> {
		const { leader_id } = req.params
		const service = container.resolve(ListFormattedForPortalLeadersProjectsResourcesService)
		const resources = await service.execute(Number(leader_id))

		res.status(202).json(resources)
	}

	async update(req: Request, res: Response): Promise<void> {
		const resource_id = req.params.resource_id
		const {
			name,
			email,
			status,
			leader,
			hours_amount,
			classification_id,
			types_ids,
			admission_date,
			vacation_date,
			backFromVacation,
			output_estimate,
			departure_forecast,
			leader_id,
		} = req.body

		const service = container.resolve(UpdateResourceService)
		const resourceCreated = await service.execute({
			resource_id: Number(resource_id),
			name,
			email,
			status,
			leader,
			hours_amount,
			classification_id,
			types_ids,
			admission_date: new Date(admission_date),
			vacation_date: vacation_date ? new Date(vacation_date) : null,
			backFromVacation,
			output_estimate,
			leader_id,
			departure_forecast
		})

		res.status(201).json(resourceCreated)
	}

	async updateResourceSkills(req: Request, res: Response): Promise<void> {
		const { resource_id } = req.params
		const { skill_id, point } = req.body

		const service = container.resolve(UpdateResourceSkillsService)
		const resourceProjects = await service.execute({
			resource_id: Number(resource_id),
			point: Number(point),
			skill_id,
		})

		res.status(201).json(resourceProjects)
	}

	async listResourceSkills(req: Request, res: Response): Promise<void> {
		const { resource_id } = req.params

		const service = container.resolve(ListResourceSkillsService)
		const resourceSkills = await service.execute(Number(resource_id))

		res.status(201).json(resourceSkills)
	}

	async listResourceSchedules(req: Request, res: Response): Promise<void> {
		const { resource_id } = req.params

		const service = container.resolve(ListResourcesSchedules)
		const resourceSchedules = await service.execute(Number(resource_id))

		res.status(201).json(resourceSchedules)
	}

	async listProjectsResource(req: Request, res: Response): Promise<void> {
		const { resource_id } = req.params

		const service = container.resolve(ListProjectsByResourceService)
		const resourceProjects = await service.execute(Number(resource_id))

		res.status(201).json(resourceProjects)
	}

	async availableHours(req: Request, res: Response): Promise<void> {
		const resource_id = req.params.resource_id

		const service = container.resolve(GetResourceAvailableHours)
		const resourceHours = await service.execute(Number(resource_id))

		res.status(201).json(resourceHours)
	}

	async getResourceProjectsStatus(req: Request, res: Response): Promise<void> {
		const resource_id = req.params.resource_id

		const service = container.resolve(GetProjectsOfUserService)
		const userProjects = await service.execute(Number(resource_id))

		res.status(202).json(userProjects)
	}

	async addPhoto(req: Request, res: Response): Promise<void> {
		const resource_id = Number(req.params.resource_id)
		const { filename } = req.file as any

		const service = container.resolve(UploadPhotoResourceService)

		const resource = await service.execute({ resource_id, filename })

		res.status(201).json(resource)
	}

	async updateOutputEstimate(req: Request, res: Response): Promise<void> {
		const { resource_id, new_output_estimate, new_departure_forecast } = req.body

		const service = container.resolve(UpdateOutputEstimateService)
		const UpdatedResource = await service.execute({
			resource_id,
			new_output_estimate,
			new_departure_forecast
		})

		res.status(200).json(UpdatedResource)
	}
}
