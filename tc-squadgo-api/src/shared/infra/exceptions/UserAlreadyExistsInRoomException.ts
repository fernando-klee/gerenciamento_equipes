import AppException from './AppException'

export default class UserAlreadyExistsInRoomException extends AppException {
	constructor() {
		super(400, 'Recurso já existe nesta sala')
	}
}
