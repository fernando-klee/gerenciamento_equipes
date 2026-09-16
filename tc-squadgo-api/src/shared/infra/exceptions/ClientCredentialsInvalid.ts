import AppException from './AppException'

export default class ClientCredentialsInvalid extends AppException {
	constructor() {
		super(400, 'Credenciais do cliente está inválida')
	}
}
