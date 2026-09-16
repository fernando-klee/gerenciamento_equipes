import AppException from './AppException'

export default class PasswordNotFilledCorrectlyException extends AppException {
	constructor() {
		super(400, 'Password não preenchido corretamente')
	}
}
