import { HistoricTypeProps } from '../infra/typeorm/entities/ProjectHistoric'

export default interface ICreateProjectHistoricDTO {
	description: string
	project_id: number
	type: HistoricTypeProps
}
