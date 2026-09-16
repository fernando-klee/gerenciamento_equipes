import AppException from './AppException'

export default class SlugAlreadyExistsException extends AppException {
	constructor() {
		super(400, 'Grupo já existe')
	}
}
