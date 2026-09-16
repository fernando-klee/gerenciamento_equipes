import { inject, injectable } from 'tsyringe'
import IRoomsResourcesWeekdaysRepository from '../repositories/IRoomsResourcesWeekdaysRepository'
import RoomsResourcesWeekdays from '../infra/typeorm/entities/RoomsResourcesWeekdays'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import IRoomsRepository from '../../Rooms/repositories/IRoomsRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import RoomNotFoundException from '../../../shared/infra/exceptions/RoomNotFoundException'
import ISendMail from '../../../shared/providers/mailProvider/interfaces/ISendMail'
import ResourceInSeveralRoomsInSameDayException from '../../../shared/infra/exceptions/ResourceInSeveralRoomsInSameDay'

interface Request {
	data: {
		week_day: number;
		room_id: number;
		month: number;
		resource_id: number;
	}[];
	creator_id: string;
}

@injectable()
export default class AddScheduleResourcesService {
	constructor(
		@inject('RoomsResourcesWeekdaysRepository')
		private roomsResourcesWeekdaysRepository: IRoomsResourcesWeekdaysRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('MailProvider')
		private mailProvider: ISendMail,

		@inject('RoomsRepository')
		private roomsRepository: IRoomsRepository,
	) { }

	async execute({
		data,
		creator_id,
	}: Request): Promise<RoomsResourcesWeekdays[]> {
		const createdResources: RoomsResourcesWeekdays[] = []

		for (const item of data) {
			const { week_day, room_id, month, resource_id } = item

			const resourceInMoreThanOneRoomPerDay =
				await this.roomsResourcesWeekdaysRepository.findAllByResourceIdAndDayAndMonth(
					resource_id,
					week_day,
					month
				)

			if (resourceInMoreThanOneRoomPerDay.length > 0) {
				throw new ResourceInSeveralRoomsInSameDayException()
			}

			const resource_to_add = await this.resourcesRepository.findById(
				resource_id
			)
			if (!resource_to_add) throw new ResourceNotFoundException()

			const resource_creator =
				await this.resourcesRepository.findByOnlyResourceByRegistry(creator_id)
			if (!resource_creator) throw new ResourceNotFoundException()

			const roomInfo = await this.roomsRepository.findById(room_id)
			if (!roomInfo) throw new RoomNotFoundException()

			const created = await this.roomsResourcesWeekdaysRepository.create({
				resource_id,
				week_day,
				room_id,
				creator_id: resource_creator.id,
				month,
			})

			createdResources.push(created)
		}

		return createdResources
	}
}
