export type keys =
	'skills' | 'users' | 'customers'

export default interface ICacheProvider {
	save(key: keys, value: any): Promise<void>
	recover<T>(key: keys): Promise<T | null>
	invalidate(key: keys): Promise<void>
	invalidatePrefix(key: string): Promise<void>
}
