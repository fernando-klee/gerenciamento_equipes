import * as S from "./styles"
import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { api } from "../../../../services/api"
import { useAuth } from "../../../../context/AuthContext"
import { Day, Room, WeekendDaysProps } from "./interface"
import DayWeekCircle from "../DayWeekCircle"
import { weekdaysArray } from "../../functions/WeekdaysArray"
import { roomsArray } from "../../functions/RoomsArray"

export function WeekendDays({ checkbox }: WeekendDaysProps) {
    const { user } = useAuth()

    const [data, setData] = useState<Day[]>([])
    const [showHomeOffice, setShowHomeOffice] = useState(false)
    const [loadingSchedule, setLoadingSchedule] = useState(true)
    const [overallLoading, setOverallLoading] = useState(true)

    function FormattedData(dayData: Day, roomsArray: Room[]): JSX.Element[] {
        const excludedUserIds = [28, 30, 38, 39, 45, 47, 48, 81]

        return roomsArray
            .filter((room) => {
                const roomInfo = dayData.rooms.find((dataRoom) => dataRoom.name === room.name)
                const resources = roomInfo?.resources || []

                if (excludedUserIds.includes(user.id)) {
                    return resources.some((resource) => resource.id)
                } else {
                    return resources.some((resource) => resource.id === user.id)
                }
            })
            .map((room) => {
                const roomInfo = dayData.rooms.find((dataRoom) => dataRoom.name === room.name)
                const resources = roomInfo?.resources || []
                const leaders = roomInfo?.leaders || []

                return (
                    <DayWeekCircle
                        leaders={leaders}
                        key={room.id}
                        resources={resources}
                        roomName={room.name}
                        seats={room.seats.toString()}
                        filled={resources.length || 0}
                        homeOffice={showHomeOffice}
                    />
                )
            })
    }

    useEffect(() => {
        setOverallLoading(loadingSchedule)
    }, [loadingSchedule])

    useEffect(() => {
        setShowHomeOffice(checkbox)
    }, [checkbox])

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

                setData(mappedData)
            } catch (error) {
                console.error("Error while fetching data:", error)
            } finally {
                setLoadingSchedule(false)
            }
        }

        loadSchedule()
    }, [])

    return (
        <Flex flex="1" ml="25px" justifyContent='center'>
            {overallLoading ? (
                <Spinner size='xl' />
            ) : (
                <>
                    {weekdaysArray.map((weekday) => (
                        <Flex flex={1} key={weekday.id}>
                            <S.SingleContainer>
                                <S.ContainerDay>
                                    <Text fontSize="14px" color="white">
                                        {weekday.name}
                                    </Text>
                                </S.ContainerDay>
                                <Flex flexDir="column" gap="20px">
                                    {FormattedData(
                                        data.find((dayData) => dayData.name === weekday.name) || {
                                            id: 0,
                                            name: weekday.name,
                                            rooms: [],
                                        },
                                        roomsArray
                                    )}
                                </Flex>
                            </S.SingleContainer>
                        </Flex>
                    ))}
                </>
            )}
        </Flex>
    )
}