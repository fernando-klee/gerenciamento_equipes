import SkillsPending from '../infra/typeorm/entities/SkillsPending'

export default interface ISkillsPendingRepository {
	save(skillPending: SkillsPending): Promise<SkillsPending>
	deleteById(skill_pending_id: number): Promise<void>
}
