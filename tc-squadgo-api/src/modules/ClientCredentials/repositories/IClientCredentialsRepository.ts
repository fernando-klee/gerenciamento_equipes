import { FindByClientIdAndClientSecretDTO } from '../dtos/FindByClientIdAndClientSecretDTO'
import ClientCredentials from '../infra/typeorm/entities/ClientCredentials'

export interface IClientCredentialsRepository {
	findByClientIdAndClientSecret(data: FindByClientIdAndClientSecretDTO): Promise<ClientCredentials | null>
}
