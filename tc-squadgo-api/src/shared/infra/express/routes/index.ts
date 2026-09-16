import { Router } from 'express'

import roleRoutes from '../../../../modules/Authorizations/infra/routes/roleRoutes'
import customerRoutes from '../../../../modules/Customers/infra/routes/CustomerRoutes'
import userRoutes from '../../../../modules/Accounts/infra/routes/UserRoutes'
import permissionRoutes from '../../../../modules/Authorizations/infra/routes/permissionRoutes'
import userPermissionsRoutes from '../../../../modules/Accounts/infra/routes/UserPermissionsRoutes'
import resourceRoutes from '../../../../modules/Resources/infra/routes/ResourceRoutes'
import projectRouter from '../../../../modules/Projects/infra/routes/ProjectRoutes'
import meRoutes from '../../../../modules/Accounts/infra/routes/MeRoutes'
import geralVisionRoutes from '../../../../modules/GeralVision/infra/routes/GeralVisionRoutes'
import notificationRoutes from '../../../../modules/Notifications/infra/routes/NotificationRoutes'
import typesRoutes from '../../../../modules/Resources/infra/routes/TypesRoutes'
import tempRoutes from '../../../../modules/Resources/infra/routes/TempRoutes'
import classificationRoutes from '../../../../modules/Resources/infra/routes/ClassificationRoutes'
import versionNotesRoutes from '../../../../modules/VersionNotes/infra/routes/versionNotesRoutes'
import skillRoutes from '../../../../modules/Skills/infra/routes/skillRoutes'
import skillsPendingRoutes from '../../../../modules/Skills/infra/routes/skillsPendingRoutes'
import feedbackRouter from '../../../../modules/Feedbacks/infra/routes/feedbackRouter'
import dashboardRoutes from '../../../../modules/Dashboard/infra/routes/dashboardRoutes'
import clientCredentialRoutes from '../../../../modules/ClientCredentials/infra/routes/ClientCredentialsRoutes'
import workScheduleRoutes from '../../../../modules/WorkSchedule/infra/routes/WorkSchedule'
import resourceRoomToDayOfWeekRoutes from '../../../../modules/WorkSchedule/infra/routes/ResourceRoomToDayOfWeekRoutes'
import roomsRoutes from '../../../../modules/Rooms/infra/routes/RoomsRoutes'
import scheduleObservationRoutes from '../../../../modules/WorkSchedule/infra/routes/ScheduleObservation'
import schedulePendingRoutes from '../../../../modules/WorkSchedule/infra/routes/SchedulePending'
import draftResourceRoomToDayOfWeekRoutes from '../../../../modules/WorkSchedule/infra/routes/DraftsRoomsResourcesWeekdays'
import oneOnOneRouter from '../../../../modules/OneOnOne/infra/routes/oneOnOneRouter'

const router = Router()

router.use('/temp', tempRoutes)

router.use('/me', meRoutes)

router.use('/notifications', notificationRoutes)
router.use('/user-permissions', userPermissionsRoutes)

router.use('/dashboard', dashboardRoutes)
router.use('/geral-vision', geralVisionRoutes)
router.use('/version-notes', versionNotesRoutes)
router.use('/users', userRoutes)
router.use('/types', typesRoutes)
router.use('/classifications', classificationRoutes)
router.use('/skills', skillRoutes)
router.use('/skillsPending', skillsPendingRoutes)
router.use('/customers', customerRoutes)
router.use('/feedbacks', feedbackRouter)
router.use('/resources', resourceRoutes)
router.use('/projects', projectRouter)
router.use('/roles', roleRoutes)
router.use('/permissions', permissionRoutes)
router.use('/work-schedule', workScheduleRoutes)
router.use('/resource-room-to-day-of-week', resourceRoomToDayOfWeekRoutes)
router.use('/rooms', roomsRoutes)
router.use('/schedule-observation', scheduleObservationRoutes)
router.use('/schedule-pending', schedulePendingRoutes)
router.use('/one-on-one', oneOnOneRouter)

router.use('/draft-resource-room-to-day-of-week', draftResourceRoomToDayOfWeekRoutes)

router.use('/auth', clientCredentialRoutes)

export default router
