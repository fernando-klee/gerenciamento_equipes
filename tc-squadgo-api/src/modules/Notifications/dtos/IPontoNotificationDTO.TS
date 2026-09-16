import { NotificationTypeProps } from '../infra/typeorm/entities/Notification'

export default interface IPontoNotificationDTO {
	description: string
	object_type: 'notify_new_customer' | 'notify_new_resource' | 'notify_new_project' | 'notify_new_version_note'| 'notify_ponto_warning',
	type: NotificationTypeProps
	object_id: number | undefined
}
