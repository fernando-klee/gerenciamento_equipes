import AppException from './AppException'

export default class NotificationNotFoundException extends AppException {
	constructor() {
		super(400, 'Notificação não existe')
	}
}
