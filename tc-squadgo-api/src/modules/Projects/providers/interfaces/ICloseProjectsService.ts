export default interface ICloseProjectsService {
	execute(user_id: string, project_id: number): Promise<void>
}
