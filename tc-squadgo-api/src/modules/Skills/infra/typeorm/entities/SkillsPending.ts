import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import Skill from './Skill'
import Resource from '../../../../Resources/infra/typeorm/entities/Resource'

enum statusType {
	PENDENTE, RECUSADO, APROVADO 
}

@Entity('skills_pending')
export default class SkillsPending extends BaseEntity {

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'id' })
	@Column()
	resource_indicate: number

    @ManyToOne(() => Resource)
	@JoinColumn({ name: 'id' })
	@Column()
	leader_id: number

	@Column({
		type: 'enum',
		enum: statusType
	})
	@Column()
	status: string

	@ManyToOne(() => Skill)
	@JoinColumn({ name: 'id' })
	@Column()
	skill_id: number
}
