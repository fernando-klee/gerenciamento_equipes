import ICacheProvider, { keys } from '../../shared/providers/cacheProvider/interfaces/ICacheProvider'

export default class CacheProviderFake implements ICacheProvider {
	private cache: Map<string, any>

	constructor() {
		this.cache = new Map<string, any>()
	}

	async save(key: keys, value: any): Promise<void> {
		this.cache.set(key, value)
	}

	async recover<T>(key: keys): Promise<T | null> {
		return this.cache.get(key)
	}

	async invalidate(key: keys): Promise<void> {
		this.cache.delete(key)
	}

	async invalidatePrefix(key: string): Promise<void> {
		throw new Error('Method not implemented.')
	}

}
