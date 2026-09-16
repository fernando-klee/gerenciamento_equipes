export default interface IJobs {
	get key(): string
	handle(data: any): Promise<void>
}
