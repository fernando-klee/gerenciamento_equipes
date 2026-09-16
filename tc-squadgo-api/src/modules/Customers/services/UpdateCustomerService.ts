import { inject, injectable } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'

import CustomerNotFoundException from '../../../shared/infra/exceptions/CustomerNotFoundException'
import CustomerAlreadyExists from '../../../shared/infra/exceptions/CustomerAlreadyExists'
import Customer, { StatusProps } from '../infra/typeorm/entities/Customer'
import ICustomersRepository from '../repositories/ICustomersRepository'
import IProjectsRepository from '../../Projects/repositories/IProjectsRepository'
import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import ICloseProjectsService from '../../Projects/providers/interfaces/ICloseProjectsService'
import ICreateProjectHistoricService from '../../Projects/providers/interfaces/ICreateProjectHistoricService'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'

interface IRequest {
	user_id: string
	customer_id: number
	name: string
	hired_hours: number
	status: StatusProps
	resource_profile: string
	start_contract_time: Date
	end_contract_time: Date
	responsible_name: string
	responsible_email: string
	responsible_phone: string
	objective: string
}

@injectable()
export default class UpdateCustomerService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,

		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository,

		@inject('CloseProjectService')
		private closeProjectService: ICloseProjectsService,

		@inject('CreateProjectHistoricService')
		private createProjectHistoricService: ICreateProjectHistoricService,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) { }

	async execute(data: IRequest): Promise<Customer> {
		const {
			user_id,
			customer_id,
			name,
			hired_hours,
			status,
			resource_profile,
			start_contract_time,
			end_contract_time,
			responsible_name,
			responsible_email,
			responsible_phone,
			objective } = data

		const userExists = await this.resourcesRepository.findByRegistry(user_id)
		if (!userExists) throw new UserNotFoundException()

		const customerExistsById = await this.customersRepository.findById(customer_id)
		if (!customerExistsById) throw new CustomerNotFoundException()

		const oldStatus = customerExistsById.status

		const customerExists = await this.customersRepository.findByName(name)
		if (customerExists && customerExists.id !== customer_id) throw new CustomerAlreadyExists()

		customerExistsById.name = name
		customerExistsById.hired_hours = hired_hours
		customerExistsById.status = status
		customerExistsById.resource_profile = resource_profile,
			customerExistsById.start_contract_time = start_contract_time,
			customerExistsById.end_contract_time = end_contract_time,
			customerExistsById.responsible_name = responsible_name,
			customerExistsById.responsible_email = responsible_email,
			customerExistsById.responsible_phone = responsible_phone,
			customerExistsById.objective = objective

		const customerUpdated = await this.customersRepository.save(customerExistsById)

		if (oldStatus === 'ATIVO' && status === 'INATIVO') {
			let customerProjects = await this.projectsRepository.listByCustomerId(customer_id)
			customerProjects = await Promise.all(customerProjects.map(async cp => {
				await this.closeProjectService.execute(user_id, cp.id)
				return { ...cp, status: 'CONCLUIDO', conclusion_date: new Date() }
			}))

			await this.projectsRepository.updateAll(customerProjects)

			await Promise.all(customerProjects.map(async cp => {
				const description = `${this.addStrongTag(userExists.name)} alterou o status para ${this.addStrongTag('Concluído')}.`
				await this.createProjectHistoricService.execute({ description, project_id: cp.id, type: 'CLOSING_PROJECT' })
			}))
		}

		await this.cacheProvider.invalidate('customers')
		return instanceToInstance(customerUpdated)
	}

	private addStrongTag(text: any): string {
		return `<strong>${text}</strong>`
	}
}
