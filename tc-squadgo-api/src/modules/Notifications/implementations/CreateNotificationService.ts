import { inject, injectable } from 'tsyringe'

import { addHours } from 'date-fns'

import IUsersRepository from '../../Accounts/repositories/IUsersRepository'
import INotificationsRepository from '../repositories/INotificationsRepository'
import ICreateNotificationService from '../interfaces/ICreateNotificationService'
import ISocketIoProvider from '../../../shared/providers/socketIoProvider/interfaces/ISocketIoProvider'
import IRequestNotificationDTO from '../dtos/IRequestNotificationDTO'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'

@injectable()
export default class CreateNotificationService implements ICreateNotificationService {
	constructor(
		@inject('NotificationsRepository')
		private notificationsRepository: INotificationsRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('SocketIoProvider')
		private socketIoProvider: ISocketIoProvider
	) { }

	async execute(data: IRequestNotificationDTO): Promise<void> {
		const resources = await this.resourcesRepository.list()
		for await (const u of resources) {
			const userPermissions = await this.resourcesRepository.listPermissionsByResourceId(u.id)
			const userHasPermission = await Promise.resolve(userPermissions.find(p => p.slug === data.object_type))
			if (userHasPermission) {
				let notificationCreated = await this.notificationsRepository.create({ resource_id: u.id, description: data.description, type: data.type, object_id: data.object_id })

				if (process.env.NODE_ENV === 'prod') {
					notificationCreated = { ...notificationCreated, created_at: addHours(notificationCreated.created_at, 3) }
				}

				await this.socketIoProvider.onEmit(`notification-${u.id}`, notificationCreated)
			}
		}
	}
}
