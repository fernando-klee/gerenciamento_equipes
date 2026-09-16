import { inject, injectable } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'

import Project from '../infra/typeorm/entities/Project'
import ICustomersRepository from '../../Customers/repositories/ICustomersRepository'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import IProjectsRepository from '../repositories/IProjectsRepository'
import CustomerNotFoundException from '../../../shared/infra/exceptions/CustomerNotFoundException'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import ProjectNotFoundException from '../../../shared/infra/exceptions/ProjectNotFoundException'
import ICloseProjectsService from '../providers/interfaces/ICloseProjectsService'
import ICreateProjectPropsHistoricService from '../providers/interfaces/ICreateProjectPropsHistoricService'
import IUsersRepository from '../../Accounts/repositories/IUsersRepository'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import Resource from '../../Resources/infra/typeorm/entities/Resource'
import ICreateResourceHistoricService from '../../Resources/providers/interfaces/ICreateResourceHistoricService'

interface IRequest {
	user_id: string
	id: number
	name: string
	status: string
	type: string
	hours: number
	responsible_id: number
	start_estimate: Date
	end_estimate?: Date
	customer_id: number
	// customer_poc: string
}

@injectable()
export default class UpdateProjectService {
	constructor(
		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository,

		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('CloseProjectService')
		private closeProjectService: ICloseProjectsService,

		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('CreateProjectPropsHistoricService')
		private createProjectPropsHistoricService: ICreateProjectPropsHistoricService,

		@inject('CreateResourceHistoricService')
		private createResourceHistoricService: ICreateResourceHistoricService
	) { }

	async execute(data: IRequest): Promise<Project> {
		const {
			user_id,
			id,
			name,
			status,
			type,
			hours,
			responsible_id,
			start_estimate,
			end_estimate,
			customer_id,
			// customer_poc
		} = data

		const userExists = await this.resourcesRepository.findByRegistry(user_id)
		if (!userExists) throw new UserNotFoundException()

		const projectExists = await this.projectsRepository.findById(id)
		if (!projectExists) throw new ProjectNotFoundException()

		const customerExists = await this.customersRepository.findById(customer_id)
		if (!customerExists) throw new CustomerNotFoundException()

		const projectToBeUpdated = { ...projectExists }
		projectToBeUpdated.customer = customerExists

		if (responsible_id) {
			const responsibleExists = await this.resourcesRepository.findById(responsible_id)
			if (!responsibleExists) throw new ResourceNotFoundException()

			await this.changeResponsibleHistoric(name, projectExists.responsible!, responsibleExists)

			projectToBeUpdated.responsible = responsibleExists
		} else {
			projectToBeUpdated.responsible = null
		}

		Object.assign(projectToBeUpdated, {
			name,
			status,
			type,
			hours,
			start_estimate,
			end_estimate: end_estimate ?? null,
			// customer_poc
		})

		if (status === 'CONCLUIDO') {
			await this.closeProjectService.execute(user_id, id)
			projectToBeUpdated.conclusion_date = new Date()
		} else if (status !== 'CONCLUIDO' && projectExists.status === 'CONCLUIDO') {
			Object.assign(projectToBeUpdated, {
				conclusion_date: null
			})
		}

		await this.projectsRepository.save(projectToBeUpdated)

		const projectUpTodate = await this.projectsRepository.findById(id)
		if (!projectUpTodate) throw new ProjectNotFoundException()

		await this.createProjectPropsHistoricService.execute({ oldProject: projectExists, newProject: projectUpTodate, username: userExists.name })

		return instanceToInstance(projectUpTodate)
	}

	private async changeResponsibleHistoric(projectName: string, oldResponsible?: Resource, newResponsible?: Resource) {
		if (newResponsible) {
			if (!oldResponsible || oldResponsible && oldResponsible.id !== newResponsible.id) {
				await this.createResourceHistoricService.execute({
					resource_id: newResponsible.id,
					type: 'BECOME_RESPONSIBLE',
					description: `${newResponsible.name} se tornou responsável no projeto "${projectName}".`
				})
			}
		}
	}

}
