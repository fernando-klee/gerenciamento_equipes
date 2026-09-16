import { inject, injectable } from 'tsyringe'
import { addHours } from 'date-fns'

import IProjectsHistoricRepository from '../repositories/IProjectsHistoricRepository'

interface IRequest {
	currentPage: number
	project_id: number
}

@injectable()
export default class ListProjectHistoricService {
	constructor(
		@inject('ProjectsHistoricRepository')
		private projectsHistoricRepository: IProjectsHistoricRepository
	) { }

	async execute(data: IRequest): Promise<any> {
		const { currentPage, project_id } = data

		const qtdPerPage = 6
		const skipByPage = (qtdPerPage * currentPage) - qtdPerPage

		const { totalHistoric, historics } =
			await this.projectsHistoricRepository.listByProjectId({ project_id, currentPage: Number(skipByPage), qtdPerPage })

		let last_page = Math.ceil(totalHistoric / qtdPerPage)

		if (last_page === 0) last_page = 1

		let historicsWithCorrectDate = historics

		if (process.env.NODE_ENV === 'prod') {
			historicsWithCorrectDate = historicsWithCorrectDate.map((h: any) => {
				return { ...h, created_at: addHours(h.created_at, 3) }
			})
		}

		const notificationsData = {
			totalHistoric,
			current_page: Number(currentPage),
			last_page,
			data: historicsWithCorrectDate
		}

		return notificationsData
	}
}
