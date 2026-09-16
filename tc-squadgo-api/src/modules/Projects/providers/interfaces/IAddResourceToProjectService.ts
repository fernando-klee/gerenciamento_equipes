import IAddResourceToProjectDTO from '../dtos/IAddResourceToProjectDTO'
import ProjectResource from '../../infra/typeorm/entities/ProjectResource'

export default interface IAddResourceToProjectService {
    execute(data: IAddResourceToProjectDTO): Promise<ProjectResource>
}