import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'
import Resource from '../../../../Resources/infra/typeorm/entities/Resource'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Customer from '../../../../Customers/infra/typeorm/entities/Customer'
import ProjectHistoric from './ProjectHistoric'

export enum TypeProject {
	PF,
	PR,
	POC
}

export type TypeProps = 'PF' | 'PR'

export enum StatusProject {
	EM_ANDAMENTO,
	A_INICIAR,
	CONCLUIDO
}

export type StatusProps = 'EM_ANDAMENTO' | 'A_INICIAR' | 'CONCLUIDO'

@Entity('projects')
export default class Project extends BaseEntity {

	@Column()
	name: string

	@Column({ type: 'int', nullable: true })
	hours?: number | null

	@Column({
		type: 'enum',
		enum: TypeProject
	})
	type: string

	@Column({
		type: 'enum',
		enum: StatusProject
	})
	status: string

	@Column()
	start_estimate: Date

	@Column()
	end_estimate: Date

	@Column({ nullable: true })
	conclusion_date?: Date

	@OneToMany(() => ProjectHistoric, projectHistoric => projectHistoric.project, { eager: false })
	projectHistorics: ProjectHistoric[]

	@Column({ nullable: true })
	responsible_id?: number | null

	@ManyToOne(() => Resource, { eager: false })
	@JoinColumn({ name: 'responsible_id' })
	responsible?: Resource | null

	@Column({ type: 'int', nullable: true })
	customer_id: number | null

	@ManyToOne(() => Customer, { eager: false })
	@JoinColumn({ name: 'customer_id' })
	customer: Customer

	@ManyToMany(() => Resource, { eager: false })
	@JoinTable({
		name: 'projects_resources',
		joinColumns: [{ name: 'project_id' }],
		inverseJoinColumns: [{ name: 'resource_id' }, { name: 'hours_amount' }]
	})
	resources: Resource[]

	// @Column({ type: 'varchar', nullable: true })
	// customer_poc?: string | null
}
