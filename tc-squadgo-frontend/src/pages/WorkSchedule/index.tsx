import { memo } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Circle,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import * as S from "./styles";
import IconSearch from "../../assets/IconSearch.svg";
import CustomDatePicker2 from "../../components/Forms/CustomDatePicker2";
import { RiFilterOffLine } from "react-icons/ri";
import { api } from "../../services/api";
import { WeekendDays } from "./components/WeekendDays";
import { DifferentMonth } from "./components/DifferentMonth";
import { RoomFilter } from "./components/RoomFilter";
import InfoGray from "../../assets/infoGray.svg";
import PersonCircle from "../../assets/PersonCircle.svg";
import { BiCalendarPlus, BiCalendarEdit } from "react-icons/bi";
import { BiCalendarCheck } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { ResourceProjectsProps } from "../Resources/interfaces";
import { format } from "date-fns";
import { HasPermission } from "../../components/HasPermission";
import LeaderFilter from "./components/LeaderFilter";
import ResourcesFilter from "./components/ResourcesFilter";
import DayWeekCircle from "./components/DayWeekCircle";

interface Resource {
  id: number;
  name: string;
  photo_url: string;
  leader?: boolean;
  admission_date?: string;
  email?: string;
  resourceClassification?: {
    classification: {
      description: string;
    };
  };
  rooms?: Room[];
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
  leaders: Leader[];
  resources: Resource[];
}

interface Leader {
  name: string;
  resource_id: number;
  photo_url: string;
}

