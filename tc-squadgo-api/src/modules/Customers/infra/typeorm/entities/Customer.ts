import { Expose } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Project from '../../../../../modules/Projects/infra/typeorm/entities/Project'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'

export enum CustomerStatus {
	ATIVO, INATIVO
}

export type StatusProps = 'ATIVO' | 'INATIVO'

@Entity('customers')
export default class Customer extends BaseEntity {

	@PrimaryGeneratedColumn('increment')
	id: number

	@Column()
	name: string

	@Column({
		type: 'enum',
		enum: CustomerStatus
	})
	status: string

	@Column()
	image_url: string

	@Column()
	hired_hours: number

	@Column()
	resource_profile: string

	@Column()
	start_contract_time: Date

	@Column()
	end_contract_time: Date

	@Column()
	responsible_name: string

	@Column()
	responsible_email: string

	@Column()
	responsible_phone: string

	@Column()
	objective: string

	@OneToMany(() => Project, project => project.customer)
	projects: Promise<Project[]>

	@Expose({ name: 'image_url' })
	getImageUrl(): string | null {
		if (!this.image_url) return null

		if (process.env.STORAGE_DRIVER === 'disk') {
			return `${process.env.APP_API_URL}/files/customers-images/${this.image_url}`
		} else {
			const bucket = process.env.S3_BUCKET
			return `https://${bucket}.s3.us-west-2.amazonaws.com/customers_images/${this.image_url}`
		}
	}
}
