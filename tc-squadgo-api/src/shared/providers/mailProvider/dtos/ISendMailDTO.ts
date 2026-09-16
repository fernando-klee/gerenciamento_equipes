export interface IMailContact {
	address: string
	name: string
}

export interface IMailVariables {
	[key: string]: any
}

export default interface ISendMailDTO {
	from: IMailContact
	to: IMailContact
	subject: string
	variables: IMailVariables
	template: string
}
