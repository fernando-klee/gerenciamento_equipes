import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import hasPermission from '../../../../shared/infra/express/middlewares/hasPermission'
import UsersController from '../controllers/UsersController'

const userRoutes = Router()
const usersController = new UsersController()

userRoutes.use(ensureAuthenticated)
userRoutes.get('/', usersController.list)
userRoutes.put('/:user_id', hasPermission(['update_user']), usersController.update)

export default userRoutes
