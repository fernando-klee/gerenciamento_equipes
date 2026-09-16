import { Router } from 'express'
import hasPermission from '../../../../shared/infra/express/middlewares/hasPermission'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import ProjectControllers from '../controllers/ProjectControllers'

const projectRouter = Router()
const projectController = new ProjectControllers()

projectRouter.use(ensureAuthenticated)
projectRouter.get('/', projectController.index)
projectRouter.post('/', hasPermission(['create_project']), projectController.create)
projectRouter.put('/:project_id', hasPermission(['update_project']), projectController.update)

projectRouter.get('/:project_id/resources', projectController.indexProjectResources)
projectRouter.patch('/:project_id/resources/:resource_id/hours', hasPermission(['update_project']), projectController.updateOrCreateResourceHours)
projectRouter.delete('/:project_id/resources/:resource_id', hasPermission(['update_project']), projectController.removeResourceFromProject)

projectRouter.get('/:project_id/historic', projectController.getHistoric)
projectRouter.patch('/:project_id/close', hasPermission(['update_project']), projectController.closeProejct)

export default projectRouter
