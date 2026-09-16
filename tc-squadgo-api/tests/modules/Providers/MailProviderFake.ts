import ISendMailDTO from 'shared/providers/mailProvider/dtos/ISendMailDTO'
import ISendMail from 'shared/providers/mailProvider/interfaces/ISendMail'

export default class MailProviderFake implements ISendMail {
	private readonly mails: ISendMailDTO[] = []

	async sendEmail(data: ISendMailDTO): Promise<void> {
		this.mails.push(data)
	}

}
