export default interface FindOrCreateResourceStatusDTO {
	id?: number
	resource_id: number
	status_id: number
	substatus_id: number | null
}
