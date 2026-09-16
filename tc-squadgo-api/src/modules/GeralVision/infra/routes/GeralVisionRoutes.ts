import { Router } from 'express'
import GeralVisionController from '../controllers/GeralVisionController'

const geralVisionRoutes = Router()
const geralVisionController = new GeralVisionController()

geralVisionRoutes.get('/planned-release', geralVisionController.plannedRelease)
geralVisionRoutes.get('/all-values', geralVisionController.allValues)

export default geralVisionRoutes
