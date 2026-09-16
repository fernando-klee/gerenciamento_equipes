import { container } from 'tsyringe'
import './mailProvider'
import './queueProvider'
import './storageProvider'
import './socketIoProvider'
import './cacheProvider'

import '../../modules/GeralVision/providers'
import '../../modules/Notifications/providers'
import '../../modules/Projects/providers'
import '../../modules/Resources/providers'

import PermissionsRepository from '../../modules/Authorizations/infra/typeorm/repositories/PermissionsRepository'
import IPermissionsRepository from '../../modules/Authorizations/repositories/IPermissionsRepository'
import UsersRepository from '../../modules/Accounts/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '../../modules/Accounts/repositories/IUsersRepository'
import RolesRepository from '../../modules/Authorizations/infra/typeorm/repositories/RolesRepository'
import IRolesRepository from '../../modules/Authorizations/repositories/IRolesRepository'
import ICustomersRepository from '../../modules/Customers/repositories/ICustomersRepository'
import CustomersRepository from '../../modules/Customers/infra/typeorm/repositories/CustomersRepository'
import IResourcesRepository from '../../modules/Resources/repositories/IResourcesRepository'
import ResourcesRepository from '../../modules/Resources/infra/typeorm/repositories/ResourcesRepository'
import SkillsRepository from '../../modules/Skills/infra/typeorm/repositories/SkillsRepository'
import ISkillsRepository from '../../modules/Skills/repositories/ISkillsRepository'
import SkillsPendingRepository from '../../modules/Skills/infra/typeorm/repositories/SkillsPendingRepository'
import ISkillsPendingRepository from '../../modules/Skills/repositories/ISkillsPendingRepository'
import SkillsDepartmentsRepository from '../../modules/Skills/infra/typeorm/repositories/SkillsDepartmentsRepository'
import ISkillsDepartmentsRepository from '../../../src/modules/Skills/repositories/ISkillsDepartmentsRepository'
import DepartmentRepository from '../../../src/modules/Skills/infra/typeorm/repositories/DepartmentRepository'
import IDepartmentRepository from '../../../src/modules/Skills/repositories/IDepartmentRepository'
import IProjectsRepository from '../../modules/Projects/repositories/IProjectsRepository'
import ProjectsRepository from '../../modules/Projects/infra/typeorm/repositories/ProjectsRepository'
import ProjectsResourcesRepository from '../../modules/Projects/infra/typeorm/repositories/ProjectsResourcesRepository'
import IProjectsResourcesRepository from '../../modules/Projects/repositories/IProjectsResourcesRepository'
import INotificationsRepository from '../../modules/Notifications/repositories/INotificationsRepository'
import NotificationsRepository from '../../modules/Notifications/infra/typeorm/repositories/NotificationsRepository'
import TypesRepository from '../../modules/Resources/infra/typeorm/repositories/TypesRepository'
import ITypesRepository from '../../modules/Resources/repositories/ITypesRepository'
import ISubstatusRepository from '../../modules/Resources/repositories/ISubstatusRepository'
import SubstatusRepository from '../../modules/Resources/infra/typeorm/repositories/SubstatusRepository'
import IStatusResourceRepository from '../../modules/Resources/repositories/IStatusResourceRepository'
import StatusResourceRepository from '../../modules/Resources/infra/typeorm/repositories/StatusResourceRepository'
import IResourceStatusRepository from '../../modules/Resources/repositories/IResourceStatusRepository'
import ResourceStatusRepository from '../../modules/Resources/infra/typeorm/repositories/ResourceStatusRepository'
import ClassificationsRepository from '../../modules/Resources/infra/typeorm/repositories/ClassificationsRepository'
import IClassificationsRepository from '../../modules/Resources/repositories/IClassificationsRepository'
import ResourcesClassificationsRepository from '../../modules/Resources/infra/typeorm/repositories/ResourcesClassificationsRepository'
import IResourcesClassificationsRepository from '../../modules/Resources/repositories/IResourcesClassificationsRepository'
import ProjectsHistoricRepository from '../../modules/Projects/infra/typeorm/repositories/ProjectsHistoricRepository'
import IProjectsHistoricRepository from '../../modules/Projects/repositories/IProjectsHistoricRepository'
import IVersionNotesRepository from '../../modules/VersionNotes/repositories/IVersionNotesRepository'
import VersionNotesRepository from '../../modules/VersionNotes/infra/typeorm/repositories/VersionNotesRepository'
import FeedbacksRepository from '../../modules/Feedbacks/infra/typeorm/repositories/FeedbacksRepository'
import IFeedbacksRepository from '../../modules/Feedbacks/repositories/IFeedbacksRepository'
import IResourcesSkillsRepository from '../../modules/Resources/repositories/IResourcesSkillsRepository'
import ResourcesSkillsRepository from '../../modules/Resources/infra/typeorm/repositories/ResourcesSkillsRepository'
import ResourcesHistoricRepository from '../../modules/Resources/infra/typeorm/repositories/ResourcesHistoricRepository'
import IResourcesHistoricRepository from '../../modules/Resources/repositories/IResourcesHistoricRepository'
import IResourceProjectsHistoricRepository from '../../modules/Resources/repositories/IResourceProjectsHistoricRepository'
import ResourceProjectsHistoricRepository from '../../modules/Resources/infra/typeorm/repositories/ResourceProjectsHistoricRepository'
import ClientCredentialsRepository from '../../modules/ClientCredentials/infra/typeorm/repositories/ClientCredentialsRepository'
import IRoomsRepository from '../../modules/Rooms/repositories/IRoomsRepository'
import RoomsRepository from '../../modules/Rooms/infra/typeorm/repositories/RoomsRepository'
import IRoomsResourcesWeekdaysRepository from '../../modules/WorkSchedule/repositories/IRoomsResourcesWeekdaysRepository'
import RoomsResourcesWeekdaysRepository from '../../modules/WorkSchedule/infra/typeorm/repositories/RoomsResourcesWeekdaysRepository'
import SchedulesObservationsRepository from '../../modules/WorkSchedule/infra/typeorm/repositories/SchedulesObservationsRepository'
import SchedulesPendingRepository from '../../modules/WorkSchedule/infra/typeorm/repositories/SchedulesPendingRepository'
import ISchedulesObservationsRepository from '../../modules/WorkSchedule/repositories/ISchedulesObservationsRepository'
import ISchedulesPendingRepository from '../../modules/WorkSchedule/repositories/ISchedulesPendingRepository'
import { OneOnOneRepository } from '../../modules/OneOnOne/infra/typeorm/repositories/OneOnOneRepository'
import { IOneOnOneRepository } from '../../modules/OneOnOne/repositories/IOneOnOneRepository'

