import { api } from "../../../services/api"

export async function handleConfirmClearResources() {
    try {
        await api.delete('/resource-room-to-day-of-week/deleteAll')
        window.location.reload()
    } catch (error) {
        console.error(error)
    }
}