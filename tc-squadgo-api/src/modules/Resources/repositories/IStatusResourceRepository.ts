import StatusResource from '../infra/typeorm/entities/Status'

export default interface IStatusResourceRepository {
	findByName(name: string): Promise<StatusResource | null>
}
