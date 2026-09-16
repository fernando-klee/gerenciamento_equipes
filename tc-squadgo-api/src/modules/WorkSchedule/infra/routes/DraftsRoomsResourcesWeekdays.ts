import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import DraftsRoomsResourcesWeekdaysController from '../controllers/DraftsRoomsResourcesWeekdaysController'

const draftResourceRoomToDayOfWeekRoutes = Router()
const draftsRoomsResourcesWeekdaysController = new DraftsRoomsResourcesWeekdaysController()

draftResourceRoomToDayOfWeekRoutes.use(ensureAuthenticated)
draftResourceRoomToDayOfWeekRoutes.post('/', draftsRoomsResourcesWeekdaysController.create)
draftResourceRoomToDayOfWeekRoutes.delete('/', draftsRoomsResourcesWeekdaysController.delete)
draftResourceRoomToDayOfWeekRoutes.get('/', draftsRoomsResourcesWeekdaysController.list)
draftResourceRoomToDayOfWeekRoutes.put('/update', draftsRoomsResourcesWeekdaysController.update)

export default draftResourceRoomToDayOfWeekRoutes
