import { Request, Response } from 'express'
import { container } from 'tsyringe'
import NewSkillPendingService from '../../services/NewSkillPendingService'

export default class SkillsPendingController {
    async create(req: Request, res: Response): Promise<void> {
        const { resource_indicate, leader_id, skill_id, status } = req.body
        const service = container.resolve(NewSkillPendingService)

        const skillPendingCreated = await service.execute(resource_indicate, leader_id, skill_id, status)

        res.status(201).json(skillPendingCreated)
    }
}
