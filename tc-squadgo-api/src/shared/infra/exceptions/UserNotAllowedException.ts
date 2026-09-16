import AppException from './AppException'

export default class UserNotAllowedException extends AppException {
	constructor() {
		super(400, 'Usuário não tem permissão')
	}
}
