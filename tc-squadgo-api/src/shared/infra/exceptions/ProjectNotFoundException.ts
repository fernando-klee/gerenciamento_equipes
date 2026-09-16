import AppException from './AppException'

export default class ProjectNotFoundException extends AppException {
	constructor() {
		super(400, 'Projeto não foi encontrado')
	}
}
