import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import ResourceRoomWeekdayController from '../controllers/ResourceRoomWeekdayController'

const resourceRoomToDayOfWeekRoutes = Router()
const resourceRoomWeekdayController = new ResourceRoomWeekdayController()

resourceRoomToDayOfWeekRoutes.use(ensureAuthenticated)
resourceRoomToDayOfWeekRoutes.post('/', resourceRoomWeekdayController.create)
resourceRoomToDayOfWeekRoutes.post('/schedule', resourceRoomWeekdayController.createSchedule)
resourceRoomToDayOfWeekRoutes.delete('/', resourceRoomWeekdayController.deleteById)
resourceRoomToDayOfWeekRoutes.get('/', resourceRoomWeekdayController.list)
resourceRoomToDayOfWeekRoutes.put('/update', resourceRoomWeekdayController.update)
resourceRoomToDayOfWeekRoutes.delete('/deleteAll', resourceRoomWeekdayController.deleteAll)
resourceRoomToDayOfWeekRoutes.post('/mail', resourceRoomWeekdayController.sendMail)


export default resourceRoomToDayOfWeekRoutes
