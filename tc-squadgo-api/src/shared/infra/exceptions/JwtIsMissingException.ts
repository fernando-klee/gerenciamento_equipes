import AppException from './AppException'

export default class JwtIsMissingException extends AppException {
	constructor() {
		super(401, 'Token JWT não foi informado')
	}
}
