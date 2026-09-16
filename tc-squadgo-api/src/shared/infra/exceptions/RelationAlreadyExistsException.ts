import AppException from './AppException'

export default class RelationAlreadyExistsException extends AppException {
	constructor() {
		super(400, 'Essa relação de skill e setor já existe')
	}
}