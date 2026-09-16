import AppException from './AppException'

export default class VersionNoteNotFoundException extends AppException {
	constructor() {
		super(400, 'Nota da versão não foi encontrada')
	}
}
