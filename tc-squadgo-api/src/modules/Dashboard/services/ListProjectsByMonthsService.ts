import { inject, injectable } from 'tsyringe'
import { ptBR } from 'date-fns/locale'
import { eachMonthOfInterval, getMonth, format, lastDayOfMonth, startOfMonth, setHours } from 'date-fns'

import IProjectsRepository from '../../Projects/repositories/IProjectsRepository'
import IFilterProjectsByMonthProps from '../../Projects/dtos/IFilterProjectsByMonthsDTO'

@injectable()
export default class ListProjectsByMonthsService {
	constructor(
		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository
	) { }

	async execute(data: IFilterProjectsByMonthProps): Promise<any[]> {
		const { start, end, showFinished } = data

		const startDate = setHours(startOfMonth(start), 3)
		const endDate = setHours(lastDayOfMonth(end),3)

		const projects = await this.projectsRepository.listByMonths(
			{ start: startDate, end: endDate, showFinished }
		)

		const projectsByMonths = eachMonthOfInterval({
			start,
			end
		}).map((m: any) => {
			const mPlusOne = getMonth(m)
			let numberOfProjects = 0
			projects.map(p => {
				const startEstimatePlusOne = getMonth(p.start_estimate)
				if (mPlusOne === startEstimatePlusOne) numberOfProjects++
			})

			const monthFormatted = format(m, 'LLLL', { locale: ptBR })
			const month = monthFormatted.charAt(0).toUpperCase() + monthFormatted.slice(1, monthFormatted.length)

			return { month, numberOfProjects }
		})

		return projectsByMonths
	}
}
