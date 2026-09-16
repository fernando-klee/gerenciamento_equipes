import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import Department from '../infra/typeorm/entities/Department'
import IDepartmentRepository from '../../Skills/repositories/IDepartmentRepository'

@injectable()
export default class ListDepartmentsService {
	constructor(
		@inject('DepartmentRepository')
		private departmentRepository: IDepartmentRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) {}

	async execute(): Promise<Department[]> {
		const departments = await this.departmentRepository.list()

		return departments
	}
}