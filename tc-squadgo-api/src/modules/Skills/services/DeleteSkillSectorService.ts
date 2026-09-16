import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import SkillNotFoundException from '../../../shared/infra/exceptions/SkillNotFoundException'
import ISkillsSetoresRepository from '../../Skills/repositories/ISkillsDepartmentsRepository'


@injectable()
export default class DeleteSkillSectorService {
	constructor(
        @inject('SkillsSetoresRepository')
		private skillsSetoresRepository: ISkillsSetoresRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) { }

	async execute(skillSector_id: number): Promise<void> {
		const skillsExists = await this.skillsSetoresRepository.findById(skillSector_id)
		if (!skillsExists) throw new SkillNotFoundException()

		await this.cacheProvider.invalidate('skills')

		await this.skillsSetoresRepository.deleteById(skillSector_id)
	}
}
