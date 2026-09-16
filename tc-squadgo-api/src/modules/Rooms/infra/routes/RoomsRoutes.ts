import { Router } from 'express'
import hasPermission from '../../../../shared/infra/express/middlewares/hasPermission'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import RoomsController from '../controllers/RoomsController'

const roomsRoutes = Router()
const roomsController = new RoomsController()

roomsRoutes.use(ensureAuthenticated)
roomsRoutes.post('/', roomsController.create)
roomsRoutes.put('/', roomsController.update)
roomsRoutes.delete('/', roomsController.delete)
roomsRoutes.get('/', roomsController.list)

export default roomsRoutes
