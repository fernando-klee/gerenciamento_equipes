import { inject, injectable } from 'tsyringe'
import ISkillsRepository from '../../Skills/repositories/ISkillsRepository'
import IResourcesRepository from '../repositories/IResourcesRepository'
import IResourcesSkillsRepository from '../repositories/IResourcesSkillsRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import ResourceSkill from '../infra/typeorm/entities/ResourceSkill'
import SkillNotFoundException from '../../../shared/infra/exceptions/SkillNotFoundException'
import ICreateResourceHistoricService from '../providers/interfaces/ICreateResourceHistoricService'

interface IRequest {
    resource_id: number
    skill_id: number
    point: number
}

@injectable()
export default class UpdateResourceSkillsService {
    constructor(
        @inject('ResourcesRepository')
        private resourcesRepository: IResourcesRepository,

        @inject('SkillsRepository')
        private skillsRepository: ISkillsRepository,

        @inject('ResourcesSkillsRepository')
        private resourcesSkillsRepository: IResourcesSkillsRepository,

				@inject('CreateResourceHistoricService')
				private createResourceHistoricService: ICreateResourceHistoricService
    ) { }

    async execute(data: IRequest): Promise<ResourceSkill> {
        const { resource_id, skill_id, point } = data
        const resourceExists = await this.resourcesRepository.findById(resource_id)
        if(!resourceExists) throw new ResourceNotFoundException()

        const existingSkill = await this.skillsRepository.findById(skill_id)
        if(!existingSkill) throw new SkillNotFoundException()

				const resourceSkill = await this.resourcesSkillsRepository.findOne(resource_id, skill_id)

				const skillType = existingSkill.type === 'HARD' ? 'hardskill' : 'softskill'

				if(!resourceSkill) {
					const resourceSkillCreated = await this.resourcesSkillsRepository.create(data)

					return resourceSkillCreated
				}

				const type = point >= resourceSkill.point ? 'INCREASE_SKILL' : 'DECREASE_SKILL'
				const increaseOrDecrease = point >= resourceSkill.point ? 'Aumentou' : 'Diminuiu'

				await this.createResourceHistoricService.execute({
					resource_id,
					description: `${increaseOrDecrease} a ${skillType} "${existingSkill.description}" para o nível ${point}`,
					type
				})

				resourceSkill.point = point
				return await this.resourcesSkillsRepository.update(resourceSkill)
    }
}
