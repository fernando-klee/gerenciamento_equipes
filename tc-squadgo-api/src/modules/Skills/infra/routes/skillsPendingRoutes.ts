import { Router } from 'express'
import hasPermission from '../../../../shared/infra/express/middlewares/hasPermission'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import SkillsPendingController from '../controllers/SkillsPendingController'

const skillsPendingRoutes = Router()
const skillsPendingController = new SkillsPendingController()

skillsPendingRoutes.use(ensureAuthenticated)
skillsPendingRoutes.post('/', skillsPendingController.create)

export default skillsPendingRoutes
