import { Column, Entity } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'

@Entity('classifications')
export default class Classification extends BaseEntity {

	@Column()
	description: string

}
