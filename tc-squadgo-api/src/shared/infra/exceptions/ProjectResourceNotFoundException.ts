import AppException from './AppException'

export default class ProjectResourceNotFoundException extends AppException {
	constructor() {
		super(400, 'Projeto ou recurso não encontrados')
	}
}
