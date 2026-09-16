import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UploadCustomerImageService from '../../services/UploadCustomerImageService'
import CreateCustomerService from '../../services/CreateCustomerService'
import UpdateCustomerService from '../../services/UpdateCustomerService'
import { StatusProps } from '../typeorm/entities/Customer'
import ListCustomerService from '../../services/ListCustomerService'
import ListCustomerWithResourcesService from '../../services/ListCustomerWithResourcesService'
import ListCustomerProjectsInProgress from '../../services/ListCustomerProjectsInProgress'
import DeleteCustomerService from '../../services/DeleteCustomerService'

interface ICreateBodyProps {
	name: string
	hired_hours: number
	status: StatusProps
	resource_profile: string
	start_contract_time: Date
	end_contract_time: Date
	responsible_name: string
	responsible_email: string
	responsible_phone: string
	objective: string
}

interface IUpdateBodyProps {
	name: string
	hired_hours: number
	status: StatusProps
	resource_profile: string
	start_contract_time: Date
	end_contract_time: Date
	responsible_name: string
	responsible_email: string
	responsible_phone: string
	objective: string
}

export default class CustomersController {

	async index(req: Request, res: Response): Promise<void> {
		const { name, status, currentPage, qtdPerPage, orderField, order } = req.query as any
		const service = container.resolve(ListCustomerService)

		const customersFilter = await service.execute({ name, status, currentPage, qtdPerPage, orderField, order })

		res.status(201).json(customersFilter)
	}

	async create(req: Request, res: Response): Promise<void> {
		let filename
		if (req.file && req.file.filename) {
			filename = req.file.filename as any
		}

		const { user_id } = req
		const {
			name,
			hired_hours,
			status,
			resource_profile,
			start_contract_time,
			end_contract_time,
			responsible_name,
			responsible_email,
			responsible_phone,
			objective } = req.body as ICreateBodyProps

		const service = container.resolve(CreateCustomerService)

		const customer = await service.execute({
			user_id,
			name,
			hired_hours,
			status,
			filename,
			resource_profile,
			start_contract_time: new Date(start_contract_time),
			end_contract_time: new Date(end_contract_time),
			responsible_name,
			responsible_email,
			responsible_phone,
			objective
		})

		res.status(201).json(customer)
	}

	async update(req: Request, res: Response): Promise<void> {
		const { user_id } = req
		const customer_id = Number(req.params.customer_id)
		const {
			name,
			hired_hours,
			status,
			resource_profile,
			start_contract_time,
			end_contract_time,
			responsible_name,
			responsible_email,
			responsible_phone,
			objective } = req.body as IUpdateBodyProps

		const service = container.resolve(UpdateCustomerService)

		const customer = await service.execute({
			user_id,
			customer_id,
			name,
			hired_hours,
			status,
			resource_profile,
			start_contract_time,
			end_contract_time,
			responsible_name,
			responsible_email,
			responsible_phone,
			objective
		})

		res.status(201).json(customer)
	}

	async delete(req: Request, res: Response): Promise<void> {
		const customer_id = Number(req.params.customer_id)
		const service = container.resolve(DeleteCustomerService)

		await service.execute(customer_id)

		res.status(202).json()
	}

	async addImage(req: Request, res: Response): Promise<void> {
		const customer_id = Number(req.params.customer_id)
		const { filename } = req.file as any

		const service = container.resolve(UploadCustomerImageService)

		const customer = await service.execute({ customer_id, filename })

		res.status(201).json(customer)
	}

	async indexWithResources(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListCustomerWithResourcesService)

		const customersFilter = await service.execute()

		res.status(201).json(customersFilter)
	}

	async listCustomerProjects(req: Request, res: Response): Promise<void> {
		const { customer_id } = req.params
		const service = container.resolve(ListCustomerProjectsInProgress)

		const projects = await service.execute(Number(customer_id))

		res.status(201).json(projects)
	}

}
