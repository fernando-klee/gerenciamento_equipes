import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Expose } from 'class-transformer'
import Role from '../../../../Authorizations/infra/typeorm/entities/Role'
import uploadConfig from '../../../../../config/uploadConfig'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Skill from '../../../../Skills/infra/typeorm/entities/Skill'
import ResourceStat from './ResourceStatus'
import Type from './Type'
import ResourcesClassifications from './ResourcesClassifications'

export enum ResourceStatus {
	ALOCADO,
	DISPONIVEL,
	PARCIALMENTE,
	TREINAMENTO,
	FERIAS
}

export type StatusProps =
	'ALOCADO' |
	'DISPONIVEL' |
	'PARCIALMENTE' |
	'TREINAMENTO' |
	'FERIAS' |
	'INATIVO'

@Entity('resources')
export default class Resource extends BaseEntity {

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	photo_url: string

	@Column()
	leader: boolean

	@Column({
		type: 'enum',
		enum: ResourceStatus
	})
	status: string

	@Column()
	admission_date: Date

	@Column()
	vacation_date: Date

	@Column()
	registry: string

	@OneToOne(() => ResourceStat, resourceStatus => resourceStatus.resource)
	resourceStatus: ResourceStat

	@OneToOne(() => ResourcesClassifications, resourceClassification => resourceClassification.resource)
	resourceClassification: ResourcesClassifications

	@ManyToMany(() => Type)
	@JoinTable({
		name: 'resources_types',
		joinColumn: { name: 'resource_id' },
		inverseJoinColumn: { name: 'type_id' }
	})
	types: Promise<Type[]>

	@Column()
	hours_amount: number

	@ManyToMany(() => Role)
	@JoinTable({
		name: 'resources_roles',
		joinColumn: { name: 'resource_id' },
		inverseJoinColumn: { name: 'role_id' }
	})
	roles?: Promise<Role[]>

	@ManyToMany(() => Skill)
	@JoinTable({
		name: 'resources_skills',
		joinColumns: [{ name: 'resource_id' }],
		inverseJoinColumns: [{ name: 'skill_id' }, { name: 'point' }]
	})
	skills: Promise<Skill[]>

	@Expose({ name: 'photo_url' })
	getPhotoUrl(): string | null {
		if (!this.photo_url) return null

		if (process.env.STORAGE_DRIVER === 'disk') {
			return `https://equipes.s3.us-west-2.amazonaws.com/resources_photos/${this.photo_url}`
		} else {
			const bucket = uploadConfig.config.aws.bucket
			return `https://equipes.s3.us-west-2.amazonaws.com/resources_photos/${this.photo_url}`
		}
	}

	@Column({nullable: true})
	backFromVacation: Date

	@Column({nullable: true})
	output_estimate: Date

	@Column({nullable: true})
	departure_forecast: Date

	@Column({nullable: true})
	leader_id: number
}
