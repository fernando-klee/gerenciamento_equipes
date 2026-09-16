import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import FilterCustomersDTO from '../dtos/FilterCustomersDTO'
import ICustomersRepository from '../repositories/ICustomersRepository'

@injectable()
export default class ListCustomerService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) { }

	async execute(data: FilterCustomersDTO): Promise<any> {
		let customersCache = await this.cacheProvider.recover('customers')

		if (!customersCache) {
			const {
				name,
				status,
				currentPage = 1,
				qtdPerPage = 100,
				orderField = 'name',
				order = 'ASC'
			} = data

			const skipByPage = (qtdPerPage * currentPage) - qtdPerPage

			const { totalCustomers, customers } = await this.customersRepository.filterBy(
				{ name, status, qtdPerPage, currentPage: skipByPage, orderField, order }
			)

			let last_page = Math.ceil(totalCustomers / qtdPerPage)

			if (last_page === 0) last_page = 1

			const response = {
				total_data: totalCustomers,
				current_page: Number(currentPage),
				last_page,
				data: customers
			}

			customersCache = instanceToInstance(response)
			await this.cacheProvider.save('customers', customersCache)
		}

		return customersCache
	}
}
