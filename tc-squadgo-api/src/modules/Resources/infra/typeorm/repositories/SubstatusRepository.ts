import { Repository } from 'typeorm'
import ISubstatusRepository from '../../../repositories/ISubstatusRepository'
import Substatus from '../entities/Substatus'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class SubstatusRepository implements ISubstatusRepository {
	private ormRepository: Repository<Substatus>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Substatus)
	}

	async findBySubstatus(name: string): Promise<Substatus | null> {
		return await this.ormRepository.findOne({ where: { name } })
	}

}
