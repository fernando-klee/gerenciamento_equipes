import { inject, injectable } from 'tsyringe'
import Type from '../infra/typeorm/entities/Type'
import ITypesRepository from '../repositories/ITypesRepository'
import TypeNotFoundException from '../../../shared/infra/exceptions/TypeNotFoundException'

@injectable()
export default class FindTypesByIdService {
	constructor(
		@inject('TypesRepository')
		private typesRepository: ITypesRepository
	) { }

	async execute(type_id: number): Promise<Type> {
		const typeExists = await this.typesRepository.findById(type_id)
		if (!typeExists) throw new TypeNotFoundException()

		return typeExists
	}
}
