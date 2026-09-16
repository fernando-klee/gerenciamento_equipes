import { inject, injectable } from 'tsyringe'

import ISkillsDepartmentsRepository from '../repositories/ISkillsDepartmentsRepository'
import SkillsDepartments from '../infra/typeorm/entities/SkillsDepartments'
import SkillNotFoundException from '../../../shared/infra/exceptions/SkillNotFoundException'

@injectable()
export default class FindSkillDepartmentBySkillIdService {
	constructor(
		@inject('SkillsDepartmentsRepository')
		private skillsDepartmentsRepository: ISkillsDepartmentsRepository,
	) {}

	async execute(skill_id: number): Promise<SkillsDepartments> {
		const skillDepartment = await this.skillsDepartmentsRepository.findBySkillId(skill_id)
		if (!skillDepartment) throw new SkillNotFoundException()
	
		return skillDepartment
	}
}