import AppException from './AppException'

export default class ResourceAlreadyExistsException extends AppException {
	constructor() {
		super(400, 'E-mail indisponível')
	}
}
