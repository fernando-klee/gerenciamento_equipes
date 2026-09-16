import AppException from './AppException'

export default class RoleAlreadyExistsException extends AppException {
	constructor() {
		super(400, 'Grupo de permissão já existe')
	}
}
