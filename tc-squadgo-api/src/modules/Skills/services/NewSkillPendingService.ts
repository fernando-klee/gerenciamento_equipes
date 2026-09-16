import { inject, injectable } from 'tsyringe'

import SkillPending from '../infra/typeorm/entities/SkillsPending'
import ISkillsPendingRepository from '../repositories/ISkillsPendingRepository'
import ICreateNotificationService from '../../Notifications/interfaces/ICreateNotificationService'
import ISkillsRepository from '../repositories/ISkillsRepository'

@injectable()
export default class NewSkillPending {
	constructor(
		@inject('SkillsRepository')
		private skillsPendingRepository: ISkillsPendingRepository,

		@inject('CreateNotificationService')
		private createNotificationService: ICreateNotificationService,

		@inject('SkillsRepository')
		private skillsRepository: ISkillsRepository,
	) { }

	async execute(resource_indicate: number, leader_id: number, skill_id: number, status: string): Promise<SkillPending> {
		const skillPendingCreated = new SkillPending()
		skillPendingCreated.resource_indicate = resource_indicate
		skillPendingCreated.leader_id = leader_id
		skillPendingCreated.skill_id = skill_id
		skillPendingCreated.status = status
		console.log(skillPendingCreated)

		if (!skillPendingCreated) {
			throw new Error('Error ao criar uma skill pendente')
		}

		return await this.skillsPendingRepository.save(skillPendingCreated)
	}
}