import { IClientCredentialsRepository } from '../../modules/ClientCredentials/repositories/IClientCredentialsRepository'
import DraftsRoomsResourcesWeekdaysRepository from '../../modules/WorkSchedule/infra/typeorm/repositories/DraftsRoomsResourcesWeekdaysRepository'
import IDraftsRoomsResourcesWeekdaysRepository from '../../modules/WorkSchedule/repositories/IDraftsRoomsResourcesWeekdaysRepository'
import DraftLeadersRoomsWeekdaysRepository from '../../modules/WorkSchedule/infra/typeorm/repositories/DraftLeadersRoomsWeekdaysRepository'
import IDraftLeadersRoomsWeekdaysRepository from '../../modules/WorkSchedule/repositories/IDraftLeadersRoomsWeekdaysRepository'


container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepository)
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IPermissionsRepository>('PermissionsRepository', PermissionsRepository)
container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository)
container.registerSingleton<IResourcesRepository>('ResourcesRepository', ResourcesRepository)
container.registerSingleton<ISkillsRepository>('SkillsRepository', SkillsRepository)
container.registerSingleton<ISkillsPendingRepository>('SkillsPendingRepository', SkillsPendingRepository)
container.registerSingleton<ISkillsDepartmentsRepository>('SkillsDepartmentsRepository', SkillsDepartmentsRepository)
container.registerSingleton<IDepartmentRepository>('DepartmentRepository', DepartmentRepository)
container.registerSingleton<IProjectsRepository>('ProjectsRepository', ProjectsRepository)
container.registerSingleton<IProjectsResourcesRepository>('ProjectsResourcesRepository', ProjectsResourcesRepository)
container.registerSingleton<INotificationsRepository>('NotificationsRepository', NotificationsRepository)
container.registerSingleton<ITypesRepository>('TypesRepository', TypesRepository)
container.registerSingleton<ISubstatusRepository>('SubstatusRepository', SubstatusRepository)
container.registerSingleton<IStatusResourceRepository>('StatusResourceRepository', StatusResourceRepository)
container.registerSingleton<IResourceStatusRepository>('ResourceStatusRepository', ResourceStatusRepository)
container.registerSingleton<IClassificationsRepository>('ClassificationsRepository', ClassificationsRepository)
container.registerSingleton<IResourcesClassificationsRepository>('ResourcesClassificationsRepository', ResourcesClassificationsRepository)
container.registerSingleton<IProjectsHistoricRepository>('ProjectsHistoricRepository', ProjectsHistoricRepository)
container.registerSingleton<IVersionNotesRepository>('VersionNotesRepository', VersionNotesRepository)
container.registerSingleton<IFeedbacksRepository>('FeedbacksRepository', FeedbacksRepository)
container.registerSingleton<IResourcesSkillsRepository>('ResourcesSkillsRepository', ResourcesSkillsRepository)
container.registerSingleton<IResourcesHistoricRepository>('ResourcesHistoricRepository', ResourcesHistoricRepository)
container.registerSingleton<IResourceProjectsHistoricRepository>('ResourceProjectsHistoricRepository', ResourceProjectsHistoricRepository)
container.registerSingleton<IClientCredentialsRepository>('ClientCredentialsRepository', ClientCredentialsRepository)
container.registerSingleton<IRoomsRepository>('RoomsRepository', RoomsRepository)
container.registerSingleton<IRoomsResourcesWeekdaysRepository>('RoomsResourcesWeekdaysRepository', RoomsResourcesWeekdaysRepository)
container.registerSingleton<ISchedulesObservationsRepository>('SchedulesObservationsRepository', SchedulesObservationsRepository)
container.registerSingleton<ISchedulesPendingRepository>('SchedulesPendingRepository', SchedulesPendingRepository)
container.registerSingleton<IDraftsRoomsResourcesWeekdaysRepository>('DraftsRoomsResourcesWeekdaysRepository', DraftsRoomsResourcesWeekdaysRepository)
container.registerSingleton<IDraftLeadersRoomsWeekdaysRepository>('DraftLeadersRoomsWeekdaysRepository', DraftLeadersRoomsWeekdaysRepository)
container.registerSingleton<IOneOnOneRepository>('OneOnOneRepository', OneOnOneRepository)
