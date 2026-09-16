import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'
import ISendMailDTO from '../dtos/ISendMailDTO'
import mailConfig from '../../../../config/mailConfig'
import ISendMail from '../interfaces/ISendMail'

export default class MailtrapMailProvider implements ISendMail {
	private readonly transporter: Transporter

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: 'b5406d8f59a3bf',
				pass: 'faac5638d2620a',
			},
		})
	}

	async sendEmail(data: ISendMailDTO): Promise<void> {
		const templatePath = path.resolve(__dirname, '..', 'views')
		const templateFileContent = fs
			.readFileSync(`${templatePath}/${data.template}`)
			.toString('utf-8')
		const templateParse = handlebars.compile(templateFileContent)
		const templateHtml = templateParse(data.variables)

		await this.transporter.sendMail({
			from: mailConfig.from,
			to: data.to,
			subject: data.subject,
			html: templateHtml,
		})
	}
}
