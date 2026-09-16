export default interface FilterCustomersDTO {
	name: string
	status: 'ATIVO' | 'INATIVO'
	currentPage: number
	qtdPerPage: number
	orderField: string
	order: 'ASC' | 'DESC'
}
