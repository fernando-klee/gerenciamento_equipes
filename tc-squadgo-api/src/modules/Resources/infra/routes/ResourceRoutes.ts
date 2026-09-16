import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../../config/uploadConfig'
import hasPermission from '../../../../shared/infra/express/middlewares/hasPermission'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import ResourcesControllers from '../controllers/ResourcesControllers'
import ResourcesHistoricController from '../controllers/ResourcesHistoricController'
import ResourcesProjectHistoricController from '../controllers/ResourcesProjectHistoricController'

const resourceRoutes = Router()
const upload = multer(uploadConfig.multer)
const resourceControllers = new ResourcesControllers()
const resourcesHistoricController = new ResourcesHistoricController()
const resourcesProjectHistoricController = new ResourcesProjectHistoricController()

resourceRoutes.use(ensureAuthenticated)
resourceRoutes.get('/', resourceControllers.index)
resourceRoutes.get('/responsibles', resourceControllers.indexResponsibles)
resourceRoutes.post('/', hasPermission(['create_resource']), resourceControllers.create)
resourceRoutes.get('/actives', resourceControllers.indexActives)
resourceRoutes.get('/organogram', resourceControllers.listOrganogramData)
// resourceRoutes.get('/leader-project-resources', resourceControllers.listLeaderProjectResource)
resourceRoutes.get('/leader-project-resources/:leader_id', resourceControllers.listLeaderProjectResource)

resourceRoutes.get('/:resource_id', resourceControllers.find)
resourceRoutes.get('/:resource_id/simple-profile', resourceControllers.showSimpleProfile)
resourceRoutes.get('/:resource_id/projects', resourceControllers.listProjectsResource)
resourceRoutes.get('/:resource_id/available-hours', resourceControllers.availableHours)
resourceRoutes.get('/:resource_id/projects-status', resourceControllers.getResourceProjectsStatus)

resourceRoutes.get('/:resource_id/skills', resourceControllers.listResourceSkills)
resourceRoutes.put('/:resource_id/skills', hasPermission(['update_resource']), resourceControllers.updateResourceSkills)

resourceRoutes.get('/:resource_id/schedules', resourceControllers.listResourceSchedules)

resourceRoutes.put('/:resource_id', hasPermission(['update_resource']), resourceControllers.update)
resourceRoutes.put('/:resource_id/output-estimate', hasPermission(['update_resource']), resourceControllers.updateOutputEstimate)
resourceRoutes.patch('/:resource_id', hasPermission(['update_resource']), upload.single('photo'), resourceControllers.addPhoto)

resourceRoutes.get('/:resource_id/historic', resourcesHistoricController.index)
resourceRoutes.get('/:resource_id/projects-historic', resourcesProjectHistoricController.index)
resourceRoutes.get('/output-estimate/list-all', resourceControllers.indexOutputEstimate)

export default resourceRoutes
