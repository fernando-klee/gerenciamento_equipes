import IJobs from '../interfaces/IJobs'

import mailConfig from '../../../../config/mailConfig'
import ISendMail from '../../mailProvider/interfaces/ISendMail'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class RecoverPasswordJob implements IJobs {
	constructor(
		@inject('MailProvider')
		private mailProvider: ISendMail
	) { }

	get key(): string {
		return 'RecoverPasswordJob'
	}

	async handle(data: any): Promise<void> {
		const { name, email, token } = data
		const link = process.env.APP_WEB_URL + '/resetar-minha-senha/' + token

		await this.mailProvider.sendEmail({
			from: mailConfig.from,
			to: {
				address: email,
				name
			},
			subject: 'Recuperação de senha',
			variables: { email, name, link },
			template: 'RecoverPasswordTemplate.hbs'
		})

	}

}
