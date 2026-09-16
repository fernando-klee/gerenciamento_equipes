import ResourceProjectsHistoric from '../../infra/typeorm/entities/ResourceProjectsHistoric'

export default interface ICreateResourceProjectHistoricService {
	execute(resource_id: number, project_id: number): Promise<ResourceProjectsHistoric>
}
