import AppException from './AppException'

export default class RoomFullException extends AppException {
	constructor() {
		super(400, 'A sala está cheia')
	}
}
