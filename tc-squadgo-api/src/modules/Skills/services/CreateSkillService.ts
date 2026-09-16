import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import SkillAlreadyExistsException from '../../../shared/infra/exceptions/SkillAlreadyExistsException'
import Skill from '../infra/typeorm/entities/Skill'
import ISkillsRepository from '../repositories/ISkillsRepository'

@injectable()
export default class CreateSkillService {
	constructor(
		@inject('SkillsRepository')
		private skillsRepository: ISkillsRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) { }

	async execute(description: string, type: string): Promise<Skill> {
		const skillsExists = await this.skillsRepository.findByDescription(description)
		if (skillsExists) throw new SkillAlreadyExistsException()

		const skillCreated = new Skill()
		skillCreated.description = description
		skillCreated.type = type

		await this.cacheProvider.invalidate('skills')

		return await this.skillsRepository.save(skillCreated)
	}
}
