import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import ScheduleObservationController from '../controllers/ScheduleObservationController'

const scheduleObservationRoutes = Router()
const scheduleObservationController = new ScheduleObservationController()

scheduleObservationRoutes.use(ensureAuthenticated)
scheduleObservationRoutes.post('/', scheduleObservationController.create)
scheduleObservationRoutes.delete('/', scheduleObservationController.delete)
scheduleObservationRoutes.get('/', scheduleObservationController.list)

export default scheduleObservationRoutes
