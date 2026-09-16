import { container } from 'tsyringe'
import GetAllResourcesHours from './implementations/GetAllResourcesHours'
import TotalHoursToHappen from './implementations/TotalHoursToHappen'
import IGetAllResourcesHours from './interfaces/IGetAllResourcesHours'
import ITotalHoursToHappen from './interfaces/ITotalHoursToHappen'

container.registerSingleton<IGetAllResourcesHours>('GetAllResourcesHours', GetAllResourcesHours)
container.registerSingleton<ITotalHoursToHappen>('TotalHoursToHappen', TotalHoursToHappen)
