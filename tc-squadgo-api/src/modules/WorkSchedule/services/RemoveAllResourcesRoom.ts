import { inject, injectable } from 'tsyringe'

import IRoomsResourcesWeekdaysRepository from '../repositories/IRoomsResourcesWeekdaysRepository'

@injectable()
export default class RemoveAllResourcesRoom {
    constructor(
        @inject('RoomsResourcesWeekdaysRepository')
        private roomsResourcesWeekdaysRepository: IRoomsResourcesWeekdaysRepository,
    ) {}

    async execute() {
        const resourcesToKeep = await this.roomsResourcesWeekdaysRepository.findByResourceId(84)

        if (!resourcesToKeep) {
            await this.roomsResourcesWeekdaysRepository.deleteAll()
        } else {
            const allResources = await this.roomsResourcesWeekdaysRepository.list()
            const resourcesToDelete = allResources.filter(
                (resource) => resource.resource_id !== 84
            )

            for (const resource of resourcesToDelete) {
                await this.roomsResourcesWeekdaysRepository.deleteById(
                    resource.resource_id,
                    resource.id
                )
            }
        }
    }
}
