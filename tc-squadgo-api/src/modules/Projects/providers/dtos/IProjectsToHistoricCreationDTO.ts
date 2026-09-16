import Project from '../../infra/typeorm/entities/Project'

export default interface IProjectsToHistoricCreationDTO {
	username: string
	oldProject: Project | null
	newProject: Project
}
