import { NextFunction, Request, Response } from 'express'
import ClientCredentialsRepository from '../../../../modules/ClientCredentials/infra/typeorm/repositories/ClientCredentialsRepository'
import ClientCredentialsInvalid from '../../../../shared/infra/exceptions/ClientCredentialsInvalid'


export default async function isClientCredential(req: Request, res: Response, next: NextFunction): Promise<void> {
	const client_id = req.headers['client_id'] as string
	const client_secret = req.headers['client_secret'] as string

	if(!client_id || !client_secret) throw new ClientCredentialsInvalid()

	const clientCredentialRepository = new ClientCredentialsRepository()

	const clientCredential = await clientCredentialRepository.findByClientIdAndClientSecret({ client_id, client_secret })

	if (!clientCredential) throw new ClientCredentialsInvalid()

	req.client_name = clientCredential.client_name

	return next()
}
