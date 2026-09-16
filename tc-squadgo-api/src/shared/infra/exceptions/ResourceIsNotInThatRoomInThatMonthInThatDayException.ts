import AppException from './AppException'

export default class ResourceIsNotInThatRoomInThatMonthInThatDayException extends AppException {
	constructor() {
		super(404, 'Recurso não encontrado nesta sala, neste dia da semana neste mês')
	}
}
