import * as S from './styles'
import { Avatar, Flex, Text } from "@chakra-ui/react"
import { DayWeekProps } from "./Interface"
import { memo } from 'react'

function DayWeek({
  nameDayOfWeek,
  seats,
  filled,
  homeOffice,
  roomName,
  resources,
  visibleCount
}: DayWeekProps) {
  let emptySeats = 0

  if (seats !== undefined) {
    emptySeats = Math.max(seats - filled, 0)
  }

  return (
    <>
      <Flex justifyContent='space-between' alignItems='center' flexDir='column'>
        <Flex justifyContent='space-between' w='100%'>
          <Text
            fontSize='15px'
          >
            {nameDayOfWeek}
          </Text>
          <Flex alignItems='center'>
            <Flex>
              {homeOffice && roomName === "Home-office" ? (
                <Text color='red'>{roomName}</Text>
              ) : (
                <Text>{roomName}</Text>
              )}
              {!visibleCount ? (
                <Text
                  color='#B4B4B4'
                >
                  ({filled}/{seats})
                </Text>
              ) : (
                <></>
              )}
            </Flex>
          </Flex>
        </Flex>
        <S.ContainerRoom>
          {resources.map((resource) => (
            <Avatar
              key={resource.id}
              height={22}
              width={22}
              name={resource.name}
              src={"https://equipes.s3.us-west-2.amazonaws.com/resources_photos/" + resource.photo_url}
            />
          ))}
        </S.ContainerRoom>
      </Flex>
    </>
  )
}

export default memo(DayWeek)