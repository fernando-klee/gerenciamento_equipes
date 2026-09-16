import { httpServer } from './app'

const PORT = process.env.PORT ?? 3333
httpServer.listen(PORT, () => {
	console.log('TC Team is running on port 3333!')
})
