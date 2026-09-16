import AppException from './AppException'

export default class DayIdDoesNotExistException extends AppException {
	constructor() {
		super(400, 'Não existe dia com esse ID')
	}
}
