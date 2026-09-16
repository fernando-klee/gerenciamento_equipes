import { Flex, Text } from "@chakra-ui/react";

import * as S from "./styles";
import { useEffect, useState } from "react";
import RoomItem from "../components/RoomItem";

interface Props {
  data: Day[];
  checkbox: boolean;
  allResources: Resource[];
  onUpdateInfoInParent: (infoSchedule: string) => void;
  onInfoScheduleChange: (infoSchedule: string) => void;
  onRemoveInfoSchedule: (infoSchedule: string) => void;
}

interface Day {
  id: number;
  name: string;
  rooms: Room[];
}

interface Room {
  id: number;
  name: string;
  seats: number;
  leaders?: Leader[];
  resources?: Resource[];
}

interface StatusResourceProps {
  id: number;
  description: string;
  name: string;
}

interface StatusProps {
  id: number;
  status: StatusResourceProps;
}

interface Resource {
  id: number;
  name: string;
  photo_url: string;
  resourceStatus: StatusProps;
  roomResourceWeekdayId?: number;
}

interface Leader {
  name: string;
  resource_id: number;
  photo_url: string;
}

interface Weekday {
  id: number;
  name: string;
}

export function WeekDayColumn({
  data,
  checkbox,
  allResources,
  onUpdateInfoInParent,
  onInfoScheduleChange,
  onRemoveInfoSchedule,
}: Props) {
  const [showHomeOffice, setShowHomeOffice] = useState(false);

  useEffect(() => {
    setShowHomeOffice(checkbox);
  }, [checkbox]);

  const weekdaysArray: Weekday[] = [
    { id: 1, name: "Segunda-feira" },
    { id: 2, name: "Terça-feira" },
    { id: 3, name: "Quarta-feira" },
    { id: 4, name: "Quinta-feira" },
    { id: 5, name: "Sexta-feira" },
  ];

  const roomsArray: Room[] = [
    { id: 1, name: "Sala 1", seats: 4, resources: [] },
    { id: 2, name: "Sala 2", seats: 6, resources: [] },
    { id: 3, name: "Sala 3", seats: 4, resources: [] },
    { id: 4, name: "Sala 4", seats: 4, resources: [] },
    { id: 5, name: "Sala 5", seats: 4, resources: [] },
    { id: 6, name: "Administrativo", seats: 2, resources: [] },
    { id: 7, name: "Marketing", seats: 4, resources: [] },
    { id: 8, name: "Recepção", seats: 2, resources: [] },
    { id: 9, name: "Bunker", seats: 12, resources: [] },
    { id: 10, name: "Home-office", seats: 0, resources: [] },
  ];

  function FormattedData(dayData: Day, roomsArray: Room[]): JSX.Element[] {
    const updateInfoInParent = (infoSchedule: string) => {
      onInfoScheduleChange(infoSchedule);
      onRemoveInfoSchedule(infoSchedule);
    };

    return roomsArray.map((room) => {
      const roomInfo = dayData.rooms.find(
        (dataRoom) => dataRoom.name === room.name
      );
      const resources = roomInfo?.resources || [];
      const leaders = roomInfo?.leaders || [];

      return (
        <RoomItem
          allResources={allResources}
          data={dayData}
          key={room.id}
          idRoom={room.id}
          resources={resources}
          roomName={room.name}
          seats={room.seats.toString()}
          filled={resources.length || 0}
          onUpdateInfoInParent={updateInfoInParent}
          homeOffice={showHomeOffice}
        />
      );
    });
  }

  return (
    <Flex ml="50px" width="100%" justifyContent="space-between">
      {weekdaysArray.map((weekday) => (
        <Flex key={weekday.id}>
          <S.SingleContainer>
            <S.ContainerDay>
              <Text fontSize="14px" color="white">
                {weekday.name}
              </Text>
            </S.ContainerDay>
            <Flex flexDir="column" gap="20px">
              {FormattedData(
                data.find((dayData) => dayData.name === weekday.name) || {
                  id: weekday.id,
                  name: weekday.name,
                  rooms: [],
                },
                roomsArray
              )}
            </Flex>
          </S.SingleContainer>
        </Flex>
      ))}
    </Flex>
  );
}
