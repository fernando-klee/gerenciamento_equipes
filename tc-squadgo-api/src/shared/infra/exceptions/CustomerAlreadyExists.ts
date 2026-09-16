import AppException from './AppException'

export default class CustomerAlreadyExists extends AppException {
	constructor() {
		super(400, 'Cliente com este nome já existe')
	}
}
