import { api } from "../../../services/api"

export async function loadSchedules(resourceId: number, {
    setSchedules
}: {
    setSchedules: any,
}) {
    try {
        const response = await api.get(`/resources/${resourceId}/schedules`)
        setSchedules(response.data)
    } catch (error) {
        console.log("Erro ao carregar os agendamentos do recurso:", error)
    }
}