const WorkSchedule: React.FC = () => {
  const history = useHistory();

  const [plannedReleaseCalendarDisplay, setPlannedReleaseCalendarDisplay] =
    useState(false);
  const [plannedReleaseDate, setPlannedReleaseDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString("pt-BR", { month: "long" })
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [resources, setResources] = useState<Resource[]>([]);
  const [rooms, setRooms] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [isCreated2, setIsCreated2] = useState(false);
  const [days, setDay] = useState();
  const [roomName, setRoomName] = useState<string[]>([]);
  const [showHomeOffice, setShowHomeOffice] = useState(true);
  const [data, setData] = useState<Resource[]>([]);
  const [selectedResourceInfo, setSelectedResourceInfo] =
    useState<Resource | null>(null);
  const [schedules, setSchedules] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [resourcesFiltered, setResourcesFiltered] = useState<Resource[]>([]);

  useEffect(() => {
    async function loadResources() {
      try {
        const { data } = await api.get("/resources");

        const activeResources = data.filter((resource: any) => {
          return resource.resourceStatus.status.name !== "INATIVO";
        });

        setResources(activeResources);
        setResourcesFiltered(activeResources);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    }

    loadResources();
  }, []);

  useEffect(() => {
    async function loadWeekdaysAndRooms() {
      const { data } = await api.get("/resource-room-to-day-of-week");
      const days = data.map((item: { day: any }) => item.day);

      setDay(days);
    }
    loadWeekdaysAndRooms();
  }, []);

  const onChangePlannedReleaseDate = (date: any) => {
    setPlannedReleaseDate(date);
    setSelectedDate(date);
    setCurrentMonth(date.toLocaleString("default", { month: "long" }));
    setSelectedYear(date.getFullYear());
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

  const handleClick = () => {
    history.push("/escalas/criar");
  };

  const handleClickEdit = () => {
    history.push("/escalas/editar");
  };

  useEffect(() => {
    async function loadRooms() {
      try {
        const response = await api.get("/resource-room-to-day-of-week");
        const responseData = response.data;

        setData(responseData);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    }

    loadRooms();
  }, []);

  useEffect(() => {
    async function loadRoomsName() {
      try {
        const response = await api.get("/rooms");
        const responseData = response.data;

        const roomNames = responseData.map((item: any) => item.name);

        setRoomName(roomNames);
      } catch (error) {
        console.log("Não foi possível carregar as salas");
      }
    }

    loadRoomsName();
  }, []);
  const handleClick2 = () => {
    setIsCreated2(!isCreated2);
  };

  const dataTable = [
    {
      nome: "Daniel Nunes da Fonte - Líder",
      data: "11/09/2022 - 15:47",
      status: "Aprovado",
    },
    {
      nome: "Jonathan Klauck - Líder",
      data: "11/09/2022 - 15:47",
      status: "Em análise",
    },
    {
      nome: "Adriano",
      data: "11/09/2022 - 15:47",
      status: "Aguardando pendências",
    },
    { nome: "Diego", data: "11/09/2022 - 15:47", status: "Em análise" },
  ];

  const total = dataTable.length;
  const pendentes = dataTable.filter(
    (item) => item.status === "Em análise"
  ).length;
  const aprovadas = dataTable.filter(
    (item) => item.status === "Aprovado"
  ).length;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Resource[]>([]);

  const handleInputChange = (event: any) => {
    const inputText = event.target.value;
    setSelectedResource(inputText);
    setIsModalOpen(false);
    filterOptions(inputText);
  };

  const handleOptionClick = (selectedOption: string) => {
    const selectedResource = resources.find(
      (resource) => resource.name === selectedOption
    );
    const resourceIds = selectedResource ? selectedResource.id : null;

    loadSchedules(resourceIds);
    setSelectedResource(selectedOption);
    setSelectedResourceInfo(selectedResource || null);
    setIsModalOpen(true);
  };

  const removeDiacritics = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filterOptions = (inputText: string) => {
    const trimmedText = inputText.trim();
  
    if (trimmedText === "") {
      setFilteredOptions([]);
      return;
    }
  
    const filtered = resources.filter((resource) =>
      removeDiacritics(resource.name.toLowerCase()).includes(
        removeDiacritics(trimmedText.toLowerCase())
      )
    );
    setFilteredOptions(filtered);
  };

  const renderOptions = () => {
    return filteredOptions.map((resource) => (
      <ListItem
        key={resource.id}
        value={resource.name}
        onClick={() => handleOptionClick(resource.name)}
        _hover={{ backgroundColor: "gray.200" }}
        cursor="pointer"
        py={1}
        pl={2}
      >
        {resource.name}
      </ListItem>
    ));
  };

  const loadSchedules = async (resourceId: any) => {
    try {
      const response = await api.get(`/resources/${resourceId}/schedules`);
      setSchedules(response.data);
    } catch (error) {
      console.log("Erro ao carregar os agendamentos do recurso:", error);
    }
  };

  function onSearchByText(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
    const value = e.target.value.toLowerCase();

    const resourcesFiltered = resources.filter((c) => {
      return c.name.toLowerCase().includes(value);
    });

    setResourcesFiltered(resourcesFiltered);
  }

  return (
    <>
      <Header
        buttons={[
          {
            createPermissions: ["create_work_schedule"],
            newIcon: BiCalendarPlus,
            title: "Criar escalas",
            onClick: handleClick,
          },
          {
            createPermissions: ["create_work_schedule"],
            newIcon: BiCalendarEdit,
            title: "Editar escalas",
            onClick: handleClickEdit,
          },
          // {
          //   createPermissions: ['view_dashboard_menu'],
          //   newIcon: BiCalendarCheck,
          //   title: 'Pendências/Aprovações',
          //   onClick: handleClick2
          // }
        ]}
      />
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
                  {months[new Date().getMonth() % 12]} {selectedYear}
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
                  checked={true}
                  onChange={handleCheckboxChange}
                />
                <Text color="#B4B4B4" fontSize="12px" pos="relative">
                  Esconder home-office
                </Text>
              </Flex>
              <HasPermission permissions={["create_work_schedule"]}>
                <Flex gap="10px">
                  <Image mt="2px" height="15px" src={IconSearch} />
                  <S.SearchButtonContainer>
                    <FormControl>
                      <Input
                        _placeholder={{
                          color: "#B4B4B4",
                          fontWeight: "normal",
                        }}
                        fontSize="13px"
                        variant="unstyled"
                        placeholder="Selecione o colaborador"
                        name="alocations"
                        width={"100%"}
                        list="resourcesDatalist"
                        onChange={handleInputChange}
                        value={selectedResource}
                      />
                      {selectedResource && (
                        <List
                          id="resourcesDatalist"
                          position="absolute"
                          width="100%"
                          zIndex="1"
                          backgroundColor="white"
                          borderWidth="1px"
                          borderRadius="md"
                          boxShadow="sm"
                          mt={2}
                        >
                          {renderOptions()}
                        </List>
                      )}
                      {isModalOpen && (
                        <Modal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          isCentered
                        >
                          <ModalOverlay />
                          <ModalContent
                            bgColor="#EEEFF2"
                            borderRadius="5px"
                            paddingLeft={5}
                            paddingRight={5}
                            paddingBottom={5}
                            minW="600px"
                          >
                            <ModalHeader>
                              <Text
                                ml="-25px"
                                fontSize="14px"
                                fontWeight={500}
                                color="#494343"
                              >
                                Colaborador
                              </Text>
                              <ModalCloseButton />
                            </ModalHeader>
                            <ModalBody bgColor="#F9F9FA" borderRadius="5px">
                              {selectedResourceInfo && (
                                <>
                                  <Flex width="100%" flexDir="column">
                                    <Flex
                                      flexDir="column"
                                      alignItems="center"
                                      mt="20px"
                                    >
                                      {selectedResourceInfo?.photo_url ? (
                                        <Image
                                          width="100px"
                                          height="100px"
                                          borderRadius="50%"
                                          objectFit="cover"
                                          src={selectedResourceInfo.photo_url}
                                        />
                                      ) : (
                                        <>
                                          <Image
                                            maxW="150px"
                                            maxH="100px"
                                            borderRadius="50%"
                                            src={PersonCircle}
                                          />
                                        </>
                                      )}
                                      <Text
                                        color="#494343"
                                        fontSize="16px"
                                        fontWeight={600}
                                      >
                                        {selectedResourceInfo.name}
                                      </Text>
                                      <Text color="#494343" fontSize="14px">
                                        {
                                          selectedResourceInfo
                                            .resourceClassification
                                            ?.classification.description
                                        }
                                      </Text>
                                    </Flex>
                                    <Flex gap={5} mt="20px">
                                      <Flex flexDir="column" gap={5}>
                                        <Flex flexDir="column" gap={5}>
                                          <Flex flexDir="column">
                                            <Text
                                              color="#656C6F"
                                              fontSize="12px"
                                              fontWeight={400}
                                            >
                                              E-mail:
                                            </Text>
                                            <Text
                                              color="#333"
                                              fontSize="15px"
                                              fontWeight={400}
                                            >
                                              {selectedResourceInfo.email}
                                            </Text>
                                          </Flex>
                                          <Flex flexDir="column">
                                            <Text
                                              color="#656C6F"
                                              fontSize="12px"
                                              fontWeight={400}
                                            >
                                              Data de admissão:
                                            </Text>
                                            <Text
                                              color="#333"
                                              fontSize="15px"
                                              fontWeight={400}
                                            >
                                              {selectedResourceInfo?.admission_date
                                                ? format(
                                                    new Date(
                                                      selectedResourceInfo.admission_date
                                                    ),
                                                    "dd/MM/yyyy"
                                                  )
                                                : "Data de admissão não disponível"}
                                            </Text>
                                          </Flex>
                                        </Flex>
                                        <Flex gap={5}>
                                          <Flex flexDir="column">
                                            <Text
                                              color="#656C6F"
                                              fontSize="12px"
                                              fontWeight={400}
                                            >
                                              Informação:
                                            </Text>
                                            <Text
                                              color="#333"
                                              fontSize="15px"
                                              fontWeight={400}
                                            >
                                              xxxxxxxxxx
                                            </Text>
                                          </Flex>
                                          <Flex flexDir="column">
                                            <Text
                                              color="#656C6F"
                                              fontSize="12px"
                                              fontWeight={400}
                                            >
                                              Dados importantes:
                                            </Text>
                                            <Text
                                              color="#333"
                                              fontSize="15px"
                                              fontWeight={400}
                                            >
                                              xxxxxxxxxx
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Flex>
                                      <Flex flexDir="column">
                                        <Text>Escalas:</Text>
                                        <Flex
                                          flexDir="column"
                                          h="74%"
                                          justifyContent="space-between"
                                        >
                                          {schedules.map((schedule: any) => (
                                            <Flex key={schedule.id}>
                                              <Text
                                                fontSize="15px"
                                                fontWeight={500}
                                              >
                                                {schedule.weekday}:
                                              </Text>
                                              <Text fontSize="15px" ml="5px">
                                                {schedule.room
                                                  ? schedule.room
                                                  : "Não atribuído"}
                                              </Text>
                                            </Flex>
                                          ))}
                                        </Flex>
                                      </Flex>
                                    </Flex>
                                  </Flex>
                                  {/* <ModalFooter gap={3}>
                                  <Button maxW='115px' maxH='26px' borderRadius='10px' bgColor='#EEEFF2' boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.05);'>
                                    <Text color='#000' fontSize='11px' fontWeight={400}>Editar escala</Text>
                                  </Button>
                                  <Button maxW='115px' maxH='26px' borderRadius='10px' bgColor='#0052CC' boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.05)'>
                                    <Text color='#F2F2F2' fontSize='11px' fontWeight={400}>Adicionar recurso</Text>
                                  </Button>
                                </ModalFooter> */}
                                </>
                              )}
                            </ModalBody>
                          </ModalContent>
                        </Modal>
                      )}
                    </FormControl>
                  </S.SearchButtonContainer>
                </Flex>
              </HasPermission>
            </Flex>
            <S.BottomTableInput />
            <Flex justifyContent="flex-end" flexDir="row" gap="25px">
              <Flex gap="10px" alignItems="center">
                <Select
                  disabled
                  placeholder="Filtrar"
                  value={selectedOption}
                  onChange={handleChange}
                  width="170px"
                >
                  {isCreated ? (
                    <>
                      <optgroup label="Líder">
                        {resources
                          .filter((resource) => resource.leader)
                          .map((resource) => (
                            <option key={resource.id} value={resource.name}>
                              {resource.name}
                            </option>
                          ))}
                      </optgroup>
                      <optgroup label="Salas">
                        {roomName.map((room) => (
                          <option key={room} value={room}>
                            {room}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Colaborador">
                        <option value="Colaborador">Colaborador</option>
                      </optgroup>
                    </>
                  ) : (
                    <>
                      <optgroup label="Líder">
                        {resources
                          .filter((resource) => resource.leader)
                          .map((resource) => (
                            <option key={resource.id} value={resource.name}>
                              {resource.name}
                            </option>
                          ))}
                      </optgroup>
                      <optgroup label="Dia da Semana">
                        <option value="Segunda-feira">Segunda-feira</option>
                        <option value="Terça-feira">Terça-feira</option>
                        <option value="Quarta-feira">Quarta-feira</option>
                        <option value="Quinta-feira">Quinta-feira</option>
                        <option value="Sexta-feira">Sexta-feira</option>
                      </optgroup>
                      <optgroup label="Salas">
                        {roomName.map((room) => (
                          <option key={room} value={room}>
                            {room}
                          </option>
                        ))}
                      </optgroup>
                      <option value="Colaborador">Colaborador</option>
                    </>
                  )}
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
                onClick={() => setIsCreated(false)}
              >
                <Text color="#FFFFFF">Mês atual</Text>
              </Button>
            </Flex>
          </Flex>
          {isCreated ? (
            <DifferentMonth
              selectedOption={selectedOption}
              checkbox={showHomeOffice}
            />
          ) : isCreated2 ? (
            <Flex w="100%" maxW="50%" minH="300px">
              <Flex w="100%" flexDir="column">
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  mb="10px"
                >
                  <Flex alignItems="center">
                    <Text fontSize="18px" color="#000" fontWeight={700}>
                      Escalas enviadas:
                    </Text>
                    <Popover placement="right">
                      <PopoverTrigger>
                        <Button padding={0} size="sm" bgColor={"transparent"}>
                          <Image src={InfoGray} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent bgColor="#43628B" maxW="200px">
                        <PopoverArrow bgColor="#43628B" />
                        <PopoverBody>
                          <Text
                            color="#F2F2F2"
                            fontSize="12px"
                            fontWeight={700}
                            textAlign="center"
                          >
                            Escalas devem ser fechadas até o penúltimo dia útil
                            do mês!
                          </Text>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Flex>
                  <Flex alignItems="center" gap="10px">
                    <Text fontSize="13px">Exibir por:</Text>
                    <Select maxW="150px">
                      <option value="Data">Data</option>
                      <option value="OrdemAlfabetica">Ordem alfabética</option>
                      <option value="Status">Status</option>
                    </Select>
                  </Flex>
                </Flex>
                <Table variant="striped" colorScheme="gray" size="sm">
                  <Tbody>
                    <Tr>
                      <Th borderBottom="0"></Th>
                      <Th
                        fontSize="15px"
                        color="#4D4D4D"
                        fontWeight={600}
                        border="none"
                      >
                        Nome
                      </Th>
                      <Th
                        fontSize="15px"
                        color="#4D4D4D"
                        fontWeight={600}
                        border="none"
                      >
                        Data
                      </Th>
                      <Th
                        fontSize="15px"
                        color="#4D4D4D"
                        fontWeight={600}
                        border="none"
                      >
                        Status
                      </Th>
                    </Tr>
                    {dataTable.map((item, index) => (
                      <Tr key={index}>
                        <Td
                          borderTopLeftRadius="10px"
                          borderBottomLeftRadius="10px"
                          border="none"
                        >
                          {item.status === "Aprovado" && (
                            <Box as={FaCircle} color="green" />
                          )}
                          {item.status === "Em análise" && (
                            <Box as={FaCircle} color="yellow" />
                          )}
                          {item.status === "Aguardando pendências" && (
                            <Box as={FaCircle} color="red" />
                          )}
                        </Td>
                        <Td fontSize="15px" color="#1B1464" border="none">
                          {item.nome}
                        </Td>
                        <Td fontSize="12px" color="#6E6A9B" border="none">
                          {item.data}
                        </Td>
                        <Td
                          fontSize="12px"
                          color="#6E6A9B"
                          border="none"
                          borderTopRightRadius="10px"
                          borderBottomRightRadius="10px"
                        >
                          {item.status}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <Text fontSize="15px" fontWeight={700} mt="10px">
                  Total: {total} | Pendentes: {pendentes} | Aprovadas:{" "}
                  {aprovadas}
                </Text>
              </Flex>
            </Flex>
          ) : (
            <S.ContainerColumns>
              {selectedOption === "" ? (
                <WeekendDays checkbox={showHomeOffice} />
              ) : resources.some(
                  (resource) => resource.name === selectedOption
                ) ? (
                <LeaderFilter
                  rooms={rooms}
                  selectedOption={selectedOption}
                  checkbox={showHomeOffice}
                />
              ) : selectedOption === "Sala" ? (
                <RoomFilter rooms={rooms} selectedOption={selectedOption} />
              ) : selectedOption === "Colaborador" ? (
                <ResourcesFilter resources={resourcesFiltered} />
              ) : (
                <Flex flexDir="column" flex="1" marginTop="-50px">
                  <S.ContainerDayHorizontal>
                    <Text fontSize="14px" color="white">
                      {selectedOption}
                    </Text>
                  </S.ContainerDayHorizontal>
                  <S.SingleContainerHorizontal>
                    <Flex
                      flexDir="row"
                      justifyContent="space-between"
                      width="100%"
                      gap="50px"
                    >
                      {data
                        .filter((day) => day.name === selectedOption)
                        .map((day) => (
                          <>
                            {day.rooms &&
                              day.rooms.map((room: Room) => {
                                if (room.name !== "Home-office") {
                                  return (
                                    <DayWeekCircle
                                      key={room.id}
                                      roomName={room.name}
                                      seats={room.seats}
                                      filled={room.resources.length}
                                      resources={room.resources}
                                      leaders={room.leaders}
                                    />
                                  );
                                } else if (
                                  room.name === "Home-office" &&
                                  showHomeOffice
                                ) {
                                  return (
                                    <DayWeekCircle
                                      key={room.id}
                                      avatar={true}
                                      roomName={room.name}
                                      homeOffice={true}
                                      resources={room.resources}
                                      seats={room.seats}
                                      filled={room.resources.length}
                                      visibleCount={true}
                                      visibleSeats={true}
                                      leaders={room.leaders}
                                    />
                                  );
                                }
                                return null;
                              })}
                          </>
                        ))}
                    </Flex>
                  </S.SingleContainerHorizontal>
                </Flex>
              )}
            </S.ContainerColumns>
          )}
        </S.PanelsContainer>
      </Flex>
    </>
  );
};

export default WorkSchedule;
