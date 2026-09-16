import { verify } from 'jsonwebtoken'

import { NextFunction, Request, Response } from 'express'
import JwtIsMissingException from '../../exceptions/JwtIsMissingException'
import auth from '../../../../config/auth'
import AppException from '../../exceptions/AppException'
import ResourcesRepository from '../../../../modules/Resources/infra/typeorm/repositories/ResourcesRepository'
import ResourceNotFoundException from '../../../../shared/infra/exceptions/ResourceNotFoundException'

interface TokenPayload {
	uniqueId: string
	permissions: string[]
}

export default async function ensureAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
	const authorization = req.headers['authorization']

	if (!authorization) throw new JwtIsMissingException()

	const [, token] = authorization.split(' ')

	try {
		const isTokenValid = verify(token, auth.jwt.secret)
		const { uniqueId } = isTokenValid as TokenPayload

		const resourceRepository = new ResourcesRepository()

		const resource = await resourceRepository.findByRegistry(uniqueId)

		if(!resource) throw new ResourceNotFoundException()

		const resourcePermissions = await resourceRepository.listPermissionsByResourceId(resource.id)
		const permissions = resourcePermissions.map(p => p.slug)

		req.user_id = uniqueId
		req.permissions = permissions

		return next()

	} catch (err) {
		throw new AppException(401, 'Token inválido')
	}
}
