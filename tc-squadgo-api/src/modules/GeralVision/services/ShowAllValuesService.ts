import { inject, injectable } from 'tsyringe'
import IGetAllResourcesHours from '../providers/interfaces/IGetAllResourcesHours'
import ITotalHoursToHappen from '../providers/interfaces/ITotalHoursToHappen'

interface TopDashProps {
	allResourcesHours: number
	totalHoursHappening: number
	totalHoursToHappen: number
	availableHours: number
	totalExcededHours: number
}

interface DisponibilityProps {
	allResourcesHours: number
	totalHoursHappeningWithoutExceeds: number
	totalHoursHappening: number
	totalHoursToHappen: number
	allHoursActivesProjects: number
}

@injectable()
export default class ShowAllValuesService {
	constructor(
		@inject('GetAllResourcesHours')
		private getAllResourcesHours: IGetAllResourcesHours,

		@inject('TotalHoursToHappen')
		private totalHoursToHappen: ITotalHoursToHappen
	) { }

	async execute(): Promise<any> {
		const [resourcesHoursStatus, totalHoursToHappen] = await Promise.all(
			[this.getAllResourcesHours.execute(), this.totalHoursToHappen.execute()]
		)

		const {
			allResourcesHours,
			totalHoursHappening,
			totalExcededHours,
			totalHoursHappeningWithoutExceeds,
			allHoursActivesProjects
		} = resourcesHoursStatus


		const disponibility = this.disponibility({
			allResourcesHours,
			totalHoursHappeningWithoutExceeds,
			totalHoursHappening,
			totalHoursToHappen,
			allHoursActivesProjects,
		})

		const topDash = this.topDash({
			allResourcesHours,
			totalHoursHappening,
			totalExcededHours,
			availableHours: disponibility.totalAvailableHours,
			totalHoursToHappen
		})

		const geralVision = {
			allResourcesHours,
			totalHoursHappening,
			totalExcededHours,
			totalHoursHappeningWithoutExceeds,
		}

		return { topDash, disponibility, geralVision }
	}

	topDash(data: TopDashProps): any {
		const {
			allResourcesHours,
			totalHoursHappening,
			totalExcededHours,
			availableHours,
			totalHoursToHappen
		} = data
		const resourcesAvailableValue = allResourcesHours - totalHoursHappening

		let resourcesAvailable = Math.floor(availableHours / 180)
		if (resourcesAvailable < 0) resourcesAvailable = 0

		const realNecessityValue = totalHoursHappening - allResourcesHours
		let anticipatedNeed = resourcesAvailableValue - realNecessityValue - totalHoursToHappen
		anticipatedNeed = Math.trunc(anticipatedNeed / 180)
		if (anticipatedNeed > 0) anticipatedNeed = 0

		let totalAvailableHours = allResourcesHours - totalHoursHappening
		if (totalAvailableHours < 0) totalAvailableHours = 0

		let totalAvailableMissingHours = Math.floor((totalAvailableHours - totalExcededHours) / 180)
		if (totalAvailableMissingHours < 0) totalAvailableMissingHours = 0

		let realNecessity = Math.floor(totalAvailableMissingHours / 180)
		if (realNecessity < 0) realNecessity = 0

		const topDash = {
			resourcesAvailable,
			realNecessity: Math.abs(realNecessity),
			plannedNecessity: Math.abs(anticipatedNeed)
		}

		return topDash
	}

	disponibility(data: DisponibilityProps): any {
		const {
			allResourcesHours,
			totalHoursHappeningWithoutExceeds,
			totalHoursHappening,
			totalHoursToHappen,
			allHoursActivesProjects,
		} = data
		let totalAvailableHoursWithoudExceeds = allResourcesHours - totalHoursHappeningWithoutExceeds
		if (totalAvailableHoursWithoudExceeds < 0) totalAvailableHoursWithoudExceeds = 0

		let totalMissingHours = totalHoursHappening - allResourcesHours
		let totalAvailableHours = allResourcesHours - totalHoursHappening
		if (totalAvailableHours < 0) totalAvailableHours = 0
		if (totalAvailableHours > 0) totalMissingHours = 0

		totalMissingHours = Math.abs(totalMissingHours)

		let totalAvailableMissingHoursX = allResourcesHours - allHoursActivesProjects
		if (totalAvailableMissingHoursX > 0) totalAvailableMissingHoursX = 0
		totalAvailableMissingHoursX = Math.abs(totalAvailableMissingHoursX)

		let totalDisponibilityHoursToHappen = totalAvailableHoursWithoudExceeds - totalMissingHours - totalHoursToHappen
		if (totalDisponibilityHoursToHappen < 0) totalDisponibilityHoursToHappen = 0

		const disponibilityService = {
			totalAvailableHours: totalAvailableHoursWithoudExceeds,
			totalMissingHours: totalAvailableMissingHoursX,
			totalDisponibilityHoursToHappen,
			allHoursActivesProjects
		}

		return disponibilityService
	}
}
