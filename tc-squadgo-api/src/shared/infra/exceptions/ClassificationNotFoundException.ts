import AppException from './AppException'

export default class ClassificationNotFoundException extends AppException {
	constructor() {
		super(400, 'Classificação não foi encontrada')
	}
}
