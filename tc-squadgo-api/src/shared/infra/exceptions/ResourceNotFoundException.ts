import AppException from './AppException'

export default class ResourceNotFoundException extends AppException {
	constructor() {
		super(404, 'Recurso não encontrado')
	}
}
