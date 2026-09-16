import AppException from './AppException'

export default class DraftDoNotExistsException extends AppException {
	constructor() {
		super(400, 'O rascunho não existe')
	}
}
