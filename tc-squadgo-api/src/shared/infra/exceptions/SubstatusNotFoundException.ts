import AppException from './AppException'

export default class SubstatusNotFoundException extends AppException {
	constructor() {
		super(400, 'Substatus não encontrado')
	}
}
