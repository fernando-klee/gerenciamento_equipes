import AppException from './AppException'

export default class MissingDataException extends AppException {
	constructor() {
		super(404, 'Envie a escala apenas com os colaboradores e após realizar o envio adicione o líder na sala.')
	}
}
