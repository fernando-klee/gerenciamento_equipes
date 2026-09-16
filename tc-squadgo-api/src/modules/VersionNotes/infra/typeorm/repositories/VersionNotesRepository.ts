import { Repository } from 'typeorm'

import VersionNotes from '../entities/VersionNotes'
import ICreateVersionNotesDTO from '../../../dtos/ICreateVersionNotesDTO'
import IVersionNotesRepository from '../../../repositories/IVersionNotesRepository'
import IFilterVersionNotesDTO from '../../../dtos/IFilterVersionNotesDTO'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class VersionNotesRepository implements IVersionNotesRepository {
	private ormRepository: Repository<VersionNotes>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(VersionNotes)
	}

	async findById(version_id: number): Promise<VersionNotes | null> {
		return await this.ormRepository.findOne({ where: { id: version_id } })
	}

	async save(versionNote: VersionNotes): Promise<VersionNotes> {
		return await this.ormRepository.save(versionNote)
	}

	async filter(data: IFilterVersionNotesDTO): Promise<any> {
		const { qtdPerPage, currentPage } = data
		const dataFilter = this.ormRepository.createQueryBuilder('vn')
			.select([
				'vn.id',
				'vn.title',
				'vn.link',
				'vn.number'
			])

		dataFilter.orderBy('vn.id', 'DESC')

		const totalVersionNotes = await dataFilter.getCount()
		const versionNotes = await dataFilter.take(qtdPerPage).skip(currentPage).getMany()

		return { totalVersionNotes, versionNotes }
	}
}
