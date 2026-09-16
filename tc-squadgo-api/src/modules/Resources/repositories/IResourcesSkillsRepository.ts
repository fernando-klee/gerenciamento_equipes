import CreateOrUpdateResourceSkillDTO from '../dtos/CreateOrUpdateResourceSkillDTO'
import ResourceSkill from '../infra/typeorm/entities/ResourceSkill'

export default interface IResourcesSkillsRepository {
  findOne(resource_id: number, skill_id: number): Promise<ResourceSkill | null>
  listByResourceId(resource_id: number): Promise<ResourceSkill[]>
  findBySkillsIds(skills_ids: number[]): Promise<ResourceSkill[]>
  create(data: CreateOrUpdateResourceSkillDTO): Promise<ResourceSkill>
  update(resourceSkill: ResourceSkill): Promise<ResourceSkill>
  delete(id: number): Promise<void>
}
