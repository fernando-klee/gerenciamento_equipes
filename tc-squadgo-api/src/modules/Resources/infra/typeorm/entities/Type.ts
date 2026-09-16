import { Column, Entity } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'

@Entity('types')
export default class Type extends BaseEntity {
	@Column()
	name: string
}
