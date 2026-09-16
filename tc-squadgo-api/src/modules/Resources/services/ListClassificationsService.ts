import { inject, injectable } from 'tsyringe'
import Classification from '../infra/typeorm/entities/Classification'
import IClassificationsRepository from '../repositories/IClassificationsRepository'

@injectable()
export default class ListClassificationsService {
	constructor(
		@inject('ClassificationsRepository')
		private classificationsRepository: IClassificationsRepository
	) { }

	async execute(): Promise<Classification[]> {
		return await this.classificationsRepository.list()
	}
}
