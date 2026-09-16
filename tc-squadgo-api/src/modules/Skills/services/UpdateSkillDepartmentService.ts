import { inject, injectable } from 'tsyringe'

import SkillNotFoundException from '../../../shared/infra/exceptions/SkillNotFoundException'
import ISkillsDepartmentsRepository from '../repositories/ISkillsDepartmentsRepository'
import SkillsDepartments from '../infra/typeorm/entities/SkillsDepartments'
import { Console } from 'console'

interface IRequest {
	skillDepartment_id: number
	skill_id: number
	department_id: number
}

@injectable()
export default class UpdateSkillDepartmentService {
	constructor(
		@inject('SkillsDepartmentsRepository')
		private skillsDepartmentsRepository: ISkillsDepartmentsRepository,
	) { }

	async execute(data: IRequest): Promise<SkillsDepartments> {
		const { skillDepartment_id, skill_id, department_id } = data
		const skillDepartmentExistsById = await this.skillsDepartmentsRepository.findById(skillDepartment_id)
		if (!skillDepartmentExistsById) throw new SkillNotFoundException()
			skillDepartmentExistsById.setor_id = department_id
			skillDepartmentExistsById.skill_id = skill_id


		const save = await this.skillsDepartmentsRepository.save(skillDepartmentExistsById)
		return save
	}
}
