import { inject, injectable } from 'tsyringe'
import IDraftsRoomsResourcesWeekdaysRepository from '../repositories/IDraftsRoomsResourcesWeekdaysRepository'
import WeekdayDoesNotExistException from '../../../shared/infra/exceptions/WeekdayDoesNotExistException'
import RoomsResourcesWeekdays from '../infra/typeorm/entities/RoomsResourcesWeekdays'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository' 
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'

interface Request {
	resource_id: number
	week_day: number
	room_id: number
	creator_id: string
	month: number
}

@injectable()
export default class AddDraftsRoomsResourcesWeekdaysService {
	constructor(
		@inject('DraftsRoomsResourcesWeekdaysRepository')
		private draftsRoomsResourcesWeekdaysRepository: IDraftsRoomsResourcesWeekdaysRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository
	) {}

	async execute({
		week_day,
		room_id,
		creator_id,
		month,
		resource_id,
	}: Request): Promise<RoomsResourcesWeekdays> {
		if (week_day < 1 || week_day > 5) throw new WeekdayDoesNotExistException()

		const resource_creator = await this.resourcesRepository.findByOnlyResourceByRegistry(creator_id)
		if(!resource_creator) throw new ResourceNotFoundException

		const created = await this.draftsRoomsResourcesWeekdaysRepository.create({
			resource_id,
			week_day,
			room_id,
			creator_id: resource_creator.id,
			month,
		})

		return created
	}
}
