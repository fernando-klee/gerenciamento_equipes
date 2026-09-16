import { container } from 'tsyringe'
import ICreateNotificationService from '../interfaces/ICreateNotificationService'
import CreateNotificationService from '../implementations/CreateNotificationService'

container.registerSingleton<ICreateNotificationService>('CreateNotificationService', CreateNotificationService)
