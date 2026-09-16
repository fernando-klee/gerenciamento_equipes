import AppException from './AppException'

export default class UserNotFoundInRoomException extends AppException {
	constructor() {
		super(400, 'Recurso não existe na sala')
	}
}
