import { NotificationTypeProps } from '../infra/typeorm/entities/Notification'

export default class ICreateNotificationDTO {
	description: string
	resource_id: number
	type: NotificationTypeProps
	object_id: number | undefined
}
