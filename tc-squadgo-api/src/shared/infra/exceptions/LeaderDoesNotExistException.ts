import AppException from './AppException'

export default class LeaderDoesNotExistException extends AppException {
	constructor() {
		super(404, 'Líder não existe')
	}
}
