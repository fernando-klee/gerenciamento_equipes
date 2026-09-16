import { api } from "../../../../../services/api"
import { PayloadEntry } from "../interface"

export async function handleSendSchedule(
    loggedIds: any,
    allResources: any,
    resourcesInRoom: any,
    payloadArray: PayloadEntry[]
) {
    const sendButton = document.getElementById('sendButton') as HTMLButtonElement

    if (sendButton) {
        sendButton.disabled = true
    }

    const deletePayload = {
        data: loggedIds.map((entry: any) => ({
            resource_id: entry.resourceIdDelete,
            room_resource_weekday_id: entry.idSchedule,
        })),
    }

    await api.delete('/resource-room-to-day-of-week', { data: deletePayload })

    try {
        if (!Array.isArray(allResources) || !Array.isArray(resourcesInRoom)) {
            console.error("Invalid data received")
            return
        }

        const currentMonth = new Date().getMonth() + 2
        const daysOfWeek = [1, 2, 3, 4, 5]

        const availableResources = allResources.filter((resource: { status: string }) => resource.status === 'DISPONIVEL')

        const resourcesInRoomsIds = resourcesInRoom.map((entry: any) =>
            entry.rooms.flatMap((room: any) => room.resources.map((resource: any) => resource.id))
        )

        const selectedResources: any[] = []
        const resourcesToAddToRoom10: any[] = []

        daysOfWeek.forEach((day: number) => {
            const selectedResourcesForDay = payloadArray.filter((entry: any) => entry.week_day === day && entry.room_id !== 10)
            const resourcesToAddToRoom10ForDay = availableResources
                .filter((resource: { id: any }) =>
                    !selectedResourcesForDay.find((entry: any) => entry.resource_id === resource.id) &&
                    !resourcesInRoomsIds[day - 1].includes(resource.id)
                )
                .map((resource: any) => ({
                    week_day: day,
                    room_id: 10,
                    month: currentMonth,
                    resource_id: resource.id,
                }))

            selectedResources.push(...selectedResourcesForDay)
            resourcesToAddToRoom10.push(...resourcesToAddToRoom10ForDay)
        })

        const apiPayload = {
            data: [
                ...selectedResources,
                ...resourcesToAddToRoom10,
            ],
        }

        await api.post('/resource-room-to-day-of-week/schedule', apiPayload)

        window.location.reload()
    } catch (error) {
        console.error("Error while sending schedule:", error)
    }
}