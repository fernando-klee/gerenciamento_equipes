import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Classification from './Classification'
import Resource from './Resource'

@Entity('resources_classifications')
export default class ResourcesClassifications extends BaseEntity {
	@Column()
	resource_id: number

	@OneToOne(() => Resource)
	@JoinColumn({ name: 'resource_id' })
	resource: Resource

	@Column()
	classification_id: number

	@ManyToOne(() => Classification)
	@JoinColumn({ name: 'classification_id' })
	classification: Classification
}
