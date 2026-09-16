import { Repository } from 'typeorm'
import IStatusResourceRepository from '../../../repositories/IStatusResourceRepository'
import StatusResource from '../entities/Status'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class StatusResourceRepository implements IStatusResourceRepository {
	private ormRepository: Repository<StatusResource>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(StatusResource)
	}

	async findByName(name: string): Promise<StatusResource | null> {
		return await this.ormRepository.findOne({ where: { name } })
	}
}
