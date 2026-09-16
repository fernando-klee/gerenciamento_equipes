import { Server } from 'socket.io'
import { socket } from '../../../infra/express/app'
import ISocketIoProvider from '../interfaces/ISocketIoProvider'

export default class SocketIoProvider implements ISocketIoProvider {
	private socketIo: Server

	constructor() {
		this.socketIo = socket
	}

	async onEmit(event: string, description: any): Promise<void> {
		this.socketIo.emit(event, description)
		await this.onClose(event)
	}

	async onClose(event: string): Promise<void> {
		this.socketIo.in(event).socketsLeave(event)
	}

}
