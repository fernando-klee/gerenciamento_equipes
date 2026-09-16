import { Repository } from 'typeorm'
import Rooms from '../entities/Rooms'
import IRoomsRepository from 'modules/Rooms/repositories/IRoomsRepository'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class RoomsRepository implements IRoomsRepository {
	private ormRepository: Repository<Rooms>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Rooms)
	}

    async save(rooms: Rooms): Promise<Rooms> {
		const roomCreated = this.ormRepository.create(rooms)

		return await this.ormRepository.save(roomCreated)
	}

	async list(): Promise<Rooms[]> {
		return await this.ormRepository.find()
	}

	async listWithProps(): Promise<Rooms[]> {
		const data = await this.ormRepository.createQueryBuilder('room')
		.select([
			'room.id',
			'room.name',
			'room.seats'
		])
		.getMany()

		return data
	}

    async findById(id: number): Promise<Rooms | null> {
		return await this.ormRepository.findOne({ where: { id } })
	}

	async findByName(name: string): Promise<Rooms | null> {
		return await this.ormRepository.findOne({ where: { name } })
	}

	async findBySeats(seats: number): Promise<Rooms | null> {
		return await this.ormRepository.findOne({ where: { seats } })
	}

	async update(rooms: Rooms): Promise<Rooms | null> {
		return await this.ormRepository.save(rooms)
	}

	async deleteById(id: number): Promise<void> {
		await this.ormRepository.delete(id)
	}

}
