import AppException from './AppException'

export default class SetorNotFoundException extends AppException {
	constructor() {
		super(400, 'Setor não encontrado')
	}
}