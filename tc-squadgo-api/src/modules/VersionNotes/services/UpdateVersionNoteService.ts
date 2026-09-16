import { inject, injectable } from 'tsyringe'

import VersionNoteNotFoundException from '../../../shared/infra/exceptions/VersionNoteNotFoundException'
import VersionNotes from '../infra/typeorm/entities/VersionNotes'
import IVersionNotesRepository from '../repositories/IVersionNotesRepository'

interface IRequest {
	version_id: number
	title: string
	link: string
	number: string
}

@injectable()
export default class UpdateVersionNoteService {
	constructor(
		@inject('VersionNotesRepository')
		private versionNotesRepository: IVersionNotesRepository
	) { }

	async execute(data: IRequest): Promise<VersionNotes> {
		const versionNoteExists = await this.versionNotesRepository.findById(data.version_id)
		if (!versionNoteExists) throw new VersionNoteNotFoundException()

		Object.assign(versionNoteExists, data)
		await this.versionNotesRepository.save(versionNoteExists)

		return versionNoteExists
	}
}
