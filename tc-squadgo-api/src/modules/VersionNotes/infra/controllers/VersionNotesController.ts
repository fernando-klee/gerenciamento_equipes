import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateVersionNoteService from '../../services/UpdateVersionNoteService'
import CreateVersionNoteService from '../../services/CreateVersionNoteService'
import FilterVersionNoteService from '../../services/FilterVersionNoteService'

export default class VersionNotesController {
	async create(req: Request, rep: Response) {
		const { title, link, number } = req.body

		const service = container.resolve(CreateVersionNoteService)
		const versionNote = await service.execute({ title, link, number })

		rep.status(201).send(versionNote)
	}

	async update(req: Request, rep: Response) {
		const { version_id } = req.params
		const { title, link, number } = req.body

		const service = container.resolve(UpdateVersionNoteService)
		const versionNoteUpdated = await service.execute({ version_id: Number(version_id), title, link, number })

		rep.status(201).send(versionNoteUpdated)
	}

	async filter(req: Request, rep: Response) {
		const { currentPage } = req.query

		const service = container.resolve(FilterVersionNoteService)
		const versionNote = await service.execute(Number(currentPage))

		rep.status(201).send(versionNote)
	}
}
