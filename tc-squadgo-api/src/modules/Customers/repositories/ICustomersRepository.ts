import FilterCustomersDTO from '../dtos/FilterCustomersDTO'
import Customer from '../infra/typeorm/entities/Customer'

export default interface ICustomersRepository {
	save(customer: Customer): Promise<Customer>
	findById(id: number): Promise<Customer | null>
	findByName(name: string): Promise<Customer | null>
	filterBy(data: FilterCustomersDTO): Promise<any>
	listWithDistinctResources(): Promise<Customer[]>
	deleteById(customer_id: number): Promise<void>
}
