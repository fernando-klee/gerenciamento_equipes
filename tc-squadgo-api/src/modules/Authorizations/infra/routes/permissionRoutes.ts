import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import PermissionsController from '../controllers/PermissionsController'

const permissionRoutes = Router()
const permissionsController = new PermissionsController()

permissionRoutes.use(ensureAuthenticated)
permissionRoutes.get('/', permissionsController.index)

export default permissionRoutes
