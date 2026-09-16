import { inject, injectable } from 'tsyringe'
import ICreateNotificationService from '../../Notifications/interfaces/ICreateNotificationService'
import ICreateVersionNotesDTO from '../dtos/ICreateVersionNotesDTO'
import VersionNotes from '../infra/typeorm/entities/VersionNotes'
import IVersionNotesRepository from '../repositories/IVersionNotesRepository'

@injectable()
export default class CreateVersionNoteService {
	constructor(
		@inject('VersionNotesRepository')
		private versionNotesRepository: IVersionNotesRepository,

		@inject('CreateNotificationService')
		private createNotificationService: ICreateNotificationService,
	) { }

	async execute(data: ICreateVersionNotesDTO): Promise<VersionNotes> {
		const newVersion = new VersionNotes()
		Object.assign(newVersion, data)

		const versionNoteCreated = await this.versionNotesRepository.save(newVersion)
		await this.createNotificationService.execute({
			description: `A versão "${data.number}" do sistema está disponível. Confira as novidades na aba "Notas da versão".`,
			object_type: 'notify_new_version_note',
			type: 'VERSION_NOTES',
			object_id: undefined
		})
		return versionNoteCreated
	}
}
