import { Day, PayloadEntry, Resource } from "../interface"

export const onInfoScheduleChange = (infoSchedule: string, {
    payloadArray,
    setPayloadArray,
    setDaysOfWeek,
    resourcesData
}: {
    payloadArray: PayloadEntry[]
    setPayloadArray: any
    setDaysOfWeek: any
    resourcesData: Resource[]
}) => {
    const parts = infoSchedule.split('-')
    const id = parseInt(parts[0].replace('id:', ''))
    const room = parseInt(parts[1].replace('sala:', ''))
    const day = parseInt(parts[2].replace('dia:', ''))

    const currentMonth = new Date().getMonth() + 1

    const payloadEntry = {
        week_day: day,
        room_id: room,
        month: currentMonth,
        resource_id: id,
    }

    const existingEntryIndex = payloadArray.findIndex(
        entry =>
            entry.week_day === payloadEntry.week_day &&
            entry.room_id === payloadEntry.room_id &&
            entry.resource_id === payloadEntry.resource_id
    )

    if (existingEntryIndex === -1) {
        const newPayloadArray = [...payloadArray, payloadEntry]
        setPayloadArray(newPayloadArray)

        setDaysOfWeek((prevDays: Day[]) => {
            return prevDays.map(prevDay => {
                if (prevDay.id === day) {
                    const updatedRooms = prevDay.rooms.map(prevRoom => {
                        if (prevRoom.id === room) {
                            if (!prevRoom.resources?.some(resource => resource.id === id)) {
                                const selectedResource = resourcesData.find(resource => resource.id === id)
                                if (selectedResource) {
                                    const updatedResources = [...(prevRoom.resources || []), selectedResource]
                                    return { ...prevRoom, resources: updatedResources }
                                }
                            }
                        }
                        return prevRoom
                    })
                    return { ...prevDay, rooms: updatedRooms }
                }
                return prevDay
            })
        })

    }
}