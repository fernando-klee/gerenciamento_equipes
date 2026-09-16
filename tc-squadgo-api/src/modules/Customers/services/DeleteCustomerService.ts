import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import CustomerNotFoundException from '../../../shared/infra/exceptions/CustomerNotFoundException'
import ICustomersRepository from '../repositories/ICustomersRepository'


@injectable()
export default class DeleteCustomerService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) { }

	async execute(customer_id: number): Promise<void> {
		const customerExistsById = await this.customersRepository.findById(customer_id)
		if (!customerExistsById) throw new CustomerNotFoundException()

		await this.cacheProvider.invalidate('customers')

		await this.customersRepository.deleteById(customer_id)
	}
}
