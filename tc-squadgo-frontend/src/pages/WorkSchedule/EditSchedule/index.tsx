import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  background,
} from "@chakra-ui/react";
import { BiCalendarPlus, BiCalendar } from "react-icons/bi";
import { RiFilterOffLine } from "react-icons/ri";
import Header from "../../../components/Header";
import IconSearch from "../../../assets/IconSearch.svg";
import TrashCan from "../../../assets/TrashCan.svg";
import CustomDatePicker2 from "../../../components/Forms/CustomDatePicker2";
import { api } from "../../../services/api";
import { WeekDayColumn } from "../WeekDayColumn";
import * as S from "./styles";
// import { DragDropContext } from "react-beautiful-dnd";
// import { DropResult } from "react-beautiful-dnd";
import { useHistory } from "react-router";

interface ResourceProps {
  id: number;
  name: string;
  photo_url: string;
  leader: boolean;
}

interface ResourceDayOfWeekProps {
  id: number;
  name: string;
  photo_url: string;
}

export interface RoomDayOfWeekProps {
  id: number;
  name: string;
  seats: number;
  resources: ResourceDayOfWeekProps[];
}

export interface ResourceRoomDayOfWeekProps {
  id: number;
  day: string;
  rooms: RoomDayOfWeekProps[];
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
  resources: Resource[];
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
  rooms: Room[];
}

interface PayloadEntry {
  week_day: number;
  room_id: number;
  month: number;
  resource_id: number;
}

