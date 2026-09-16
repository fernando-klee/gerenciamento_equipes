import ISendMailDTO from '../dtos/ISendMailDTO'

export default interface ISendMail {
	sendEmail(data: ISendMailDTO): Promise<void>
}
