import AppException from './AppException'

export default class ResourceInSeveralRoomsInSameDayException extends AppException {
	constructor() {
		super(400, 'Este recurso já está em outra sala neste dia.')
	}
}
