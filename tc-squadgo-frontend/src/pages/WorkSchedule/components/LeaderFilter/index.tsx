import * as S from './styles'
import { Avatar, Flex, Text } from "@chakra-ui/react"
import { memo, useEffect, useState } from "react"
import { api } from "../../../../services/api"
import { Day, LeaderFilterProps, Room } from './interface'
import DayWeek from "../DayWeek"

function LeaderFilter({ selectedOption, checkbox }: LeaderFilterProps) {
  const [data, setData] = useState<Day[]>([])
  const [homeOfficeDays, setHomeOfficeDays] = useState<string[]>([])
  const [showHomeOffice, setShowHomeOffice] = useState(false)

  const filteredRooms: { room: Room; day: string }[] = data.reduce(
    (filtered: { room: Room; day: string }[], day) => {
      const dayRooms = day.rooms.filter((room) =>
        room.resources.some((resource) => resource.name === selectedOption)
      )
      dayRooms.forEach((room) => {
        filtered.push({
          room,
          day: day.day
        })
      })
      return filtered
    },
    []
  )

  const selectedOptionFirstTwoWords = selectedOption.split(" ").slice(0, 2).join(" ")

  useEffect(() => {
    setShowHomeOffice(checkbox)
  }, [checkbox])

  useEffect(() => {
    async function loadRooms() {
      const response = await api.get("/resource-room-to-day-of-week")
      const responseData: Day[] = response.data

      const data: Day[] = responseData.map((item: any) => ({
        id: item.id,
        day: item.day,
        rooms: item.rooms.map((room: any) => ({
          id: room.id,
          name: room.name,
          seats: room.seats,
          resources: room.resources.map((resource: any) => ({
            id: resource.id,
            name: resource.name,
            photo_url: resource.photo_url,
            leader: resource.leader,
          })),
        })),
      }))

      setData(data)

      const homeOfficeDays: string[] = data.reduce((days: string[], day) => {
        const hasHomeOfficeRoom = day.rooms.some((room) =>
          room.resources.some((resource) => resource.name === selectedOption &&
            room.name === "Home-office"))
        if (hasHomeOfficeRoom) {
          days.push(day.day)
        }
        return days
      }, [])

      setHomeOfficeDays(homeOfficeDays)
    }

    loadRooms()
  }, [selectedOption])

  return (
    <Flex flexDir='column' flex='1' marginTop='-50px'>
      <Flex pos='relative' right='20px'>
        {selectedOption && (
          <Avatar
            pos='relative'
            top='15px'
            height={50}
            width={50}
            src={
              filteredRooms.length > 0 && filteredRooms[0].room.resources.length > 0
                ? "https://equipes.s3.us-west-2.amazonaws.com/resources_photos/" +
                filteredRooms[0].room.resources.find(
                  (resource) => resource.name === selectedOption
                )?.photo_url
                : undefined
            }
            zIndex={1}
          />
        )}
        <S.ContainerLeaderHorizontal>
          <Text fontSize='14px' ml='25px' color='white'>
            {selectedOptionFirstTwoWords} - Líder
          </Text>
        </S.ContainerLeaderHorizontal>
      </Flex>
      <S.SingleContainerHorizontal>
        <Flex>
          <Text fontSize='12px' color='#990000' mb='45px'>
            Home-Office:
          </Text>
          {homeOfficeDays.length > 0 && (
            <Text fontSize='12px' color='#990000' mb='45px'>
              {homeOfficeDays.join(", ")}
            </Text>
          )}
        </Flex>
        <Flex flexDir='row' justifyContent='space-evenly' width='100%'>
          {filteredRooms.map(({ room, day }) => {
            if (room.name !== "Home-office") {
              return (
                <DayWeek
                  key={room.id}
                  roomName={room.name}
                  seats={room.seats}
                  filled={room.resources.length}
                  resources={room.resources}
                  nameDayOfWeek={day}
                  homeOffice={showHomeOffice}
                />
              );
            } else if (room.name === "Home-office" && showHomeOffice) {
              return (
                <DayWeek
                  key={room.id}
                  roomName={room.name}
                  seats={room.seats}
                  filled={room.resources.length}
                  resources={room.resources}
                  nameDayOfWeek={day}
                  homeOffice={true}
                  visibleCount={true}
                  visibleSeats={true}
                />
              );
            } else {
              return null
            }
          })}
        </Flex>
      </S.SingleContainerHorizontal>
    </Flex>
  )
}

export default memo(LeaderFilter)