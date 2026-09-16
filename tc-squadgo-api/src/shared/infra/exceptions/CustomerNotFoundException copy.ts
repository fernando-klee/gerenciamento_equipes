import AppException from './AppException'

export default class FeedbackNotFoundException extends AppException {
	constructor() {
		super(404, 'Feedback não foi encontrado')
	}
}
