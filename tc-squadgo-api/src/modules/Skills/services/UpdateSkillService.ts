import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import SkillNotFoundException from '../../../shared/infra/exceptions/SkillNotFoundException'
import SkillAlreadyExistsException from '../../../shared/infra/exceptions/SkillAlreadyExistsException'
import Skill from '../infra/typeorm/entities/Skill'
import ISkillsRepository from '../repositories/ISkillsRepository'

interface IRequest {
	skill_id: number
	description: string
	type: string
}

@injectable()
export default class UpdateSkillService {
	constructor(
		@inject('SkillsRepository')
		private skillsRepository: ISkillsRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) { }

	async execute(data: IRequest): Promise<Skill> {
		const { skill_id, description, type } = data
		const skillsExistsById = await this.skillsRepository.findById(skill_id)
		if (!skillsExistsById) throw new SkillNotFoundException()

		// const skillsExistsByDescription = await this.skillsRepository.findByDescriptionAndType(description, type)
		// if (skillsExistsByDescription) throw new SkillAlreadyExistsException()

		skillsExistsById.description = description
		skillsExistsById.type = type

		await this.cacheProvider.invalidate('skills')

		return await this.skillsRepository.save(skillsExistsById)
	}
}
