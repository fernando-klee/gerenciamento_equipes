import { Router } from 'express'
import hasPermission from '../../../../shared/infra/express/middlewares/hasPermission'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import SkillsController from '../controllers/SkillsController'

const skillRoutes = Router()
const skillController = new SkillsController()

skillRoutes.use(ensureAuthenticated)
skillRoutes.get('/', skillController.list)
skillRoutes.get('/listDepartments', skillController.listDepartments)
skillRoutes.get('/findSkillDepartmentBySkill/:skill_id', skillController.findSkillDepartmentById)
skillRoutes.post('/', hasPermission(['create_skill']), skillController.create)
skillRoutes.post('/skillDepartment', hasPermission(['create_skill']), skillController.createSkillDepartment)
skillRoutes.put('/:skill_id', hasPermission(['update_skill']), skillController.update)
skillRoutes.put('/skillDepartment/:skillDepartment_id', hasPermission(['update_skill']), skillController.updateSkillDepartment)
skillRoutes.delete('/:skill_id', hasPermission(['delete_skill']), skillController.delete)
skillRoutes.delete('/skillDepartment/:skillDepartment_id', hasPermission(['delete_skill']), skillController.deleteSkillDepartment)

export default skillRoutes
