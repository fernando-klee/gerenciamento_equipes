import { container } from 'tsyringe'
import { Request, Response } from 'express'
import CreateOneOnOneService from '../../services/CreateOneOnOneService'
import ListOneOnOneService from '../../services/ListOneOnOneService'
import DeleteOneOnOneService from '../../services/DeleteOneOnOneService'
import UpdateOneOnOneService from '../../services/UpdateOneOnOneService'
import { OneOnOneType } from '../../infra/typeorm/entities/OneOnOne'

interface ICreateBodyProps {
    description: string;
    type: OneOnOneType;
    leaderId: number;
    resourceId: number;
}

interface IUpdateBodyProps {
    description: string;
}

export default class OneOnOneController {
    async create(req: Request, res: Response): Promise<void> {
        const data = req.body as ICreateBodyProps
        const service = container.resolve(CreateOneOnOneService)
        const oneOnOneCreated = await service.execute(data)

        res.status(201).json(oneOnOneCreated)
    }

    async list(req: Request, res: Response): Promise<void> {
        const { resourceId } = req.query
        
        if (!resourceId) {
            res.status(400).json({
                status: 'error',
                message: 'Resource ID is required'
            })
            return
        }

        const service = container.resolve(ListOneOnOneService)
        const oneOnOnes = await service.execute({
            resourceId: Number(resourceId)
        })

        res.status(200).json(oneOnOnes)
    }

    async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        if (!id) {
            res.status(400).json({
                status: 'error',
                message: 'One-on-one ID is required'
            })
            return
        }

        const service = container.resolve(DeleteOneOnOneService)
        await service.execute({ id: Number(id) })

        res.status(204).send()
    }

    async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const { description } = req.body as IUpdateBodyProps

        if (!id) {
            res.status(400).json({
                status: 'error',
                message: 'One-on-one ID is required'
            })
            return
        }

        if (!description) {
            res.status(400).json({
                status: 'error',
                message: 'Description is required'
            })
            return
        }

        const service = container.resolve(UpdateOneOnOneService)
        await service.execute({ id: Number(id), description })

        res.status(204).send()
    }
}
