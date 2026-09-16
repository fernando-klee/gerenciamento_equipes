import { inject, injectable } from 'tsyringe'
import { isAfter } from 'date-fns'

import IProjectsRepository from '../../../Projects/repositories/IProjectsRepository'
import ITotalHoursToHappen from '../interfaces/ITotalHoursToHappen'

@injectable()
export default class TotalHoursToHappen implements ITotalHoursToHappen {
	constructor(
		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository
	) { }

	async execute(): Promise<number> {
		const futureHours = await this.projectsRepository.getTotalFutureHoursToStart()
		const { hours } = futureHours

		let hoursNumber = 0
		if (hours) hoursNumber = Number(hours)

		return hoursNumber
	}
}
