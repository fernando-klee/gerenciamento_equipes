import { inject, injectable } from 'tsyringe'

import { addHours } from 'date-fns'

import INotificationsRepository from '../repositories/INotificationsRepository'
import ISocketIoProvider from '../../../shared/providers/socketIoProvider/interfaces/ISocketIoProvider'
import ResourcesRepository from '../../Resources/infra/typeorm/repositories/ResourcesRepository'

interface IRequest {
	description: string
	userRegistry: string
}

@injectable()
export default class CreateNotificationScheduleService {
	constructor(
		@inject('NotificationsRepository')
		private notificationsRepository: INotificationsRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: ResourcesRepository,

		@inject('SocketIoProvider')
		private socketIoProvider: ISocketIoProvider
	) { }

	async execute(data: IRequest): Promise<void> {
		const resource = await this.resourcesRepository.findByRegistry(data.userRegistry)

		if (resource) {
			let notificationCreated = await this.notificationsRepository.create({
				resource_id: resource.id,
				description: data.description,
				type: 'SCHEDULE',
				object_id: undefined
			})

			notificationCreated = { ...notificationCreated, created_at: addHours(notificationCreated.created_at, 3) }

			await this.socketIoProvider.onEmit(`notification-${resource.id}`, notificationCreated)
		}
	}
}
