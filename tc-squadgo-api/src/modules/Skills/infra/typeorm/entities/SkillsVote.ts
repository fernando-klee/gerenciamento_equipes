import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import Skill from './Skill'
import Resource from '../../../../Resources/infra/typeorm/entities/Resource'
import SkillsPending from './SkillsPending'

enum answerType {
	SIM, NAO 
}

@Entity('skills_vote')
export default class SkillsVote extends BaseEntity {

	@ManyToOne(() => SkillsPending)
	@JoinColumn({ name: 'id' })
	@Column()
	id_skills_pending: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'id' })
	@Column()
	resource_id: number

	@Column({
		type: 'enum',
		enum: answerType
	})
	@Column()
	answer: string

    @Column()
	reason: string 
}
