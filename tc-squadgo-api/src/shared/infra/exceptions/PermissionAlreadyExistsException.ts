import AppException from './AppException'

export default class PermissionAlreadyExistsException extends AppException {
	constructor() {
		super(400, 'Permissão já existe')
	}
}
