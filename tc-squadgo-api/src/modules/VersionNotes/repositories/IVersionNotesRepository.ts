import VersionNotes from '../infra/typeorm/entities/VersionNotes'
import ICreateVersionNotesDTO from '../dtos/ICreateVersionNotesDTO'
import IFilterVersionNotesDTO from '../dtos/IFilterVersionNotesDTO'

export default interface IVersionNotesRepository {
	findById(version_id: number): Promise<VersionNotes | null>
	save(versionNote: VersionNotes): Promise<VersionNotes>
	filter(data: IFilterVersionNotesDTO): Promise<any>
}
