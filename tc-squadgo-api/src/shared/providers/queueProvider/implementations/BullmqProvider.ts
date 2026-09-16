import { Worker, Queue } from 'bullmq'
import { container } from 'tsyringe'

import IJobs from '../interfaces/IJobs'
import cache from '../../../../config/cache'

import IQueueProvider from '../interfaces/IQueueProvider'
import RecoverPasswordJob from '../jobs/RecoverPasswordJob'
import SendScheduleJob from '../jobs/SendScheduleJob'
import IRedisConnectionDTO from '../../dtos/IRedisConnectionDTO'
import CreateUserJob from '../jobs/CreateUserJob'

export default class BullmqProvider implements IQueueProvider {
	private classesJobs: any[] = [CreateUserJob,RecoverPasswordJob,SendScheduleJob]
	private queuesObject: any = {}
	private queues: Queue[]
	private connection: IRedisConnectionDTO

	constructor() {
		this.connection = {
			host: cache.config.redis.host,
			port: cache.config.redis.port,
			password: cache.config.redis.password
		}
		this.classesJobs = this.classesJobs.map((c: any) => {
			const classInstance: any = container.resolve(c)
			return classInstance
		})

		this.queues = this.classesJobs.map((c: any) => {
			const { key }: IJobs = c
			return new Queue(key, { connection: this.connection })
		})
		this.init()
	}

	init(): void {
		this.classesJobs.map((classJob: any) => {
			const { key, handle }: IJobs = classJob
			this.queuesObject[key] = {
				handle
			}
		})
	}

	async add(jobName: string, data: any): Promise<void> {
		this.queues.map(q => {
			if (q.name === jobName) {
				q.add(jobName, data)
			}
		})
	}

	process(): void {
		this.classesJobs.map((classJob: any) => {
			const service: IJobs = classJob
			new Worker(service.key, async job => {
				if (job.name === service.key) {
					await service.handle(job.data)
				}
			}, { connection: this.connection })
		})
	}
}
