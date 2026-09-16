interface MailConfig {
	mailProvider: 'testing' | 'mailtrap'
	mailConfig: {
		host: string
		port: number
		auth: {
			user: string
			pass: string
		}
	}
	from: {
		address: string
		name: string
	}
}

export default {
	mailProvider: process.env.MAIL_PROVIDER,
	mailConfig: {
		host: process.env.MAIL_HOST,
		port: Number(process.env.MAIL_PORT),
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		}
	},
	from: {
		address: 'envio@testingcompany.com.br',
		name: 'Testing Company'
	}
} as MailConfig
