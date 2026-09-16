import { inject, injectable } from 'tsyringe'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import INotificationsRepository from '../repositories/INotificationsRepository'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'

@injectable()
export default class ReadAllNotificationsService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('NotificationsRepository')
		private notificationsRepository: INotificationsRepository
	) { }

	async execute(user_id: string): Promise<void> {
		const userExists = await this.resourcesRepository.findByRegistry(user_id)
		if (!userExists) throw new UserNotFoundException()

		const notifications = await this.notificationsRepository.listByResourceId(Number(userExists.id))
		
		// If there are no notifications, just return
		if (!notifications || notifications.length === 0) {
			return
		}

		// Update each notification to be marked as read
		for (const notification of notifications) {
			notification.readed = true
		}

		await this.notificationsRepository.saveAll(notifications)
	}
}