const EditSchedule: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [resourcesData, setResources] = useState<Resource[]>([]);
  const [resourcesLeaderData, setResourcesLeader] = useState<Resource[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showHomeOffice, setShowHomeOffice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState<Day[]>([]);
  const [payloadArray, setPayloadArray] = useState<PayloadEntry[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [overallLoading, setOverallLoading] = useState(true);

  const [allResources, setAllResources] = useState([]);
  const [resourcesInRoom, setResourcesInRoom] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allResourcesResponse = await api.get("/resources");
        const resourcesInRoomResponse = await api.get(
          "/resource-room-to-day-of-week"
        );

        setAllResources(allResourcesResponse.data);
        setResourcesInRoom(resourcesInRoomResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function loadResources() {
      try {
        const response = await api.get("/resources/actives");
        const responseData: Resource[] = response.data;

        setResources(responseData);
      } catch (error) {
        console.error("Error while fetching data:", error);
      } finally {
        setLoadingResources(false);
      }
    }

    loadResources();
  }, []);

  useEffect(() => {
    async function loadResourcesLeader() {
      try {
        const response = await api.get("/resources/responsibles");
        const responseData: Resource[] = response.data;

        const filteredResources = responseData.filter(
          (resource) => resource.resourceStatus.status.name !== "INATIVO"
        );

        setResourcesLeader(filteredResources);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    }

    loadResourcesLeader();
  }, []);

  useEffect(() => {
    async function loadSchedule() {
      try {
        const response = await api.get("/resource-room-to-day-of-week");
        const responseData: Day[] = response.data;

        const mappedData: Day[] = responseData.map((item) => ({
          id: item.id,
          name: item.name,
          rooms:
            item.rooms?.map((room) => ({
              id: room.id,
              name: room.name,
              seats: room.seats ?? 0,
              leaders: room.leaders || [],
              resources: room.resources || [],
            })) || [],
        }));

        setDaysOfWeek(mappedData);
      } catch (error) {
        console.error("Error while fetching data:", error);
      } finally {
        setLoadingSchedule(false);
      }
    }

    loadSchedule();
  }, []);

  useEffect(() => {
    setOverallLoading(loadingResources || loadingSchedule);
  }, [loadingResources, loadingSchedule]);

  const onInfoScheduleChange = (infoSchedule: string) => {
    const parts = infoSchedule.split("-");
    const id = parseInt(parts[0].replace("id:", ""));
    const room = parseInt(parts[1].replace("sala:", ""));
    const day = parseInt(parts[2].replace("dia:", ""));

    const currentMonth = new Date().getMonth() + 1;

    const payloadEntry = {
      week_day: day,
      room_id: room,
      month: currentMonth,
      resource_id: id,
    };

    const existingEntryIndex = payloadArray.findIndex(
      (entry) =>
        entry.week_day === payloadEntry.week_day &&
        entry.room_id === payloadEntry.room_id &&
        entry.resource_id === payloadEntry.resource_id
    );

    if (existingEntryIndex === -1) {
      const newPayloadArray = [...payloadArray, payloadEntry];
      setPayloadArray(newPayloadArray);

      setDaysOfWeek((prevDays) => {
        return prevDays.map((prevDay) => {
          if (prevDay.id === day) {
            const updatedRooms = prevDay.rooms.map((prevRoom) => {
              if (prevRoom.id === room) {
                if (
                  !prevRoom.resources?.some((resource) => resource.id === id)
                ) {
                  const selectedResource = resourcesData.find(
                    (resource) => resource.id === id
                  );
                  if (selectedResource) {
                    const updatedResources = [
                      ...(prevRoom.resources || []),
                      selectedResource,
                    ];
                    return { ...prevRoom, resources: updatedResources };
                  }
                }
              }
              return prevRoom;
            });
            return { ...prevDay, rooms: updatedRooms };
          }
          return prevDay;
        });
      });
    }
  };

  const [loggedIds, setLoggedIds] = useState<
    { idSchedule: number; resourceIdDelete: number }[]
  >([]);

  const onRemoveInfoSchedule = (infoSchedule: string) => {
    console.log(infoSchedule);
    const parts = infoSchedule.split("-");
    const id = parseInt(parts[0].replace("id:", ""));
    const room = parseInt(parts[1].replace("sala:", ""));
    const day = parseInt(parts[2].replace("dia:", ""));
    const idSchedule = parseInt(parts[3].replace("idEscala:", ""));
    const resourceIdDelete = parseInt(parts[4].replace("colaborador:", ""));

    if (!isNaN(idSchedule)) {
      setLoggedIds((prevIds) => [...prevIds, { idSchedule, resourceIdDelete }]);
    }

    const entryToRemoveIndex = payloadArray.findIndex(
      (entry) =>
        entry.week_day === day &&
        entry.room_id === room &&
        entry.resource_id === id
    );

    if (entryToRemoveIndex !== -1) {
      const newPayloadArray = [...payloadArray];
      newPayloadArray.splice(entryToRemoveIndex, 1);
      setPayloadArray(newPayloadArray);

      setDaysOfWeek((prevDays) => {
        return prevDays.map((prevDay) => {
          if (prevDay.id === day) {
            const updatedRooms = prevDay.rooms.map((prevRoom) => {
              if (prevRoom.id === room) {
                const updatedResources = (prevRoom.resources || []).filter(
                  (resource) => resource.id !== id
                );
                return { ...prevRoom, resources: updatedResources };
              }
              return prevRoom;
            });
            return { ...prevDay, rooms: updatedRooms };
          }
          return prevDay;
        });
      });
    }
  };

  const updateInfoSchedule = (newInfoSchedule: string) => {
    console.log("new info" + newInfoSchedule);
  };

  const handleCheckboxChange = () => {
    setShowHomeOffice(!showHomeOffice);
  };

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const weekdaysArray: Weekday[] = [
    { id: 1, name: "Segunda-feira", rooms: [] },
    { id: 2, name: "Terça-feira", rooms: [] },
    { id: 3, name: "Quarta-feira", rooms: [] },
    { id: 4, name: "Quinta-feira", rooms: [] },
    { id: 5, name: "Sexta-feira", rooms: [] },
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

  weekdaysArray.forEach((day) => {
    day.rooms = roomsArray;
  });

  const handleClearResourcesInRooms = () => {
    setIsModalOpen(true);
  };

  async function handleConfirmClearResources() {
    try {
      await api.delete("/resource-room-to-day-of-week/deleteAll");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  const handleSendSchedule = async () => {
    const sendButton = document.getElementById("sendButton") as HTMLButtonElement;
  
    if (sendButton) {
      sendButton.disabled = true;
    }
  
    const deletePayload = {
      data: loggedIds.map((entry) => ({
        resource_id: entry.resourceIdDelete,
        room_resource_weekday_id: entry.idSchedule,
      })),
    };
  
    await api.delete("/resource-room-to-day-of-week", { data: deletePayload });
  
    try {
      if (!Array.isArray(allResources) || !Array.isArray(resourcesInRoom)) {
        console.error("Invalid data received");
        return;
      }
  
      const currentMonth = new Date().getMonth() + 1;
      const daysOfWeek = [1, 2, 3, 4, 5];
  
      const availableResources = allResources.filter(
        (resource: { status: string }) => resource.status === "DISPONIVEL"
      );
  
      const resourcesInRoomsIds = resourcesInRoom.map((entry: any) =>
        entry.rooms.flatMap((room: any) =>
          room.resources.map((resource: any) => resource.id)
        )
      );
  
      const selectedResources: any[] = [];
      const resourcesToAddToRoom10: any[] = [];
  
      daysOfWeek.forEach((day: number) => {
        const selectedResourcesForDay = payloadArray.filter(
          (entry: any) => entry.week_day === day && entry.room_id !== 10
        );
  
        selectedResources.push(...selectedResourcesForDay);
      });
  
      const apiPayload = {
        data: [...selectedResources, ...resourcesToAddToRoom10],
      };
  
      if (apiPayload.data.length === 0) {
        alert("A escala não pode ser enviada vazia");
        if (sendButton) sendButton.disabled = false;
        return;
      }
  
      await api.post("/resource-room-to-day-of-week/schedule", apiPayload);
  
      window.location.reload();
    } catch (error) {
      console.error("Error while sending schedule:", error);
    }
  };
  

  const handleSendSchedule1 = async () => {
    try {
      // Fetch resources from API
      const allResourcesResponse = await api.get("/resources");
      const resourcesAlreadyInRoomResponse = await api.get(
        "/resource-room-to-day-of-week"
      );

      // Extract data from response objects
      const allResources = allResourcesResponse.data;
      const resourcesAlreadyInRoom = resourcesAlreadyInRoomResponse.data;

      const sendButton = document.getElementById(
        "sendButton"
      ) as HTMLButtonElement;

      if (sendButton) {
        sendButton.disabled = true;
      }

      const deletePayload = {
        data: loggedIds.map((entry) => ({
          resource_id: entry.resourceIdDelete,
          room_resource_weekday_id: entry.idSchedule,
        })),
      };

      await api.delete("/resource-room-to-day-of-week", {
        data: deletePayload,
      });

      const currentMonth = new Date().getMonth() + 2;

      // Filter available resources
      const availableResources = allResources.filter(
        (resource: { status: string }) => resource.status === "DISPONIVEL"
      );

      // Get resources already in rooms
      const resourcesInRoomsIds = resourcesAlreadyInRoom.map(
        (entry: any) => entry.resource_id
      );

      // Assign available resources to room 10 on days they are not already assigned (Monday to Friday)
      const apiPayload = {
        data: [
          ...payloadArray.map((entry) => ({
            week_day: entry.week_day,
            room_id: entry.room_id,
            month: currentMonth,
            resource_id: entry.resource_id,
          })),
          ...availableResources
            .filter(
              (resource: { id: any }) =>
                !resourcesInRoomsIds.includes(resource.id)
            )
            .flatMap((availableResource: any) =>
              [1, 2, 3, 4, 5].map((day) => ({
                // Monday to Friday
                week_day: day,
                room_id: 10,
                month: currentMonth,
                resource_id: availableResource.id,
              }))
            ),
        ],
      };

      await api.post("/resource-room-to-day-of-week/schedule", apiPayload);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error while sending schedule:", error);
    }
  };

  const handleSendScheduleEmail = async () => {
    try {
      const sendButtonEmail = document.getElementById(
        "sendButtonEmail"
      ) as HTMLButtonElement;

      if (sendButtonEmail) {
        sendButtonEmail.disabled = true;
      }

      const apiPayload = {
        data: payloadArray.map((entry) => ({
          week_day: entry.week_day,
          room_id: entry.room_id,
          month: 1,
          resource_id: entry.resource_id,
          sendMail: true,
        })),
      };

      const messageSchedule = "Cheque a sua escala";

      const payloadScheduleNotification = {
        data: payloadArray.map((entry) => ({
          resource_id: entry.resource_id,
          description: messageSchedule,
          type: "SCHEDULE",
        })),
      };

      await api.post("/resource-room-to-day-of-week/mail", apiPayload);
      // await api.post('/notifications/scheduleNotification', payloadScheduleNotification);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error while sending schedule:", error);
    }
  };

  return (
    <>
      <Header buttons={[]} />
      <Flex flexDirection="column" gap="30px" padding={"5px"}>
        <S.PanelsContainer>
          <Flex width="100%" gap="10px" flexDir="column">
            <Flex flexDir="column" gap="12px">
              <Flex>
                <Text
                  fontWeight={700}
                  fontSize="20px"
                  style={{ minWidth: "150px" }}
                >
                  Previsão {months[new Date().getMonth() % 12]} {selectedYear}
                </Text>
                {/* <CustomDatePicker2
                  currentDate={plannedReleaseDate}
                  selected={selectedDate}
                  isOpen={plannedReleaseCalendarDisplay}
                  onChange={onChangePlannedReleaseDate}
                  onBlur={() => setPlannedReleaseCalendarDisplay(false)}
                  maxDate={new Date()}
                  showMonthYearPicker
                  showFullMonthYearPicker
                  showTwoColumnMonthYearPicker
                /> */}
              </Flex>
            </Flex>
            <Flex
              width="100%"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Flex gap="7px" alignItems="center">
                <Checkbox
                  size="sm"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <Text color="#B4B4B4" fontSize="12px" pos="relative">
                  Exibir home-office
                </Text>
              </Flex>
              {/* <Flex gap='10px'>
                  <Image mt='2px' height='15px' src={IconSearch} />
                  <S.SearchButtonContainer>
                    <Input
                      _placeholder={{ color: '#B4B4B4', fontWeight: 'normal' }}
                      fontSize='13px'
                      variant='unstyled'
                      placeholder='Insira o nome do colaborador'
                      name='alocations'
                      width={'100%'}
                    />
                  </S.SearchButtonContainer>
                </Flex> */}
            </Flex>
            <S.BottomTableInput />
            <Flex justifyContent="flex-end" flexDir="row" gap="25px">
              <Flex gap="10px" alignItems="center">
                <Select
                  placeholder="Filtrar"
                  value={selectedOption}
                  onChange={handleChange}
                  width="170px"
                  disabled
                >
                  <optgroup label="Dia da Semana">
                    <option value="Segunda-Feira">Segunda-feira</option>
                    <option value="Terça-Feira">Terça-Feira</option>
                    <option value="Quarta-Feira">Quarta-Feira</option>
                    <option value="Quinta-Feira">Quinta-Feira</option>
                    <option value="Sexta-Feira">Sexta-Feira</option>
                  </optgroup>
                  <option value="Líder">Líder</option>
                  <option value="Sala">Sala</option>
                  <option value="Colaborador">Colaborador</option>
                </Select>
                <Button
                  disabled
                  size="xs"
                  bgColor="#D9D9D9"
                  onClick={() => setSelectedOption("")}
                >
                  <RiFilterOffLine size="xs" />
                </Button>
              </Flex>
              <Button
                disabled
                bgColor="#990000"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.1)"
                onClick={() => undefined}
              >
                <Text color="#FFFFFF">Mês atual</Text>
              </Button>
            </Flex>
          </Flex>
          {overallLoading ? (
            <Spinner size="xl" />
          ) : (
            <Flex dir="row" w="100%">
              {/* <DragDropContext
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}> */}
              {/* <LeftResources data={daysOfWeek} isLeader={selectedOption} resources={resources} /> */}
              <Flex flexDir="column" width="100%">
                <Flex justifyContent="space-between" width="100%">
                  <WeekDayColumn
                    data={daysOfWeek}
                    checkbox={showHomeOffice}
                    allResources={resourcesData}
                    onInfoScheduleChange={onInfoScheduleChange}
                    onUpdateInfoInParent={updateInfoSchedule}
                    onRemoveInfoSchedule={onRemoveInfoSchedule}
                  />
                </Flex>
                <Flex width="100%" flexDir="row-reverse" mt="50px" gap="13px">
                  <Button
                    id="sendButton"
                    borderRadius="10px"
                    bgColor="#239B28"
                    fontSize="16px"
                    color="#FFFFFF"
                    width="133px"
                    height="52px"
                    fontWeight={400}
                    onClick={handleSendSchedule}
                  >
                    Enviar escala
                  </Button>
                  <Button
                    id="sendButtonEmail"
                    borderRadius="10px"
                    bgColor="#142644"
                    fontSize="16px"
                    width="133px"
                    height="52px"
                    fontWeight={400}
                    onClick={handleSendScheduleEmail}
                  >
                    <Text w="120px" fontSize="12px" color="#FFFFFF">
                      Enviar e-mail
                    </Text>
                  </Button>
                  <Button
                    borderRadius="10px"
                    bgColor="#E3E3E3"
                    fontSize="16px"
                    color="#1B1464"
                    width="133px"
                    height="52px"
                    fontWeight={400}
                    disabled
                  >
                    Salvar rascunho
                  </Button>
                  <Button
                    borderRadius="10px"
                    bgColor="#F7F7F7"
                    fontSize="16px"
                    color="#FFFFFF"
                    width="52px"
                    height="52px"
                    fontWeight={400}
                    onClick={handleClearResourcesInRooms}
                  >
                    <Image src={TrashCan} w="100%" h="100%" />
                  </Button>
                  {isModalOpen && (
                    <Modal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      isCentered
                    >
                      <ModalOverlay />
                      <ModalContent padding={5}>
                        <ModalBody>
                          <Flex flexDir="column" alignItems="center" gap={5}>
                            <Text fontWeight={600} fontSize="24px">
                              Tem certeza que deseja excluir?
                            </Text>
                            <Text fontSize="19px" textAlign="center">
                              Ao clicar em excluir, todos os colaboradores serão
                              removidos da escala
                            </Text>
                          </Flex>
                        </ModalBody>
                        <ModalFooter justifyContent="space-evenly">
                          <Button
                            colorScheme="blue"
                            onClick={() => setIsModalOpen(false)}
                            maxWidth="160px"
                            width="100%"
                            fontWeight={400}
                          >
                            Voltar para escala
                          </Button>
                          <Button
                            colorScheme="gray"
                            bgColor="#E3E3E3"
                            onClick={handleConfirmClearResources}
                            maxWidth="160px"
                            width="100%"
                            fontWeight={400}
                          >
                            Excluir
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  )}
                </Flex>
              </Flex>
              {/* </DragDropContext> */}
            </Flex>
          )}
        </S.PanelsContainer>
      </Flex>
    </>
  );
};
export default EditSchedule;
