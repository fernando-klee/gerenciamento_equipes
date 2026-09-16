import { inject, injectable } from 'tsyringe'
import RoomsResourcesWeekdays from '../infra/typeorm/entities/RoomsResourcesWeekdays'
import IRoomsResourcesWeekdaysRepository from '../repositories/IRoomsResourcesWeekdaysRepository'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import IRoomsRepository from '../../Rooms/repositories/IRoomsRepository'
import { instanceToInstance } from 'class-transformer'

interface Leader {
  id: number;
  resource_id?: number;
  name: string
  photo_url: string
}

interface Resource {
  id: number;
  name: string;
  photo_url: string;
  resourceStatus: any;
}

interface Room {
  id: number;
  name: string;
  leaders: Leader[];
  resources: Resource[];
}

interface DayData {
  id: number;
  name: string;
  rooms: Room[];
}

interface ExtendedResource extends Resource {
  roomResourceWeekdayId?: number;
}

@injectable()
export default class ListResourceRoomWeekdayService {
  constructor(
    @inject('RoomsResourcesWeekdaysRepository')
    private roomsResourcesWeekdaysRepository: IRoomsResourcesWeekdaysRepository,

    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,

    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) { }

  async execute(): Promise<DayData[]> {
    const roomsResources = await this.roomsResourcesWeekdaysRepository.list()

    const formatData = async (roomsResources: RoomsResourcesWeekdays[]): Promise<DayData[]> => {
      const formattedData: DayData[] = []

      const weekdayNames: { [key: string]: string } = {
        '1': 'Segunda-feira',
        '2': 'Terça-feira',
        '3': 'Quarta-feira',
        '4': 'Quinta-feira',
        '5': 'Sexta-feira'
      }

      await Promise.all(roomsResources.map(async (resource) => {
        const { id, room_id, week_day, resource_id, creator_id, month } = resource

        const idSchedule = await this.roomsResourcesWeekdaysRepository.findByResourceAndRoomIdAndMonthAndWeekday(resource_id, room_id, month, week_day)

        const dayName = weekdayNames[week_day.toString() as keyof typeof weekdayNames]

        let dayData = formattedData.find(data => data.name === dayName)
        if (!dayData) {
          dayData = {
            id: week_day,
            name: dayName,
            rooms: []
          }
          formattedData.push(dayData)
        }


        const roomName = (await this.roomsRepository.findById(room_id))?.name

        let roomData = dayData.rooms.find(room => room.id === room_id)
        if (!roomData) {
          roomData = {
            id: room_id,
            name: roomName ?? '',
            leaders: [],
            resources: []
          }
          dayData.rooms.push(roomData)
        }
        const resourceData = await this.resourcesRepository.findById(resource_id)

        const resourceFormatted = instanceToInstance(resourceData)

        if (resourceFormatted) {
          const { id, name, photo_url, resourceStatus } = resourceFormatted
          const extendedResource: ExtendedResource = {
            id,
            name,
            photo_url,
            roomResourceWeekdayId: idSchedule?.id,
            resourceStatus
          }


          roomData.resources.push(extendedResource)
        }
      }))

      return formattedData
    }

    const formattedData = await formatData(roomsResources)

    formattedData.forEach((dayData) => {
      dayData.rooms.forEach((roomData) => {
        roomData.leaders.sort((a, b) => a.id - b.id)
        roomData.resources.sort((a, b) => a.id - b.id)
      })

      dayData.rooms.sort((a, b) => a.id - b.id)
    })

    formattedData.sort((a, b) => a.id - b.id)

    return formattedData
  }
}
