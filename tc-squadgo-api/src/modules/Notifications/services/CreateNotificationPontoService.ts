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
export default class CreateNotificationPontoService {
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
			console.log(resource.id)

			let notificationCreated = await this.notificationsRepository.create({
				resource_id: resource.id,
				description: data.description,
				type: 'PONTO',
				object_id: undefined
			})

			console.log(notificationCreated)

			notificationCreated = { ...notificationCreated, created_at: addHours(notificationCreated.created_at, 3) }

			await this.socketIoProvider.onEmit(`notification-${resource.id}`, notificationCreated)
		}
	}
}
