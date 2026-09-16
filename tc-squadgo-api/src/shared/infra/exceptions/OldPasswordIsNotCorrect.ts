import AppException from './AppException'

export default class OldPasswordIsNotCorrect extends AppException {
	constructor() {
		super(400, 'Senha antiga não está correta')
	}
}
