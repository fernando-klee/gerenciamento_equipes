import { inject, injectable } from 'tsyringe'
import Notification from '../infra/typeorm/entities/Notification'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import INotificationsRepository from '../repositories/INotificationsRepository'
import NotificationNotFoundException from '../../../shared/infra/exceptions/NotificationNotFoundException'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'


@injectable()
export default class ReadNotificationService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('NotificationsRepository')
		private notificationsRepository: INotificationsRepository
	) { }

	async execute(user_id: string, notification_id: number): Promise<Notification> {
		const userExists = await this.resourcesRepository.findByRegistry(user_id.toString())
		if (!userExists) throw new UserNotFoundException()

		const notificationExists = await this.notificationsRepository.findById(notification_id)
		if (!notificationExists) throw new NotificationNotFoundException()

		if (notificationExists.resource_id != userExists.id) throw new NotificationNotFoundException()

		notificationExists.readed = true

		return await this.notificationsRepository.save(notificationExists)
	}
}
