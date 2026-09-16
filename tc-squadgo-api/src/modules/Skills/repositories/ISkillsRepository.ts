import Skill from '../infra/typeorm/entities/Skill'

export default interface ISkillsRepository {
	save(skill: Skill): Promise<Skill>
	findByDescription(description: string): Promise<Skill | null>
	findById(skill_id: number): Promise<Skill | null>
	findByDescriptionAndType(description: string, type: string): Promise<Skill | null>
	deleteById(skill_id: number): Promise<void>
	list(): Promise<Skill[]>
	listByIds(ids: number[]): Promise<Skill[]>
}
