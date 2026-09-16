import IQueueProvider from '../../shared/providers/queueProvider/interfaces/IQueueProvider'

export default class QueueProviderFake implements IQueueProvider {
	private jobs: any[] = []

	init(): void {
		throw new Error('Method not implemented.')
	}

	async add(jobName: string, data: any): Promise<void> {
		this.jobs.push({ jobName, data })
	}

	process(): void {
		throw new Error('Method not implemented.')
	}

}
