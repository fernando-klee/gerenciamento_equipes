import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import WorkScheduleDraftController from '../controllers/WorkScheduleDraftController'

const workScheduleDraftRoutes = Router()
const workScheduleDraftController = new WorkScheduleDraftController()

workScheduleDraftRoutes.use(ensureAuthenticated)
// workScheduleDraftRoutes.get('/', workScheduleDraftController.list)
// workScheduleDraftRoutes.get('/:id', workScheduleDraftController.findById)
// workScheduleDraftRoutes.get('/resource/:resource_id/room/:room_id/day/:weekday_id', workScheduleDraftController.findByResourceAndRoomAndDay)

export default workScheduleDraftRoutes
