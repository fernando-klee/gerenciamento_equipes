import AppException from './AppException'

export default class NoResourceInRoomThisDayException extends AppException {
	constructor() {
		super(400, 'Recurso não está atrelado a sala nesse dia')
	}
}
