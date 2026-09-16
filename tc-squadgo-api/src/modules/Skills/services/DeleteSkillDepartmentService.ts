import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import SkillNotFoundException from '../../../shared/infra/exceptions/SkillNotFoundException'
import ISkillsDepartmentsRepository from '../repositories/ISkillsDepartmentsRepository'


@injectable()
export default class DeleteSkillDeparmentService {
	constructor(
		@inject('SkillsDepartmentsRepository')
		private skillsDepartmentsRepository: ISkillsDepartmentsRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) { }

	async execute(skillDepartment_id: number): Promise<void> {
		const skillsExists = await this.skillsDepartmentsRepository.findById(skillDepartment_id)
		if (!skillsExists) throw new SkillNotFoundException()

		await this.cacheProvider.invalidate('skills')

		await this.skillsDepartmentsRepository.deleteById(skillDepartment_id)
	}
}
