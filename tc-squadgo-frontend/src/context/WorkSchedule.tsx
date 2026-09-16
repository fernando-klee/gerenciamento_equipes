import React, { createContext, useEffect, useState } from "react"
import { api } from "../services/api"
import { Day } from "../pages/WorkSchedule/components/CreateSchedule/interface"

export interface Resource {
    id: number
    name: string
    photo_url: string
    status?: string
}

interface WorkScheduleContextType {
    read: {
        data: Resource[]
        roomName: string[]
        resources: Resource[]
        resourcesFiltered: Resource[]
        days: any
        schedules: any
        filteredOptions: Resource[]
        allResources: any
        resourcesInRoom: any
        loadingResources: boolean
        resourcesLeaderData: Resource[]
        daysOfWeek: Day[]
        loadingSchedule: boolean
    },
    write: {
        setSchedules: any
        setFilteredOptions: any
        setDaysOfWeek: any
    }
}

interface WorkScheduleProvider {
    children: React.ReactNode
}

export const WorkScheduleContext = createContext({} as WorkScheduleContextType)

export function WorkScheduleProvider({ children }: WorkScheduleProvider) {
    const [data, setData] = useState<Resource[]>([])
    const [roomName, setRoomName] = useState<string[]>([])
    const [resources, setResources] = useState<Resource[]>([])
    const [resourcesFiltered, setResourcesFiltered] = useState<Resource[]>([])
    const [days, setDay] = useState()
    const [schedules, setSchedules] = useState([])
    const [filteredOptions, setFilteredOptions] = useState<Resource[]>([])
    const [allResources, setAllResources] = useState([])
    const [resourcesInRoom, setResourcesInRoom] = useState([])
    const [loadingResources, setLoadingResources] = useState(true)
    const [resourcesLeaderData, setResourcesLeader] = useState<Resource[]>([])
    const [daysOfWeek, setDaysOfWeek] = useState<Day[]>([])
    const [loadingSchedule, setLoadingSchedule] = useState(true)

    useEffect(() => {
        async function loadRooms() {
            try {
                const response = await api.get("/resource-room-to-day-of-week")
                const responseData = response.data

                setData(responseData)
            } catch (error) {
                console.error('Error while fetching data:', error)
            }
        }

        loadRooms()
    }, [])

    useEffect(() => {
        async function loadRoomsName() {
            try {
                const response = await api.get("/rooms")
                const responseData = response.data

                const roomNames = responseData.map((item: any) => item.name)

                setRoomName(roomNames)
            } catch (error) {
                console.log("Não foi possível carregar as salas")
            }
        }

        loadRoomsName()
    }, [])

    useEffect(() => {
        async function loadResources() {
            try {
                const { data } = await api.get('/resources')

                const activeResources = data.filter((resource: any) => {
                    return resource.resourceStatus.status.name !== "INATIVO"
                })

                setResources(activeResources)
                setResourcesFiltered(activeResources)
            } catch (error) {
                console.error('Error while fetching data:', error)
            }
        }

        loadResources()
    }, [])

    useEffect(() => {
        async function loadWeekdaysAndRooms() {
            const { data } = await api.get('/resource-room-to-day-of-week')
            const days = data.map((item: { day: any }) => item.day)

            setDay(days)

        }
        loadWeekdaysAndRooms()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allResourcesResponse = await api.get('/resources')
                const resourcesInRoomResponse = await api.get('/resource-room-to-day-of-week')

                setAllResources(allResourcesResponse.data)
                setResourcesInRoom(resourcesInRoomResponse.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        async function loadResources() {
            try {
                const response = await api.get('/resources/actives')
                const responseData: Resource[] = response.data

                setResources(responseData)
            } catch (error) {
                console.error("Error while fetching data:", error)
            } finally {
                setLoadingResources(false)
            }
        }

        loadResources()
    }, [])

    useEffect(() => {
        async function loadResourcesLeader() {
            try {
                const response = await api.get('/resources/responsibles')
                const responseData: Resource[] = response.data

                const filteredResources = responseData.filter(resource => resource.status !== "INATIVO")

                setResourcesLeader(filteredResources)
            } catch (error) {
                console.error("Error while fetching data:", error)
            }
        }

        loadResourcesLeader()
    }, [])

    useEffect(() => {
        async function loadSchedule() {
            try {
                const response = await api.get("/resource-room-to-day-of-week")
                const responseData: Day[] = response.data

                const mappedData: Day[] = responseData.map((item) => ({
                    id: item.id,
                    name: item.name,
                    rooms: item.rooms?.map((room) => ({
                        id: room.id,
                        name: room.name,
                        seats: room.seats ?? 0,
                        leaders: room.leaders || [],
                        resources: room.resources || [],
                    })) || [],
                }))

                setDaysOfWeek(mappedData)
            } catch (error) {
                console.error("Error while fetching data:", error)
            } finally {
                setLoadingSchedule(false)
            }
        }

        loadSchedule()
    }, [])

    return (
        <WorkScheduleContext.Provider
            value={{
                read: {
                    data,
                    roomName,
                    resources,
                    resourcesFiltered,
                    days,
                    schedules,
                    filteredOptions,
                    allResources,
                    resourcesInRoom,
                    loadingResources,
                    resourcesLeaderData,
                    daysOfWeek,
                    loadingSchedule
                },
                write: {
                    setSchedules,
                    setFilteredOptions,
                    setDaysOfWeek
                }
            }}
        >
            {children}
        </WorkScheduleContext.Provider>
    )
}