import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import UsersController from '../controllers/UsersController'

const meRoutes = Router()
const usersController = new UsersController()

meRoutes.use(ensureAuthenticated)

meRoutes.get('/', usersController.myProfile)
// meRoutes.put('/', usersController.updateMyProfile)

export default meRoutes
