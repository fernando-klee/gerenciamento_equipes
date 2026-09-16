import { Request, Response } from 'express'
import { container } from 'tsyringe'
import DeleteSkillService from '../../services/DeleteSkillService'
import CreateSkillService from '../../services/CreateSkillService'
import UpdateSkillService from '../../services/UpdateSkillService'
import ListSkillsService from '../../services/ListSkillsService'
import ListDepartmentsService from '../../services/ListDepartmentsService'
import AttachSkillSectorService from '../../../Skills/services/AttachSkillSectorService'
import DeleteSkillSectorService from '../../../Skills/services/DeleteSkillSectorService'
import UpdateSkillDepartmentService from '../../../Skills/services/UpdateSkillDepartmentService'
import FindSkillDepartmentBySkillIdService from '../../../Skills/services/FindSkillDepartmentBySkillIdService'

export default class SkillsController {
	async create(req: Request, res: Response): Promise<void> {
		const { description, type } = req.body
		const service = container.resolve(CreateSkillService)

		const skillCreated = await service.execute(description, type)

		res.status(201).json(skillCreated)
	}

	async createSkillDepartment(req: Request, res: Response): Promise<void> {
		const { skill_id, setor_id } = req.body
		const service = container.resolve(AttachSkillSectorService)

		const skillSetorCreated = await service.execute(skill_id, setor_id)

		res.status(201).json(skillSetorCreated)
	}

	async update(req: Request, res: Response): Promise<void> {
		const { skill_id } = req.params
		const { description, type } = req.body
		const service = container.resolve(UpdateSkillService)

		const skillUpdated = await service.execute({ skill_id: Number(skill_id), description, type })

		res.status(201).json(skillUpdated)
	}

	async updateSkillDepartment(req: Request, res: Response): Promise<void> {
		const { skillDepartment_id } = req.params
		const { skill_id, department_id } = req.body
		const service = container.resolve(UpdateSkillDepartmentService)

		const skillUpdated = await service.execute({skillDepartment_id: Number(skillDepartment_id), skill_id, department_id })

		res.status(201).json(skillUpdated)
	}

	async list(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListSkillsService)

		const skills = await service.execute()

		res.status(201).json(skills)
	}

	async listDepartments(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListDepartmentsService)

		const departments = await service.execute()

		res.status(201).json(departments)
	}


	async delete(req: Request, res: Response): Promise<void> {
		const { skill_id } = req.params
		const service = container.resolve(DeleteSkillService)

		await service.execute(Number(skill_id))

		res.status(201).json()
	}

	async deleteSkillDepartment(req: Request, res: Response): Promise<void> {
		const { skillSector_id } = req.params
		const service = container.resolve(DeleteSkillSectorService)

		await service.execute(Number(skillSector_id))

		res.status(201).json()
	}

	async findSkillDepartmentById(req: Request, res: Response): Promise<void> {
		const { skill_id } = req.params
		const service = container.resolve(FindSkillDepartmentBySkillIdService)

		const retornar = await service.execute(Number(skill_id))

		res.status(201).json(retornar)
	}
}
