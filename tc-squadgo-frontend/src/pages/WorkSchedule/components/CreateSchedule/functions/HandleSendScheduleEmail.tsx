import { api } from "../../../../../services/api"
import { PayloadEntry } from "../interface"

export async function handleSendScheduleEmail(payloadArray: PayloadEntry[]) {
    try {
        const sendButtonEmail = document.getElementById('sendButtonEmail') as HTMLButtonElement

        if (sendButtonEmail) {
            sendButtonEmail.disabled = true
        }

        const apiPayload = {
            data: payloadArray.map(entry => ({
                week_day: entry.week_day,
                room_id: entry.room_id,
                month: 1,
                resource_id: entry.resource_id,
                sendMail: true
            })),
        }

        await api.post('/resource-room-to-day-of-week/mail', apiPayload)

        setTimeout(() => {
            window.location.reload()
        }, 1000)
    } catch (error) {
        console.error("Error while sending schedule:", error)
    }
}