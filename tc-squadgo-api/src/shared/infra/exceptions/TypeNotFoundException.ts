import AppException from './AppException'

export default class TypeNotFoundException extends AppException {
	constructor() {
		super(400, 'Tipo não foi encontrado')
	}
}
