import { inject, injectable } from 'tsyringe'
import IRoomsResourcesWeekdaysRepository from '../repositories/IRoomsResourcesWeekdaysRepository'
import WeekdayDoesNotExistException from '../../../shared/infra/exceptions/WeekdayDoesNotExistException'
import RoomsResourcesWeekdays from '../infra/typeorm/entities/RoomsResourcesWeekdays'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import IRoomsRepository from '../../Rooms/repositories/IRoomsRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import RoomNotFoundException from '../../../shared/infra/exceptions/RoomNotFoundException'
import MonthDoesNotExistException from '../../../shared/infra/exceptions/MonthDoesNotExistException'
import ISendMail from '../../../shared/providers/mailProvider/interfaces/ISendMail'
import mailConfig from '../../../config/mailConfig'


@injectable()
export default class SendScheduleMailService {
	constructor(
		@inject('RoomsResourcesWeekdaysRepository')
		private roomsResourcesWeekdaysRepository: IRoomsResourcesWeekdaysRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('MailProvider')
		private mailProvider: ISendMail,

		@inject('RoomsRepository')
		private roomsRepository: IRoomsRepository,
	) { }

	async execute() {
		function getDayName(weekDay: number): string {
			switch (weekDay) {
				case 1:
					return 'Segunda-feira'
				case 2:
					return 'Terça-feira'
				case 3:
					return 'Quarta-feira'
				case 4:
					return 'Quinta-feira'
				case 5:
					return 'Sexta-feira'
				default:
					throw new WeekdayDoesNotExistException()
			}
		}

		function getMonthName(month: number): string {
			switch (month) {
				case 1:
					return 'Janeiro'
				case 2:
					return 'Fevereiro'
				case 3:
					return 'Março'
				case 4:
					return 'Abril'
				case 5:
					return 'Maio'
				case 6:
					return 'Junho'
				case 7:
					return 'Julho'
				case 8:
					return 'Agosto'
				case 9:
					return 'Setembro'
				case 10:
					return 'Outubro'
				case 11:
					return 'Novembro'
				case 12:
					return 'Dezembro'
				default:
					throw new MonthDoesNotExistException()
			}
		}

		function sortDays(days: string[]): string[] {
			const daysMap: Record<string, number> = {
				'Segunda-feira': 1,
				'Terça-feira': 2,
				'Quarta-feira': 3,
				'Quinta-feira': 4,
				'Sexta-feira': 5,
			}

			return days.sort((a, b) => daysMap[a] - daysMap[b])
		}

		const scheduleResource = await this.roomsResourcesWeekdaysRepository.list()

		const emailData: Record<number, { rooms: string[]; days: string[]; month: string }> = {}

		for (const { resource_id, room_id, week_day, month } of scheduleResource) {
			if (resource_id === 84) {
				continue
			}

			if (!emailData[resource_id]) {
				emailData[resource_id] = {
					rooms: [],
					days: [],
					month: getMonthName(month),
				}
			}

			const roomInfo = await this.roomsRepository.findById(room_id)
			if (!roomInfo) throw new RoomNotFoundException()

			const dayName = getDayName(week_day)

			emailData[resource_id].days.push(`${dayName}: ${roomInfo.name}`)
		}

		for (const resource_id in emailData) {
			const resourceData = emailData[resource_id]

			resourceData.days = sortDays(resourceData.days)

			const resource = await this.resourcesRepository.findById(Number(resource_id))
			if (!resource) throw new ResourceNotFoundException()

			this.mailProvider.sendEmail({
				from: mailConfig.from,
				to: {
					address: resource.email,
					name: resource.name,
				},
				subject: `Escala do mês de ${resourceData.month}`,
				variables: {
					email: resource.email,
					name: resource.name,
					month: resourceData.month,
					days: resourceData.days,
				},
				template: 'SendScheduleTemplate.hbs',
			})
		}
	}
}
