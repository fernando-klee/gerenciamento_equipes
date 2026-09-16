import * as S from './styles'
import { Avatar, Flex, Text } from "@chakra-ui/react"
import { useAuth } from "../../../../context/AuthContext"
import { DayWeekCircleProps } from './interface'
import { memo } from 'react'

function DayWeekCircle({
    roomName,
    homeOffice,
    seats,
    filled,
    resources,
    leaders
}: DayWeekCircleProps) {
    let emptySeats = 0

    const filledUpdated = filled - 1
    const amountResources = resources.length - 1
    const amountLeaders = leaders.length
    const amountAllRoom = amountResources + amountLeaders

    if (seats !== undefined) {
        emptySeats = Math.max(seats - filledUpdated, 0)
    }

    const filteredResources = resources.filter(resource => resource.name !== "Tester")

    const isHomeOffice = roomName === 'Home-office'
    const showFilledSeats = !isHomeOffice

    const { user } = useAuth()
    const UserId = user.id
    const UserPermissions = user.permissions

    return (
        <>
            <Flex
                flexDir='column'
                gap='50px'
                style={{ display: !homeOffice && isHomeOffice ? 'none' : 'flex' }}
            >
                <Flex flexDir='column'>
                    <Flex display='flex' flexDir='row-reverse' position='relative'>
                        <Flex justifyContent='space-between' flexDir='row-reverse' gap='5px' width='100%'>
                            <Flex>
                                <Text
                                    color={isHomeOffice ? 'red' : undefined}
                                >
                                    {roomName}
                                </Text>
                                {showFilledSeats &&
                                    <Text
                                        color='#B4B4B4'
                                    >
                                        ({amountAllRoom}/{seats})
                                    </Text>}
                            </Flex>
                            <Flex top='15px' pos='relative'>
                                {roomName !== 'Home-office' && leaders ? (
                                    leaders.length === 0 ? (
                                        <></>
                                    ) : (
                                        <Flex>
                                            <></>
                                        </Flex>
                                    )
                                ) : (
                                    <></>
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                    <S.ContainerRoom>
                        {roomName !== 'Home-office' && (
                            <>
                                {filteredResources.map((resource) => (
                                    <>
                                        <Avatar
                                            key={resource.id}
                                            height={38}
                                            width={38}
                                            name={resource.name}
                                            src={resource.photo_url}
                                            title={resource.name}
                                        />
                                    </>
                                ))}
                                {Array.from({ length: emptySeats }).map((_, index) => (
                                    <Avatar
                                        key={index}
                                        height={22}
                                        width={22}
                                    />
                                ))}
                            </>
                        )}
                        {roomName === 'Home-office' && (
                            <>
                                {filteredResources
                                    .filter((resource) =>
                                        UserPermissions.includes('create_work_schedule') || resource.id === UserId
                                    )
                                    .map((resource) => (
                                        <Avatar
                                            key={resource.id}
                                            height={38}
                                            width={38}
                                            name={resource.name}
                                            src={resource.photo_url}
                                        />
                                    ))}
                            </>
                        )}
                    </S.ContainerRoom>
                </Flex>
            </Flex >
        </>
    )
}

export default memo(DayWeekCircle)