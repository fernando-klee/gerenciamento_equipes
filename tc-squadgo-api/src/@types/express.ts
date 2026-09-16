declare namespace Express {
	export interface Request {
		user_id: string
		permissions: string[]
		client_name: string
	}
}
