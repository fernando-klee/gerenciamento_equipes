import AppException from './AppException'

export default class DepartmentNotFoundException extends AppException {
	constructor() {
		super(400, 'Setor não encontrado')
	}
}
