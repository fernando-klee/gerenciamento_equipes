import AppException from './AppException'

export default class ResourceAlreadyExistsInRoomException extends AppException {
	constructor() {
		super(404, 'Recurso já existe nesta sala')
	}
}
