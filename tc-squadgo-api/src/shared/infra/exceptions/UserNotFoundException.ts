import AppException from './AppException'

export default class UserNotFoundException extends AppException {
	constructor() {
		super(400, 'Usuário não existe')
	}
}
