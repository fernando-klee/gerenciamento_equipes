import { Router } from 'express'
import isClientCredential from '../../../../shared/infra/express/middlewares/isClientCredential'
import ClientCredentialControllers from '../controllers/ClientCredentialControllers'

const clientCredentialRoutes = Router()

const clientCredentialControllers = new ClientCredentialControllers()

clientCredentialRoutes.post('/client-credentials/resource', isClientCredential, clientCredentialControllers.create)

export default clientCredentialRoutes
