import { Router } from 'express'
import OneOnOneController from '../controllers/OneOnOneController'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'

const oneOnOneRouter = Router()
const oneOnOneController = new OneOnOneController()

oneOnOneRouter.use(ensureAuthenticated)

oneOnOneRouter.post('/', oneOnOneController.create)
oneOnOneRouter.get('/', oneOnOneController.list)
oneOnOneRouter.delete('/:id', oneOnOneController.delete)
oneOnOneRouter.put('/:id', oneOnOneController.update)

export default oneOnOneRouter 