import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateResourceServiceByClientCredentials from '../../../ClientCredentials/services/CreateResourceServiceByClientCredentials'

export default class ClientCredentialControllers {
	async create(req: Request, res: Response): Promise<void> {
		const { client_name } = req
		const
			{ name,
				email,
				status,
				hours_amount,
				leader,
				classification_id,
				types_ids,
				admission_date,
				vacation_date } = req.body

		const service = container.resolve(CreateResourceServiceByClientCredentials)
		const resourceCreated = await service.execute({
			client_name,
			name,
			email,
			status,
			leader,
			hours_amount,
			classification_id,
			types_ids,
			admission_date: new Date(admission_date),
			vacation_date: vacation_date ? new Date(vacation_date) : null
		})

		res.status(201).json(resourceCreated)
	}
}
