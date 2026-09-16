import { container } from 'tsyringe'
import SocketIoProvider from './implementations/SocketIoProvider'
import ISocketIoProvider from './interfaces/ISocketIoProvider'

container.registerSingleton<ISocketIoProvider>('SocketIoProvider', SocketIoProvider)
