import AppException from './AppException'

export default class RecoverTokenNotFoundException extends AppException {
	constructor() {
		super(400, 'Recuperação expirou ou não existe!')
	}
}
