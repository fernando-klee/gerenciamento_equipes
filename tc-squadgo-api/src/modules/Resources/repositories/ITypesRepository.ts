import Type from '../infra/typeorm/entities/Type'

export default interface ITypesRepository {
	list(): Promise<Type[]>
	listByIds(types_ids: number[]): Promise<Type[]>
	findById(type_id: number): Promise<Type | null>
}
