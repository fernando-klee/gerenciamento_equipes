import { Day, PayloadEntry } from "../interface"

export const onRemoveInfoSchedule = (infoSchedule: string, {
    payloadArray,
    setPayloadArray,
    setDaysOfWeek,
    setLoggedIds
}: {
    payloadArray: PayloadEntry[]
    setPayloadArray: any
    setDaysOfWeek: any,
    setLoggedIds: any
}) => {
    const parts = infoSchedule.split('-')
    const id = parseInt(parts[0].replace('id:', ''))
    const room = parseInt(parts[1].replace('sala:', ''))
    const day = parseInt(parts[2].replace('dia:', ''))
    const idSchedule = parseInt(parts[3].replace('idEscala:', ''))
    const resourceIdDelete = parseInt(parts[4].replace('colaborador:', ''))

    if (!isNaN(idSchedule)) {
        setLoggedIds((prevIds: any) => ([...prevIds, { idSchedule, resourceIdDelete }]))
    }

    const entryToRemoveIndex = payloadArray.findIndex(
        entry =>
            entry.week_day === day &&
            entry.room_id === room &&
            entry.resource_id === id
    )

    if (entryToRemoveIndex !== -1) {
        const newPayloadArray = [...payloadArray]
        newPayloadArray.splice(entryToRemoveIndex, 1)
        setPayloadArray(newPayloadArray)

        setDaysOfWeek((prevDays: Day[]) => {
            return prevDays.map(prevDay => {
                if (prevDay.id === day) {
                    const updatedRooms = prevDay.rooms.map(prevRoom => {
                        if (prevRoom.id === room) {
                            const updatedResources = (prevRoom.resources || []).filter(resource => resource.id !== id)
                            return { ...prevRoom, resources: updatedResources }
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