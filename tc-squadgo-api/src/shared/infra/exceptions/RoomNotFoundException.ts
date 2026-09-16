import AppException from './AppException'

export default class RoomNotFoundException extends AppException {
	constructor() {
		super(404, 'Sala não encontrada')
	}
}
