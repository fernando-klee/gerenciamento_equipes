import { container } from 'tsyringe'
import BullmqProvider from './implementations/BullmqProvider'
import IQueueProvider from './interfaces/IQueueProvider'

container.registerSingleton<IQueueProvider>('QueueProvider', BullmqProvider)
