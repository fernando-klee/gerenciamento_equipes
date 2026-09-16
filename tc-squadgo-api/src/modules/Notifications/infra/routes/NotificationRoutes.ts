import { Router } from 'express'
import isClientCredential from '../../../../shared/infra/express/middlewares/isClientCredential'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import NotificationsController from '../controllers/NotificationsController'

const notificationRoutes = Router()
const notificationController = new NotificationsController()

notificationRoutes.use(ensureAuthenticated)
notificationRoutes.get('/', notificationController.list)
notificationRoutes.post('/read-all', notificationController.readAllNotification)
notificationRoutes.patch('/:notification_id', notificationController.readNotification)
notificationRoutes.post('/ponto', isClientCredential , notificationController.notificationPonto)
notificationRoutes.post('/scheduleNotification', notificationController.notificationSchedule)

export default notificationRoutes
