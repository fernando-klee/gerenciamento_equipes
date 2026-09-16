import Classification from '../infra/typeorm/entities/Classification'

export default interface IClassificationsRepository {
	list(): Promise<Classification[]>
	findById(classification_id: number): Promise<Classification | null>
	findByDescription(description: string): Promise<Classification | null>
}
