import { inject, injectable } from 'tsyringe'

import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'
import SkillNotFoundException from '../../../shared/infra/exceptions/SkillNotFoundException'
import RelationAlreadyExistsException from '../../../shared/infra/exceptions/RelationAlreadyExistsException'
import DepartmentNotFoundException from '../../../shared/infra/exceptions/DepartmentNotFoundException'
import ISkillsRepository from '../repositories/ISkillsRepository'
import ISkillsDepartmentsRepository from '../repositories/ISkillsDepartmentsRepository'
import IDepartmentRepository from '../repositories/IDepartmentRepository'
import SkillsDeparments from '../infra/typeorm/entities/SkillsDepartments'

interface SkillsDepartmentsDTO {
	skill_id: number;
	department_id: number;
}

@injectable()
export default class AttachSkillDepartmentService {
	constructor(
		@inject('SkillsRepository')
		private skillsRepository: ISkillsRepository,

		@inject('SkillsDepartmentRepository')
		private skillsDepartmentRepository: ISkillsDepartmentsRepository,

		@inject('DepartmentRepository')
		private departmentRepository: IDepartmentRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) {}

	async execute(skill_id: number, department_id: number): Promise<SkillsDepartmentsDTO> {
		const skillsExists = await this.skillsRepository.findById(skill_id)
		if (!skillsExists) throw new SkillNotFoundException()

		const setorExists = await this.departmentRepository.findById(department_id)
		if (!setorExists) throw new DepartmentNotFoundException()

		const relationAlreadyExists =
			await this.skillsDepartmentRepository.findBySkillAndSetor(
				skill_id,
				department_id
			)
		if (relationAlreadyExists) throw new RelationAlreadyExistsException()

		const skillSetorCreated = new SkillsDeparments()
		skillSetorCreated.skill_id = skill_id
		skillSetorCreated.department_id = department_id

		await this.cacheProvider.invalidate('skills')

		const savedSkillSetor = await this.skillsDepartmentRepository.save(
			skillSetorCreated
		)

		const skillsSetoresDTO: SkillsDepartmentsDTO = {
			skill_id: savedSkillSetor.skill_id,
			department_id: savedSkillSetor.department_id,
		}

		return skillsSetoresDTO
	}
}
