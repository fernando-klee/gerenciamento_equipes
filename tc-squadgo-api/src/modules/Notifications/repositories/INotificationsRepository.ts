import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO'
import IFilterNotificationsDTO from '../dtos/IFilterNotificationsDTO'
import Notification from '../infra/typeorm/entities/Notification'

export default interface INotificationsRepository {
	create(data: ICreateNotificationDTO): Promise<Notification>
	save(notification: Notification): Promise<Notification>
	findById(notification_id: number): Promise<Notification | null>
	filterByResourceId(data: IFilterNotificationsDTO): Promise<any>
	listByResourceId(resource_id: number): Promise<Notification[]>
	saveAll(notifications: Notification[]): Promise<void>
}
