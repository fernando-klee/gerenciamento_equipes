import 'reflect-metadata'
import 'dotenv/config'
import createConnection from '../typeorm/data-source'
import '../../providers'

import BullmqProvider from '../../providers/queueProvider/implementations/BullmqProvider'

const process = async (): Promise<void> => {
	await createConnection()

	const bullmqProvider = new BullmqProvider()
	try {
		bullmqProvider.process()
		console.log('Queue is running!')
	} catch (err) {
		console.log(err)
	}
}

process()
