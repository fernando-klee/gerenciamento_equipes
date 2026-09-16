import { Repository } from 'typeorm'
import ClientCredentials from '../entities/ClientCredentials'
import { IClientCredentialsRepository } from 'modules/ClientCredentials/repositories/IClientCredentialsRepository'
import { FindByClientIdAndClientSecretDTO } from 'modules/ClientCredentials/dtos/FindByClientIdAndClientSecretDTO'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class ClientCredentialsRepository implements IClientCredentialsRepository {
	private ormRepository: Repository<ClientCredentials>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(ClientCredentials)
	}

	async findByClientIdAndClientSecret(data: FindByClientIdAndClientSecretDTO): Promise<ClientCredentials | null> {
		const { client_id, client_secret } = data
		return await this.ormRepository.findOne({ 
			where: {
				client_id: parseInt(client_id),
				client_secret: client_secret
			}
		})
	}

}