import { Repository } from 'typeorm'
import ICreateProjectHistoricDTO from '../../../dtos/ICreateProjectHistoricDTO'
import IProjectsHistoricRepository from '../../../repositories/IProjectsHistoricRepository'
import ProjectHistoric from '../entities/ProjectHistoric'
import IFilterProjectsHistoricDTO from '../../../dtos/IFilterProjectsHistoricDTO'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class ProjectsHistoricRepository implements IProjectsHistoricRepository {
	private ormRepository: Repository<ProjectHistoric>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(ProjectHistoric)
	}

	async create(data: ICreateProjectHistoricDTO): Promise<ProjectHistoric> {
		const historic = this.ormRepository.create(data)

		return await this.ormRepository.save(historic)
	}

	async listByProjectId(data: IFilterProjectsHistoricDTO): Promise<any> {
		const { project_id, currentPage, qtdPerPage } = data

		const dataFilter = this.ormRepository.createQueryBuilder('historic')
			.select([
				'historic.id',
				'historic.description',
				'historic.type',
				'historic.created_at'
			])
			.where({ project_id })
			.orderBy('historic.id', 'DESC')

		const totalHistoric = await dataFilter.getCount()
		const historics = await dataFilter.take(qtdPerPage).skip(currentPage).getMany()

		return { totalHistoric, historics }
	}

}
