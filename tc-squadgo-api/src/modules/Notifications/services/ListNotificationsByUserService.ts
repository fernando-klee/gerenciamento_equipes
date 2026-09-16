import { inject, injectable } from 'tsyringe'
import { addHours } from 'date-fns'

import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import INotificationsRepository from '../repositories/INotificationsRepository'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
interface IRequest {
	user_id: string
	currentPage: number
}

@injectable()
export default class ListNotificationsByUserService {
	constructor(
		@inject('NotificationsRepository')
		private notificationsRepository: INotificationsRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository
	) { }

	async execute(data: IRequest): Promise<any> {
		const { user_id, currentPage } = data

		const userExists = await this.resourcesRepository.findByRegistry(user_id)
		if (!userExists) throw new UserNotFoundException()

		const qtdPerPage = 5
		const skipByPage = (qtdPerPage * currentPage) - qtdPerPage

		const { totalNotifications, notifications } =
			await this.notificationsRepository.filterByResourceId({ resource_id: userExists.id, currentPage: Number(skipByPage), qtdPerPage })

		let last_page = Math.ceil(totalNotifications / qtdPerPage)

		if (last_page === 0) last_page = 1

		let notificationsRefactored = notifications

		if (process.env.NODE_ENV === 'prod') {
			notificationsRefactored = notificationsRefactored.map((n: any) => {
				return { ...n, created_at: addHours(n.created_at, 3) }
			})
		}

		const notificationsData = {
			totalNotifications,
			current_page: Number(currentPage),
			last_page,
			data: notificationsRefactored
		}

		return notificationsData
	}

}
