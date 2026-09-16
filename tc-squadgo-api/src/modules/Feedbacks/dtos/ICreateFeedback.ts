export default interface ICreateFeedback {
	description: string
	type: 'PROJECT' | 'CUSTOMER' | 'PERSONAL' | 'RESOURCE'
	resource_id: number
	reporter_id: number
	project_id?: number
	customer_id?: number
}
