import { RedisOptions } from 'ioredis'

interface ICacheConfig {
	driver: 'redis'

	config: {
		redis: RedisOptions
	}
}

export default {
	driver: 'redis',

	config: {
		redis: {
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
			username: process.env.REDIS_USERNAME ?? null,
			password: process.env.REDIS_PASSWORD ?? null,
			tls: {
				rejectUnauthorized: process.env.REDIS_IS_SECURE === 'true' ? true : false
			}
		}
	}
} as ICacheConfig
