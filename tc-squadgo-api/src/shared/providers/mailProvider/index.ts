import { container } from 'tsyringe'

import mailConfig from '../../../config/mailConfig'
import TestingMailProvider from './implementations/TestingMailProvider'
import ISendMail from './interfaces/ISendMail'
import MailtrapMailProvider from './implementations/MailtrapMailProvider'

const providers = {
	testing: container.resolve(TestingMailProvider),
	mailtrap: container.resolve(MailtrapMailProvider)
}

container.registerInstance<ISendMail>('MailProvider', providers[mailConfig.mailProvider])
