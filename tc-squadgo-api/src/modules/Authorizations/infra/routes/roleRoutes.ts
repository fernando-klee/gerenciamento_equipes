import { Router } from 'express'
import hasPermission from '../../../../shared/infra/express/middlewares/hasPermission'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import RolesController from '../controllers/RolesController'

const roleRoutes = Router()
const rolesController = new RolesController()

roleRoutes.use(ensureAuthenticated)
roleRoutes.get('/', rolesController.index)
roleRoutes.post('/', hasPermission(['create_role']), rolesController.create)
roleRoutes.get('/:role_id', rolesController.findById)
roleRoutes.put('/:role_id', hasPermission(['update_role']), rolesController.update)
roleRoutes.delete('/:role_id', hasPermission(['delete_role']), rolesController.delete)

export default roleRoutes
