import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import TypesController from '../controllers/TypesController'

const typesRoutes = Router()
const typesController = new TypesController()

typesRoutes.use(ensureAuthenticated)
typesRoutes.get('/', typesController.index)

export default typesRoutes
