import SkillsDepartments from '../infra/typeorm/entities/SkillsDepartments'

export default interface ISkillsDepartmentsRepository {
  save(skillSetor: SkillsDepartments): Promise<SkillsDepartments>
  list(): Promise<SkillsDepartments[]>
  deleteById(id: number): Promise<void>
  findBySkillAndSetor(skill_id: number, setor_id: number): Promise<SkillsDepartments | null>
  findBySkillId(skill_id: number): Promise<SkillsDepartments | null>
  findById(id: number): Promise<SkillsDepartments | null>
}