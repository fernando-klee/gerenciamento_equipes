import AppException from './AppException'

export default class RoomAlreadyExistsException extends AppException {
	constructor() {
		super(404, 'Sala já existe')
	}
}
