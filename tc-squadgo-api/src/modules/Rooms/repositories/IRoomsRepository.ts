import Rooms from '../infra/typeorm/entities/Rooms'

export default interface IRoomsRepository {
	save(rooms: Rooms): Promise<Rooms>
	list(): Promise<Rooms[]>
	listWithProps(): Promise<Rooms[]>
	findById(id: number): Promise<Rooms | null>
	findByName(name: string): Promise<Rooms | null>
	findBySeats(seats: number): Promise<Rooms | null>
	update(rooms: Rooms): Promise<Rooms | null>
	deleteById(id: number): Promise<void>
}
