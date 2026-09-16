import IJobs from '../interfaces/IJobs'

import mailConfig from '../../../../config/mailConfig'
import ISendMail from '../../mailProvider/interfaces/ISendMail'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class CreateUserJob implements IJobs {
	constructor(
		@inject('MailProvider')
		private mailProvider: ISendMail
	) { }

	get key(): string {
		return 'CreateUserJob'
	}

	async handle(data: any): Promise<void> {
		const { name, email, password } = data

		await this.mailProvider.sendEmail({
			from: mailConfig.from,
			to: {
				address: email,
				name
			},
			subject: 'Registro realizado',
			variables: { email, name, password },
			template: 'RegisterNewUserTemplate.hbs'
		})

	}

}
