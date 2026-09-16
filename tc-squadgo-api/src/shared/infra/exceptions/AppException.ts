export default class AppException {
	statusCode: number
	message: string

	constructor(statusCode: number, message: string) {
		this.statusCode = statusCode
		this.message = message
	}
}
