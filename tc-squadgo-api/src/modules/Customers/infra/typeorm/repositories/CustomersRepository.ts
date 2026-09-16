import FilterCustomersDTO from 'modules/Customers/dtos/FilterCustomersDTO'
import ICustomersRepository from 'modules/Customers/repositories/ICustomersRepository'
import { Repository } from 'typeorm'
import Customer from '../entities/Customer'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class CustomersRepository implements ICustomersRepository {
	private ormRepository: Repository<Customer>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Customer)
	}

	async save(customer: Customer): Promise<Customer> {
		const newCustomer = this.ormRepository.create(customer)

		return await this.ormRepository.save(newCustomer)
	}

	async findById(id: number): Promise<Customer | null> {
		return await this.ormRepository.findOne({ where: { id } })
	}

	async findByName(name: string): Promise<Customer | null> {
		return await this.ormRepository.findOne({ where: { name } })
	}

	async listWithDistinctResources(): Promise<Customer[]> {
		const dataFilter = this.ormRepository.createQueryBuilder('customer')
			.select([
				'customer.id',
				'customer.name',
				'customer.status',
				'customer.hired_hours',
				'customer.image_url',
				'projects.id',
				'projects.status',
				'resources.id',
				'resources.name',
				'resources.email',
				'resources.photo_url',
				'responsible.id',
				'responsible.name',
				'responsible.email',
				'responsible.photo_url'
			])
			.leftJoin('customer.projects', 'projects')
			.leftJoin('projects.resources', 'resources')
			.leftJoin('projects.responsible', 'responsible')

		dataFilter.orderBy('customer.name', 'ASC')

		return await dataFilter.getMany()
	}

	async deleteById(customer_id: number): Promise<void> {
		await this.ormRepository.delete(customer_id)
	}

	async filterBy(data: FilterCustomersDTO): Promise<any> {
		const { name, status, currentPage, qtdPerPage, orderField, order } = data

		const dataFilter = this.ormRepository.createQueryBuilder('customer')
			.select([
				'customer.id',
				'customer.name',
				'customer.status',
				'customer.hired_hours',
				'customer.image_url',
				'customer.resource_profile',
				'customer.start_contract_time',
				'customer.end_contract_time',
				'customer.responsible_name',
				'customer.responsible_email',
				'customer.responsible_phone',
				'customer.objective',
				'customer.created_at',
				'customer.updated_at',
			])

		if (name) dataFilter.where('LOWER(customer.name) LIKE :name', { name: `%${name.toLowerCase()}%` })

		if (status) dataFilter.where('customer.status LIKE :status', { status })

		dataFilter.orderBy('customer.' + orderField, order)

		const totalCustomers = await dataFilter.getCount()
		const customers = await dataFilter.take(qtdPerPage).skip(currentPage).getMany()

		return { totalCustomers, customers }
	}
}
