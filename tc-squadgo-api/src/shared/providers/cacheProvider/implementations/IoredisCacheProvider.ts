import Redis from 'ioredis'

import cache from '../../../../config/cache'
import ICacheProvider from '../interfaces/ICacheProvider'

export default class IoredisCacheProvider implements ICacheProvider {
	private ioredis: Redis

	constructor() {
		this.ioredis = new Redis({
			host: cache.config.redis.host,
			port: cache.config.redis.port,
			username: cache.config.redis.username,
			password: cache.config.redis.password,
			...(cache.config.redis.tls!.rejectUnauthorized && { tls: cache.config.redis.tls })
		})
	}

	async save(key: string, value: any): Promise<void> {
		await this.ioredis.set(key, JSON.stringify(value))
	}

	async recover<T>(key: string): Promise<T | null> {
		const cache = await this.ioredis.get(key)

		if (!cache) return null

		return JSON.parse(cache) as T
	}

	async invalidate(key: string): Promise<void> {
		await this.ioredis.del(key)
	}

	async invalidatePrefix(key: string): Promise<void> {
		throw new Error('Method not implemented.')
	}

}
