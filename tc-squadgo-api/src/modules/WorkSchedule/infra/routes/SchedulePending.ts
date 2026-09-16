import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import SchedulePendingController from '../controllers/SchedulePendingController'

const schedulePendingRoutes = Router()
const schedulePendingController = new SchedulePendingController()

schedulePendingRoutes.use(ensureAuthenticated)
schedulePendingRoutes.post('/', schedulePendingController.create)
schedulePendingRoutes.delete('/', schedulePendingController.update)
schedulePendingRoutes.get('/', schedulePendingController.list)

export default schedulePendingRoutes
