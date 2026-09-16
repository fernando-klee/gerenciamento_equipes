import AppException from './AppException'

export default class ResourceIdDoesNotExistException extends AppException {
	constructor() {
		super(400, 'Não existe recurso com esse ID')
	}
}
