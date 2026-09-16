import AppException from './AppException'

export default class RoleNotFoundException extends AppException {
	constructor() {
		super(400, 'Grupo de permissão não encontrado')
	}
}
