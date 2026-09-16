import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import Project from '../../../../Projects/infra/typeorm/entities/Project'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Resource from './Resource'

@Entity('resource_projects_historic')
export default class ResourceProjectsHistoric extends BaseEntity {
	@Column()
	resource_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'resource_id' })
	resource: Resource

	@Column()
	project_id: number

	@ManyToOne(() => Project)
	@JoinColumn({ name: 'project_id' })
	project: Project
}
