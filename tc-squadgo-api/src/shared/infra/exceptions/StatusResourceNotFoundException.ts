import AppException from './AppException'

export default class StatusResourceNotFoundException extends AppException {
	constructor() {
		super(400, 'Status não encontrado')
	}
}
