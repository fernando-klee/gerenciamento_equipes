import { container } from 'tsyringe'

import CreateResourceHistoricService from './implementations/CreateResourceHistoricService'
import CreateResourceProjectHistoricService from './implementations/CreateResourceProjectHistoricService'
import CreateResourceStatus from './implementations/CreateResourceStatus'
import GetResourceAvailableHours from './implementations/GetResourceAvailableHours'
import ICreateResourceHistoricService from './interfaces/ICreateResourceHistoricService'
import ICreateResourceProjectHistoricService from './interfaces/ICreateResourceProjectHistoricService'
import ICreateResourceStatus from './interfaces/ICreateResourceStatus'
import IGetResourceAvailableHours from './interfaces/IGetResourceAvailableHours'

container.registerSingleton<IGetResourceAvailableHours>('GetResourceAvailableHours', GetResourceAvailableHours)
container.registerSingleton<ICreateResourceStatus>('CreateResourceStatus', CreateResourceStatus)
container.registerSingleton<ICreateResourceHistoricService>('CreateResourceHistoricService', CreateResourceHistoricService)
container.registerSingleton<ICreateResourceProjectHistoricService>('CreateResourceProjectHistoricService', CreateResourceProjectHistoricService)
