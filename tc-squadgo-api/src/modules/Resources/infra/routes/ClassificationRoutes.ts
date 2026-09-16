import { Router } from 'express'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import ClassificationsController from '../controllers/ClassificationsController'

const classificationRoutes = Router()
const classificationsController = new ClassificationsController()

classificationRoutes.use(ensureAuthenticated)
classificationRoutes.get('/', classificationsController.index)

export default classificationRoutes
