import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import WorkScheduleController from '../controllers/WorkScheduleController'

const workScheduleRoutes = Router()
const workScheduleController = new WorkScheduleController()

workScheduleRoutes.use(ensureAuthenticated)
workScheduleRoutes.delete('/deleteAll', workScheduleController.deleteAll)

export default workScheduleRoutes
