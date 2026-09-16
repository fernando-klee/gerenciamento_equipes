import AppException from './AppException'

export default class CannotDeleteOwnUserException extends AppException {
	constructor() {
		super(400, 'Usuário não tem permissão para se auto deletar')
	}
}
