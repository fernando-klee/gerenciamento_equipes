import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity } from 'typeorm'

enum SkillType {
	HARD, SOFT
}

@Entity('skills')
export default class Skill extends BaseEntity {

	@Column()
	description: string

	@Column({
		type: 'enum',
		enum: SkillType
	})
	type: string
}
