import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Project from './Project'

export enum HistoricType {
	NEW_PROJECT,
	CLOSING_PROJECT,
	NAME,
	HOURS,
	TYPE,
	STATUS,
	START_ESTIMATE,
	RESPONSIBLE_ID,
	CUSTOMER_ID,
	ADD_RESOURCE,
	REMOVE_RESOURCE,
	INCREASE_RESOURCE_HOURS,
	DECREASE_RESOURCE_HOURS,
}

export type HistoricTypeProps =
	'NEW_PROJECT' |
	'CLOSING_PROJECT' |
	'NAME' |
	'HOURS' |
	'TYPE' |
	'STATUS' |
	'START_ESTIMATE' |
	'RESPONSIBLE_ID' |
	'CUSTOMER_ID' |
	'ADD_RESOURCE' |
	'REMOVE_RESOURCE' |
	'INCREASE_RESOURCE_HOURS' |
	'DECREASE_RESOURCE_HOURS'

@Entity('projects_historic')
export default class ProjectHistoric extends BaseEntity {

	@Column()
	description: string

	@Column()
	project_id: number

	@ManyToOne(() => Project)
	@JoinColumn({ name: 'project_id' })
	project: Project

	@Column({
		type: 'enum',
		enum: HistoricType
	})
	type: string
}
