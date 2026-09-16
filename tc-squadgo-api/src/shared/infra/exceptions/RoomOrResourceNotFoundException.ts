import AppException from './AppException'

export default class RoomOrResourceNotFoundException extends AppException {
	constructor() {
		super(404, 'Sala ou recurso não encontrado')
	}
}
