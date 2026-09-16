import AppException from './AppException'

export default class WeekdayDoesNotExistException extends AppException {
	constructor() {
		super(400, 'Dia da semana não existe')
	}
}
