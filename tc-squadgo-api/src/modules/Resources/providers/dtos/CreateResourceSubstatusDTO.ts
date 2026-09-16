export default interface CreateResourceSubstatusDTO {
	resource_id: number
	status: string
	hours_left: number
	resource_hours: number
	has_projects: boolean
}
