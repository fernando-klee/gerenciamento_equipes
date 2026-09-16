import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import SkillNotFoundException from '../../../shared/infra/exceptions/SkillNotFoundException'
import RelationAlreadyExistsException from '../../../../src/shared/infra/exceptions/RelationAlreadyExistsException'
import SetorNotFoundException from '../../../../src/shared/infra/exceptions/SetorNotFoundException'
import ISkillsRepository from '../repositories/ISkillsRepository'
import ISkillsDepartmentsRepository from '../../Skills/repositories/ISkillsDepartmentsRepository'
import IDepartmentRepository from '../../Skills/repositories/IDepartmentRepository'
import SkillsSetores from '../infra/typeorm/entities/SkillsDepartments'

interface SkillsSetoresDTO {
	skill_id: number;
	setor_id: number;
}

@injectable()
export default class AttachSkillSectorService {
	constructor(
		@inject('SkillsRepository')
		private skillsRepository: ISkillsRepository,

		@inject('SkillsDepartmentsRepository')
		private skillsDepartmentsRepository: ISkillsDepartmentsRepository,

		@inject('DepartmentRepository')
		private departmentRepository: IDepartmentRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) {}

	async execute(skill_id: number, setor_id: number): Promise<SkillsSetoresDTO> {
		const skillsExists = await this.skillsRepository.findById(skill_id)
		if (!skillsExists) throw new SkillNotFoundException()

		const setorExists = await this.departmentRepository.findById(setor_id)
		if (!setorExists) throw new SetorNotFoundException()

		const relationAlreadyExists =
			await this.skillsDepartmentsRepository.findBySkillAndSetor(
				skill_id,
				setor_id
			)
		if (relationAlreadyExists) throw new RelationAlreadyExistsException()

		const skillSetorCreated = new SkillsSetores()
		skillSetorCreated.skill_id = skill_id
		skillSetorCreated.setor_id = setor_id

		await this.cacheProvider.invalidate('skills')

		const savedSkillSetor = await this.skillsDepartmentsRepository.save(
			skillSetorCreated
		)

		const skillsSetoresDTO: SkillsSetoresDTO = {
			skill_id: savedSkillSetor.skill_id,
			setor_id: savedSkillSetor.setor_id,
		}

		return skillsSetoresDTO
	}
}
