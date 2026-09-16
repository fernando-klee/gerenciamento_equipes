import { container } from 'tsyringe'
import { Request, Response } from 'express'
import CreateFeedbackService from '../../services/CreateFeedbackService'
import ListFeedbackByResourceId from '../../services/ListFeedbackByResourceId'

interface ICreateBodyProps {
	description: string
	resource_id: number
	reporter_id: number
	type: any
	project_id?: number
	customer_id?: number
}

export default class FeedbacksController {
	async create(req: Request, res: Response): Promise<void> {
		const data = req.body as ICreateBodyProps
		const service = container.resolve(CreateFeedbackService)
		const feedBackCreated = await service.execute(data)

		res.status(201).json(feedBackCreated)
	}

	async filter(req: Request, res: Response): Promise<void> {
		const { resource_id, type }: any = req.query
		const service = container.resolve(ListFeedbackByResourceId)
		const feedBackCreated = await service.execute(
			{ resource_id: Number(resource_id), type }
		)

		res.status(201).json(feedBackCreated)
	}
}
