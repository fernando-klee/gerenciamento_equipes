import AppException from './AppException'

export default class MonthDoesNotExistException extends AppException {
	constructor() {
		super(400, 'Mês não existe')
	}
}
