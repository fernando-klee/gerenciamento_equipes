import { Router } from 'express'
import hasPermission from '../../../../shared/infra/express/middlewares/hasPermission'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import VersionNotesController from '../controllers/VersionNotesController'

const versionNotesRoutes = Router()
const versionNotesController = new VersionNotesController()

versionNotesRoutes.use(ensureAuthenticated)
versionNotesRoutes.get('/', hasPermission(['view_version_note']), versionNotesController.filter)
versionNotesRoutes.post('/', hasPermission(['create_version_note']), versionNotesController.create)
versionNotesRoutes.put('/:version_id', hasPermission(['update_version_note']), versionNotesController.update)

export default versionNotesRoutes
