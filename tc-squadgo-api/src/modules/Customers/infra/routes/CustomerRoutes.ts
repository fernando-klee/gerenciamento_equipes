import multer from 'multer'
import { Router } from 'express'
import uploadConfig from '../../../../config/uploadConfig'
import hasPermission from '../../../../shared/infra/express/middlewares/hasPermission'
import ensureAuthenticated from '../../../../shared/infra/express/middlewares/isAuthenticated'
import CustomersController from '../controllers/CustomersController'

const customerRoutes = Router()
const upload = multer(uploadConfig.multer)
const customersController = new CustomersController()

customerRoutes.use(ensureAuthenticated)

customerRoutes.get('/', customersController.index)
customerRoutes.get('/with-resources', customersController.indexWithResources)
customerRoutes.get('/:customer_id/projects-in-progress', customersController.listCustomerProjects)

customerRoutes.post('/', hasPermission(['create_customer']), upload.single('image'), customersController.create)
customerRoutes.put('/:customer_id', hasPermission(['update_customer']), customersController.update)
customerRoutes.delete('/:customer_id', hasPermission(['delete_customer']), customersController.delete)
customerRoutes.patch('/:customer_id', hasPermission(['update_customer']), upload.single('image'), customersController.addImage)

export default customerRoutes
