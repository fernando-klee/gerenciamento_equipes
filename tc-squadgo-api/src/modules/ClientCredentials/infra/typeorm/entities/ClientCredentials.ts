import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('client_credentials')
export default class ClientCredentials {
	@PrimaryGeneratedColumn('increment')
	client_id: number

	@Column()
	client_secret: string

	@Column()
	client_name: string
}
