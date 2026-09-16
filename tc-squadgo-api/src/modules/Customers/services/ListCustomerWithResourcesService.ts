import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

import Resource from '../../Resources/infra/typeorm/entities/Resource'
import ICustomersRepository from '../repositories/ICustomersRepository'

@injectable()
export default class ListCustomerWithResourcesService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository
	) { }

	async execute(): Promise<any> {
		const customersList = await this.customersRepository.listWithDistinctResources()
		const customCustomersList: any[] = []

		for await (const c of customersList) {
			const customerResources: Resource[] = []
			const customerProjects = await c.projects

			const customResponsiblesList: any[] = []

			await Promise.all(customerProjects.map(async cp => {
				if (cp.status !== 'CONCLUIDO') {
					const projectResources = cp.resources
					const responsible = cp.responsible

					if (responsible) {
						const responsibleAlreadyAdded = customResponsiblesList.some(cr => cr.id === responsible.id)
						if (!responsibleAlreadyAdded) customResponsiblesList.push(cp.responsible)
					}

					projectResources.map(pr => {
						const resourceAlreadyIn = customerResources.find(cr => cr.id === pr.id)
						if (!resourceAlreadyIn) {
							customerResources.push(pr)
						}
					})
				}

			}))

			const { id, name, status, image_url, hired_hours } = instanceToInstance(c)
			const newCustomerProps = { id, name, status, image_url, hired_hours }
			customCustomersList.push({ ...newCustomerProps, resources: customerResources, responsibles: customResponsiblesList })
		}

		return instanceToInstance(customCustomersList)
	}
}
