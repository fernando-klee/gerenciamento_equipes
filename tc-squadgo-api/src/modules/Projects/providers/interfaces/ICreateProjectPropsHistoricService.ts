import IProjectsToHistoricCreationDTO from '../dtos/IProjectsToHistoricCreationDTO'

export default interface ICreateProjectPropsHistoricService {
	execute(data: IProjectsToHistoricCreationDTO): Promise<void>
}
