import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'

import mailConfig from '../../../../config/mailConfig'
import nodemailer, { Transporter } from 'nodemailer'
import ISendMailDTO from '../dtos/ISendMailDTO'
import ISendMail from '../interfaces/ISendMail'

export default class TestingMailProvider implements ISendMail {
	private transporter: Transporter

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: mailConfig.mailConfig.host,
			port: mailConfig.mailConfig.port,
			secure: false,
			auth: {
				user: mailConfig.mailConfig.auth.user,
				pass: mailConfig.mailConfig.auth.pass
			},
			tls: {
				rejectUnauthorized: false
			}
		})
	}

	async sendEmail(data: ISendMailDTO): Promise<void> {
		const { from, to, subject, variables, template } = data
		const templatePath = path.resolve(__dirname, '..', 'views')
		const templateFileContent = fs.readFileSync(`${templatePath}/${template}`).toString('utf-8')
		const templateParse = handlebars.compile(templateFileContent)
		const templateHtml = templateParse(variables)

		await this.transporter.sendMail({
			from,
			to,
			subject,
			html: templateHtml
		})
	}
}
