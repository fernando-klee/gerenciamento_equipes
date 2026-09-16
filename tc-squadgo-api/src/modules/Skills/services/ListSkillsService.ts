import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import Skill from '../infra/typeorm/entities/Skill'
import ISkillsRepository from '../repositories/ISkillsRepository'

@injectable()
export default class ListSkillsService {
	constructor(
		@inject('SkillsRepository')
		private skillsRepository: ISkillsRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) { }

	async execute(): Promise<Skill[]> {
		let hasCache = await this.cacheProvider.recover<Skill[]>('skills')

		if (!hasCache) {
			hasCache = await this.skillsRepository.list()
			await this.cacheProvider.save('skills', hasCache)
		}

		return hasCache
	}
}
