import { inject, injectable } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'

import ICreateNotificationService from '../../Notifications/interfaces/ICreateNotificationService'
import CustomerAlreadyExists from '../../../shared/infra/exceptions/CustomerAlreadyExists'
import Customer from '../infra/typeorm/entities/Customer'
import ICustomersRepository from '../repositories/ICustomersRepository'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import IStorageProvider from '../../../shared/providers/storageProvider/interfaces/IStorageProvider'
import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'

interface IRequest {
	user_id: string
	name: string
	hired_hours: number
	status: 'ATIVO' | 'INATIVO',
	filename?: string
	resource_profile: string
	start_contract_time: Date
	end_contract_time: Date
	responsible_name: string
	responsible_email: string
	responsible_phone: string
	objective: string
}

@injectable()
export default class CreateCustomerService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,

		@inject('CreateNotificationService')
		private createNotificationService: ICreateNotificationService,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) { }

	async execute(data: IRequest): Promise<Customer> {
		const {
			user_id,
			name,
			hired_hours,
			status,
			filename,
			resource_profile,
			start_contract_time,
			end_contract_time,
			responsible_name,
			responsible_email,
			responsible_phone,
			objective } = data

		const userExists = await this.resourcesRepository.findByRegistry(user_id)
		if (!userExists) throw new UserNotFoundException()

		const customerExists = await this.customersRepository.findByName(name)
		if (customerExists) throw new CustomerAlreadyExists()

		const customer = new Customer()
		customer.name = name
		customer.status = status
		customer.hired_hours = hired_hours
		customer.resource_profile = resource_profile
		customer.start_contract_time = start_contract_time
		customer.end_contract_time = end_contract_time
		customer.responsible_name = responsible_name
		customer.responsible_email = responsible_email
		customer.responsible_phone = responsible_phone
		customer.objective = objective

		if (filename) {
			customer.image_url = filename
			await this.storageProvider.saveFile(filename, 'customers_images')
		}

		const customerCreated = await this.customersRepository.save(customer)

		this.createNotificationService.execute({
			description: `${userExists.name} cadastrou um novo cliente: ${name}`,
			object_type: 'notify_new_customer',
			type: 'CUSTOMERS',
			object_id: customerCreated.id
		})

		await this.cacheProvider.invalidate('customers')

		return instanceToInstance(customerCreated)
	}
}
