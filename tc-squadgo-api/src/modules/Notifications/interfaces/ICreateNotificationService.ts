import IRequestNotificationDTO from '../dtos/IRequestNotificationDTO'

export default interface ICreateNotificationService {
	execute(data: IRequestNotificationDTO): Promise<void>
}
