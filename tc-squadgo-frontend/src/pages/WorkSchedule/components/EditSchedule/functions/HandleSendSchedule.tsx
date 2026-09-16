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

        const daysOfWeek = [1, 2, 3, 4, 5]

        const selectedResources: any[] = []
        const resourcesToAddToRoom10: any[] = []

        daysOfWeek.forEach((day: number) => {
            const selectedResourcesForDay = payloadArray.filter((entry: any) => entry.week_day === day && entry.room_id !== 10)

            selectedResources.push(...selectedResourcesForDay)
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