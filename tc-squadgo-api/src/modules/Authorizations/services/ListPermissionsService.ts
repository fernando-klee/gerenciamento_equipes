import { inject, injectable } from 'tsyringe'
import Permission from '../infra/typeorm/entities/Permission'
import IPermissionsRepository from '../repositories/IPermissionsRepository'

@injectable()
export default class ListPermissionsService {
	constructor(
		@inject('PermissionsRepository')
		private permissionsRepository: IPermissionsRepository
	) { }

	async execute(): Promise<Permission[]> {
		return await this.permissionsRepository.list()
	}
}
