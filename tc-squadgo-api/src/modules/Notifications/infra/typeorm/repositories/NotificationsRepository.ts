import { Repository } from 'typeorm'
import ICreateNotificationDTO from 'modules/Notifications/dtos/ICreateNotificationDTO'
import INotificationsRepository from '../../../repositories/INotificationsRepository'
import Notification from '../entities/Notification'
import IFilterNotificationsDTO from '../../../dtos/IFilterNotificationsDTO'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class NotificationsRepository implements INotificationsRepository {
	private ormRepository: Repository<Notification>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Notification)
	}

	async findById(notification_id: number): Promise<Notification | null> {
		return await this.ormRepository.findOneBy({ id: notification_id })
	}

	async filterByResourceId(data: IFilterNotificationsDTO): Promise<any> {
		const { resource_id, currentPage, qtdPerPage } = data

		const dataFilter = this.ormRepository.createQueryBuilder('notify')
			.select([
				'notify.id',
				'notify.description',
				'notify.readed',
				'notify.type',
				'notify.object_id',
				'notify.created_at',
				'notify.updated_at',
			]).where({ resource_id })

		dataFilter.orderBy('notify.id', 'DESC')

		const totalNotifications = await dataFilter.getCount()
		const notifications = await dataFilter.take(qtdPerPage).skip(currentPage).getMany()

		return { totalNotifications, notifications }
	}

	async listByResourceId(resource_id: number): Promise<Notification[]> {
		return await this.ormRepository.find({ where: { resource_id } })
	}

	async saveAll(notifications: Notification[]): Promise<void> {
		await this.ormRepository.save(notifications)
	}

	async create(data: ICreateNotificationDTO): Promise<Notification> {
		const notificationCreated = this.ormRepository.create(data)

		return await this.ormRepository.save(notificationCreated)
	}

	async save(notification: Notification): Promise<Notification> {
		return await this.ormRepository.save(notification)
	}

}
