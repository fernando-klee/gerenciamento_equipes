import { Router } from 'express'
import DashboardController from '../controllers/DashboardController'

const dashboardRoutes = Router()
const dashboardController = new DashboardController()

dashboardRoutes.get('/customers', dashboardController.customers)
dashboardRoutes.get('/projects', dashboardController.projects)
dashboardRoutes.get('/compare-hours', dashboardController.compareHours)
dashboardRoutes.get('/projects-by-month', dashboardController.projectsByMonths)

export default dashboardRoutes
