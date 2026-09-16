import { Router } from 'express'
import ServiceTempController from '../controllers/ServiceTempController'

const tempRoutes = Router()
const serviceTempController = new ServiceTempController()

tempRoutes.get('/', serviceTempController.execute)

export default tempRoutes
