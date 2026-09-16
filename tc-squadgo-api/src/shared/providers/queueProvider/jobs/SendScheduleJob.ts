import IJobs from '../interfaces/IJobs'

import mailConfig from '../../../../config/mailConfig'
import ISendMail from '../../mailProvider/interfaces/ISendMail'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class SendScheduleJob implements IJobs {
	constructor(
		@inject('MailProvider')
		private mailProvider: ISendMail
	) { }

	get key(): string {
		return 'SendScheduleJob'
	}

	async handle(data: any): Promise<void> {
		const { name, email, month, day, room } = data

		await this.mailProvider.sendEmail({
			from: mailConfig.from,
			to: {
				address: email,
				name
			},
			subject: 'Escala do mês atual',
			variables: { email, name, month, day, room },
			template: 'SendScheduleTemplate.hbs'
		})

	}

}
