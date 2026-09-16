import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ShowComparativeHoursService from '../../services/ShowComparativeHoursService'
import ListCustomerWithResourcesService from '../../../Customers/services/ListCustomerWithResourcesService'
import ListProjectsWithTypeService from '../../services/ListProjectsWithTypeService'
import ListProjectsByMonthsService from '../../../Dashboard/services/ListProjectsByMonthsService'

export default class DashboardController {
	async customers(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListCustomerWithResourcesService)
		const customers = await service.execute()

		res.status(201).json(customers)
	}

	async projects(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListProjectsWithTypeService)
		const projects = await service.execute()

		res.status(201).json(projects)
	}

	async compareHours(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ShowComparativeHoursService)
		const hours = await service.execute()

		res.status(201).json(hours)
	}

	async projectsByMonths(req: Request, res: Response): Promise<void> {
		const { first_date, last_date, showFinished }: any = req.query

		const start = new Date(first_date)
		const end = new Date(last_date)
		const showFinishedProjects = showFinished === 'true' ? true : false
		const service = container.resolve(ListProjectsByMonthsService)

		const projects = await service.execute({ start, end, showFinished: showFinishedProjects })

		res.status(201).json(projects)
	}
}
