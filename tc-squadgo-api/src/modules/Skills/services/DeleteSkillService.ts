import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import SkillNotFoundException from '../../../shared/infra/exceptions/SkillNotFoundException'
import ISkillsRepository from '../repositories/ISkillsRepository'

@injectable()
export default class DeleteSkillService {
	constructor(
		@inject('SkillsRepository')
		private skillsRepository: ISkillsRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) { }

	async execute(skill_id: number): Promise<void> {
		const skillsExists = await this.skillsRepository.findById(skill_id)
		if (!skillsExists) throw new SkillNotFoundException()

		await this.cacheProvider.invalidate('skills')

		await this.skillsRepository.deleteById(skill_id)
	}
}
