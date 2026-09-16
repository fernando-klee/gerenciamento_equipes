import { inject, injectable } from 'tsyringe'
import IProjectsRepository from '../../Projects/repositories/IProjectsRepository'
import CustomerNotFoundException from '../../../shared/infra/exceptions/CustomerNotFoundException'
import Project from '../../Projects/infra/typeorm/entities/Project'
import ICustomersRepository from '../repositories/ICustomersRepository'

@injectable()
export default class ListCustomerProjectsInProgress {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,

		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository
	) { }

	async execute(customer_id: number): Promise<Project[]> {
		const customerExists = await this.customersRepository.findById(customer_id)
		if (!customerExists) throw new CustomerNotFoundException()

		const projects = await this.projectsRepository.listByCustomerId(customer_id)

		return projects
	}
}
