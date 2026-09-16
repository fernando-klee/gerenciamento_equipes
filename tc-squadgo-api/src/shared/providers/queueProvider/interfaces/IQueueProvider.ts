export default interface IQueueProvider {
	init(): void
	add(jobName: string, data: any): Promise<void>
	process(): void
}
