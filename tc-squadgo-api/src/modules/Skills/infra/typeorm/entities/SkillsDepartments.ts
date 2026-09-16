import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import Skill from './Skill'
import Department from './Department'

@Entity('skills_setores')
export default class SkillsDepartments extends BaseEntity {

	@Column()
	skill_id: number

	@ManyToOne(() => Skill)
	@JoinColumn({ name: 'skill_id' })
	skill: Skill

	@Column()
	setor_id: number

	@ManyToOne(() => Department)
	@JoinColumn({ name: 'setor_id' })
	department: Department
}