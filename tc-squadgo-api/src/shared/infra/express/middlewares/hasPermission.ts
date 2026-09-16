import { Request, Response, NextFunction } from 'express'
import UserNotAllowedException from '../../../../shared/infra/exceptions/UserNotAllowedException'

interface TokenPayload {
	permissions: string[]
}

export default function hasPermission(permissionsAllowed: string[]) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { permissions } = req as TokenPayload
		const hasPermission = permissions ? permissions.some(p => permissionsAllowed.includes(p)) : []

		if (!hasPermission) throw new UserNotAllowedException()

		return next()
	}
}
