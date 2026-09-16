import { inject, injectable } from 'tsyringe'

import IGetAllResourcesHours from '../../GeralVision/providers/interfaces/IGetAllResourcesHours'

@injectable()
export default class ShowComparativeHoursService {
	constructor(
		@inject('GetAllResourcesHours')
		private getAllResourcesHours: IGetAllResourcesHours
	) { }

	async execute(): Promise<any> {
		const { allResourcesHours, totalHoursHappening, totalHoursHappeningWithoutExceeds } = await this.getAllResourcesHours.execute()

		let totalAvailableHours = allResourcesHours - totalHoursHappeningWithoutExceeds
		let totalMissingHours = 0
		if(totalAvailableHours < 0) {
			totalMissingHours = totalAvailableHours
			totalAvailableHours = 0
		}

		return { totalHoursHappening, totalAvailableHours, totalMissingHours: Math.abs(totalMissingHours) }
	}
}
