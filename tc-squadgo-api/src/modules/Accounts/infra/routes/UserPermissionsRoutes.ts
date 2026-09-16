import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import UsersPermissionsController from '../controllers/UsersPermissionsController'

const userPermissionsRoutes = Router()
const usersPermissionsController = new UsersPermissionsController()

userPermissionsRoutes.use(ensureAuthenticated)
userPermissionsRoutes.get('/', usersPermissionsController.index)

export default userPermissionsRoutes
