import { HistoricTypeProps } from '../infra/typeorm/entities/ResourceHistoric'

export default interface ICreateResourceHistoricDTO {
	description: string
	resource_id: number
	type: HistoricTypeProps
}
