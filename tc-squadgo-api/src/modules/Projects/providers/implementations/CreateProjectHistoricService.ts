import { inject, injectable } from 'tsyringe'

import IProjectsHistoricRepository from '../../repositories/IProjectsHistoricRepository'
import ProjectHistoric from '../../infra/typeorm/entities/ProjectHistoric'
import ICreateProjectHistoricService from '../interfaces/ICreateProjectHistoricService'
import ICreateProjectHistoricDTO from '../../dtos/ICreateProjectHistoricDTO'

@injectable()
export default class CreateProjectHistoricService implements ICreateProjectHistoricService {
	constructor(
		@inject('ProjectsHistoricRepository')
		private projectsHistoricRepository: IProjectsHistoricRepository
	) { }

	async execute(data: ICreateProjectHistoricDTO): Promise<ProjectHistoric> {
		return await this.projectsHistoricRepository.create(data)
	}
}
