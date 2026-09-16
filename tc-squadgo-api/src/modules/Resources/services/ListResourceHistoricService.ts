import { inject, injectable } from 'tsyringe'

import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import IFilterResourceHistoricDTO from '../dtos/IFilterResourceHistoricDTO'
import IResourcesHistoricRepository from '../repositories/IResourcesHistoricRepository'
import IResourcesRepository from '../repositories/IResourcesRepository'

@injectable()
export default class ListResourceHistoricService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ResourcesHistoricRepository')
		private resourcesHistoricRepository: IResourcesHistoricRepository
	) { }

	async execute(data: IFilterResourceHistoricDTO): Promise<any> {
		const { resource_id, currentPage, qtdPerPage } = data

		const resourceExists = await this.resourcesRepository.findById(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException()

		const skipByPage = (qtdPerPage * currentPage) - qtdPerPage

		const { totalHistoric, historics } = await this.resourcesHistoricRepository.list(
			{ resource_id, currentPage: Number(skipByPage), qtdPerPage })

		let last_page = Math.ceil(totalHistoric / qtdPerPage)
		if (last_page === 0) last_page = 1

		const historicData = {
			totalHistoric,
			current_page: Number(currentPage),
			last_page,
			data: historics
		}

		return historicData
	}
}
