import { inject, injectable } from 'tsyringe'
import Type from '../infra/typeorm/entities/Type'
import ITypesRepository from '../repositories/ITypesRepository'

@injectable()
export default class ListTypesService {
	constructor(
		@inject('TypesRepository')
		private typesRepository: ITypesRepository
	) { }

	async execute(): Promise<Type[]> {
		return await this.typesRepository.list()
	}
}
