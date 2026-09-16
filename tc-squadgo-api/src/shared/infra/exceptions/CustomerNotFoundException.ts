import AppException from './AppException'

export default class CustomerNotFoundException extends AppException {
	constructor() {
		super(400, 'Cliente não foi encontrado')
	}
}
