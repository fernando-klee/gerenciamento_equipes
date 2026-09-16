import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import CustomerNotFoundException from '../../../shared/infra/exceptions/CustomerNotFoundException'
import IStorageProvider from '../../../shared/providers/storageProvider/interfaces/IStorageProvider'
import Customer from '../infra/typeorm/entities/Customer'
import ICustomersRepository from '../repositories/ICustomersRepository'

interface IRequest {
	customer_id: number
	filename: string
}

@injectable()
export default class UploadCustomerImageService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) { }

	async execute(data: IRequest): Promise<Customer> {
		const { customer_id, filename } = data
		const customerExists = await this.customersRepository.findById(customer_id)
		if (!customerExists) throw new CustomerNotFoundException()

		if (customerExists.image_url) {
			await this.storageProvider.deleteFile(customerExists.image_url, 'customers_images')
		}

		customerExists.image_url = filename
		await this.storageProvider.saveFile(filename, 'customers_images')

		await this.cacheProvider.invalidate('customers')

		return instanceToInstance(await this.customersRepository.save(customerExists))
	}
}
