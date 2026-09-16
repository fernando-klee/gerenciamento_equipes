import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ReadNotificationService from '../../services/ReadNotificationService'
import ListNotificationsByUserService from '../../services/ListNotificationsByUserService'
import ReadAllNotificationsService from '../../services/ReadAllNotificationsService'
import CreateNotificationPontoService from '../../services/CreateNotificationPontoService'
import CreateNotificationScheduleService from '../../services/CreateNotificationScheduleService'

export default class NotificationsController {
	async list(req: Request, res: Response): Promise<void> {
		const { user_id } = req
		const { currentPage } = req.query
		const service = container.resolve(ListNotificationsByUserService)
		const notifications = await service.execute({ user_id, currentPage: Number(currentPage) })

		res.status(202).json(notifications)
	}

	async readNotification(req: Request, res: Response): Promise<void> {
		const { user_id } = req
		const { notification_id } = req.params
		const service = container.resolve(ReadNotificationService)
		const notification = await service.execute(user_id, Number(notification_id))

		res.status(202).json(notification)
	}

	async readAllNotification(req: Request, res: Response): Promise<void> {
		const { user_id } = req
		const service = container.resolve(ReadAllNotificationsService)
		await service.execute(user_id)

		res.status(202).json()
	}

	async notificationPonto(req: Request, res: Response): Promise<void> {
		const { description, userRegistry } = req.body
		const service = container.resolve(CreateNotificationPontoService)
		await service.execute({description, userRegistry})

		res.status(202).json()
	}

	async notificationSchedule(req: Request, res: Response): Promise<void> {
		const { description, userRegistry } = req.body
		const service = container.resolve(CreateNotificationScheduleService)
		await service.execute({description, userRegistry})

		res.status(202).json()
	}
}
