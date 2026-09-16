import { Repository, In } from 'typeorm'
import CreateOrUpdateResourceSkillDTO from 'modules/Resources/dtos/CreateOrUpdateResourceSkillDTO'
import IResourcesSkillsRepository from '../../../repositories/IResourcesSkillsRepository'
import ResourceSkill from '../entities/ResourceSkill'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class ResourcesSkillsRepository implements IResourcesSkillsRepository {
    private ormRepository: Repository<ResourceSkill>

    constructor() {
        this.ormRepository = AppDataSource.getRepository(ResourceSkill)
    }

    async listByResourceId(resource_id: number): Promise<ResourceSkill[]> {
        const data = this.ormRepository.createQueryBuilder('rk')
            .select([
                'rk.id',
                'rk.point',
                'rk.created_at',
                'skill.id',
                'skill.description',
                'skill.type'
            ])
            .leftJoin('rk.skill', 'skill')
            .where('rk.resource_id = :resource_id', { resource_id })
            .getMany()
        return await data
    }

    async findBySkillsIds(skills_ids: number[]): Promise<ResourceSkill[]> {
        return await this.ormRepository.findBy({ skill_id: In(skills_ids) })
    }

    async findOne(resource_id: number, skill_id: number): Promise<ResourceSkill | null> {
        return await this.ormRepository.findOne({ where: { resource_id, skill_id }})
    }

    async create(data: CreateOrUpdateResourceSkillDTO): Promise<ResourceSkill> {
        const resourceSkillCreated = this.ormRepository.create(data)
        return await this.ormRepository.save(resourceSkillCreated)
    }

    async update(resourceSkill: ResourceSkill): Promise<ResourceSkill> {
        return await this.ormRepository.save(resourceSkill)
    }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id)
    }
}
