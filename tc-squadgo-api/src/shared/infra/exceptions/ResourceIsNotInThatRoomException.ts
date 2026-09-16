import AppException from './AppException'

export default class ResourceIsNotInThatRoomException extends AppException {
	constructor() {
		super(404, 'Recurso não encontrado nesta sala')
	}
}
