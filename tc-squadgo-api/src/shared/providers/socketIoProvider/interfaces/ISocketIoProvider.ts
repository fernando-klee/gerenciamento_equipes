export default interface ISocketIoProvider {
	onEmit(event: string, description: any): Promise<void>
	onClose(event: string): Promise<void>
}
