import Substatus from '../infra/typeorm/entities/Substatus'

export default interface ISubstatusRepository {
	findBySubstatus(name: string): Promise<Substatus | null>
}
