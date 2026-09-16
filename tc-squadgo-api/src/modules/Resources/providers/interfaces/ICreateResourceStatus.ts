import CreateResourceSubstatusDTO from '../dtos/CreateResourceSubstatusDTO'

export default interface ICreateResourceStatus {
	execute(data: CreateResourceSubstatusDTO): Promise<void>
}
