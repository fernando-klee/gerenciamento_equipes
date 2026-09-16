import { container } from 'tsyringe'
import CloseProjectService from './implementations/CloseProjectService'
import ICloseProjectsService from './interfaces/ICloseProjectsService'
import CreateProjectPropsHistoricService from './implementations/CreateProjectPropsHistoricService'
import ICreateProjectPropsHistoricService from './interfaces/ICreateProjectPropsHistoricService'
import AddResourceToProjectService from './implementations/AddResourceToProjectService'
import IAddResourceToProjectService from './interfaces/IAddResourceToProjectService'
import ICreateProjectHistoricService from './interfaces/ICreateProjectHistoricService'
import CreateProjectHistoricService from './implementations/CreateProjectHistoricService'

container.registerSingleton<ICloseProjectsService>('CloseProjectService', CloseProjectService)
container.registerSingleton<ICreateProjectPropsHistoricService>('CreateProjectPropsHistoricService', CreateProjectPropsHistoricService)
container.registerSingleton<ICreateProjectHistoricService>('CreateProjectHistoricService', CreateProjectHistoricService)
container.registerSingleton<IAddResourceToProjectService>('AddResourceToProjectService', AddResourceToProjectService)
