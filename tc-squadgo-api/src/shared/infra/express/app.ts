import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import createConnection from '../typeorm/data-source'
import cors from 'cors'
import '../../providers'
import routes from './routes'
import exceptionValidation from './middlewares/exceptionValidation'
import uploadConfig from '../../../config/uploadConfig'

createConnection.initialize()
	.then(() => console.log('Database connected.'))
	.catch(err => {
		console.error('Database not connected.')
		throw err
	})
	
const app = express()
const httpServer = createServer(app)
const socket = new Server(httpServer, {
	cors: {
		origin: process.env.APP_WEB_URL
	}
})
socket.on('connection', (socket) => {
	console.log(socket.handshake.auth.user.name + ' conectou.')

	socket.on('disconnect', reason => {
		console.log(socket.handshake.auth.user.name + ' desconectou.')
	})
})
app.use(cors({
	// origin: process.env.APP_WEB_URL
	origin: '*'
}))
app.use(express.json())
app.use('/files/customers-images', express.static(uploadConfig.subFolders.customers_images))
app.use('/files/resources-photos', express.static(uploadConfig.subFolders.resources_photos))
app.use(routes)
app.use(exceptionValidation)

export { httpServer, socket }
