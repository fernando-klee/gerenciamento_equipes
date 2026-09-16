import { inject, injectable } from 'tsyringe'
import IVersionNotesRepository from '../repositories/IVersionNotesRepository'

@injectable()
export default class FilterVersionNoteService {
	constructor(
		@inject('VersionNotesRepository')
		private versionNotesRepository: IVersionNotesRepository
	) { }

	async execute(currentPage: number): Promise<any> {
		const qtdPerPage = 10

		const skipByPage = (qtdPerPage * currentPage) - qtdPerPage

		const { totalVersionNotes, versionNotes } =
			await this.versionNotesRepository.filter({ currentPage: Number(skipByPage), qtdPerPage })

		let last_page = Math.ceil(totalVersionNotes / qtdPerPage)

		if (last_page === 0) last_page = 1

		const versionNotesData = {
			totalVersionNotes,
			current_page: Number(currentPage),
			last_page,
			data: versionNotes
		}

		return versionNotesData
	}
}
