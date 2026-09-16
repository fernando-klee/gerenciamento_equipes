import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('rooms')
export default class Rooms {

    @PrimaryGeneratedColumn('increment')
	id: number

    @Column()
    name: string

    @Column()
    seats: number
}
