import AppException from './AppException'

export default class UserAlreadyExistsException extends AppException {
	constructor() {
		super(400, 'Usuário já existe')
	}
}
