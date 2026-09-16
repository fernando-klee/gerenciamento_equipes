import Resource from '../../../../Resources/infra/typeorm/entities/Resource'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Project from './Project'

@Entity('projects_resources')
export default class ProjectResource extends BaseEntity {
	@Column()
	project_id: number

	@ManyToOne(() => Project)
	@JoinColumn({ name: 'project_id' })
	project: Project

	@Column()
	resource_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'resource_id' })
	resource: Resource

	@Column()
	hours_amount: number
}
