import { inject, injectable } from 'tsyringe'
import ISkillsRepository from '../../Skills/repositories/ISkillsRepository'
import IResourcesRepository from '../repositories/IResourcesRepository'
import IResourcesSkillsRepository from '../repositories/IResourcesSkillsRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'


@injectable()
export default class ListResourceSkillsService {
    constructor(
        @inject('ResourcesRepository')
        private resourcesRepository: IResourcesRepository,

        @inject('SkillsRepository')
        private skillsRepository: ISkillsRepository,

        @inject('ResourcesSkillsRepository')
        private resourcesSkillsRepository: IResourcesSkillsRepository
    ) { }

    async execute(resource_id: number): Promise<any[]> {
        const resourceExists = await this.resourcesRepository.findById(resource_id)
        if(!resourceExists) throw new ResourceNotFoundException()

        const existingSkills = await this.skillsRepository.list()

        const existingResourcesSkills = await this.resourcesSkillsRepository.listByResourceId(resource_id)

        const totalResourcesSkills = await Promise.all(
            existingSkills.map(async es => {
                const resourceContainsSkill = existingResourcesSkills.find(ers => ers.skill.id === es.id)
                const resourceSkill = {
                    skill: {
                        id: es.id,
                        description: es.description,
                        type: es.type
                    },
                    point: 0,
                }
                if(resourceContainsSkill) {
                    Object.assign(resourceSkill, {
                        point: resourceContainsSkill.point
                    })
                }

                return resourceSkill
            })
        )

        return totalResourcesSkills
    }
}