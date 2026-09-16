import {
  Flex,
  Text,
  useToast,
  Table,
  Thead,
  Tr,
  Th,
  Avatar,
  Tbody,
  Td,
  Stack,
  Skeleton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Spinner,
  Divider,
  Checkbox,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  PopoverFooter,
} from "@chakra-ui/react";


import IconGreen from "../../assets/iconGreenResource.svg";
import IconOrange from "../../assets/iconOrangeResource.svg";
import IconRed from "../../assets/iconRedResource.svg";
import InfoGray from "../../assets/infoGray.svg";
import IconSearch from "../../assets/IconSearch.svg";

import Panel from "../../components/Panel";


import * as S from "./styles";
import { parseISO, format, subDays, subMonths } from "date-fns";
import CustomDatePicker from "../../components/Forms/CustomDatePicker";
import { HasPermission } from "../../components/HasPermission";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useGeralVision } from "./Models";


const GeralVision: React.FC = () => {
  const geralVisionHook = useGeralVision();

  return (
    <>
      <Header buttons={[]} />
      <Flex flexDirection="column" gap="30px" padding={"5px 20px"}>
        <HasPermission permissions={["view_geral_vision"]}>
          <Flex flexWrap={"wrap"} width={"100%"} gap="30px">
            <S.TopPanel>
              <S.ContainerTop
                style={{
                  maxHeight: "100%",
                }}
              >
                <Flex flexDir="column" width="100%">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text mt="7px" fontWeight={700} fontSize="18px">
                      Colaboradores
                    </Text>
                    <Popover placement="right-start">
                      <PopoverTrigger>
                        <Button
                          padding={0}
                          ml="6px"
                          mr="auto"
                          size="sm"
                          mt="5px"
                          bgColor={"transparent"}
                        >
                          <Image src={InfoGray} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        boxShadow="0px 4px 10px 0px rgba(67, 98, 139, 0.5)"
                        border="0.8px solid rgba(67, 98, 139, 0.2)"
                        maxW="310px"
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <Text
                            style={{ hyphens: "auto" }}
                            fontSize={13}
                            color="#4D4D4D"
                            borderBottom="1px solid rgba(235, 235, 235, 1)"
                            padding="8px 0 8px 0"
                          >
                            <strong>Colaboradores disponíveis</strong> é a soma
                            da quantidade de horas de colaboradores disponíveis
                            dividindo pela carga horária de 180h.
                          </Text>
                          <Text
                            style={{ hyphens: "auto" }}
                            fontSize={13}
                            color="#4D4D4D"
                            borderBottom="1px solid rgba(235, 235, 235, 1)"
                            padding="7px 0 8px 0"
                          >
                            <strong>Necessidade prevista</strong> é o total de
                            disponibilidade prevista dividindo pela carga
                            horária de 180h.
                          </Text>
                          <Text
                            style={{ hyphens: "auto" }}
                            fontSize={13}
                            color="#4D4D4D"
                            padding="6px 0 8px 0"
                          >
                            <strong>Necessidade real</strong> é o total de horas
                            faltantes dividido pela carga horária de 180h.
                          </Text>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Flex>
                  <Flex flexDir="column">
                    <Flex>
                      <Image src={IconGreen} mr="13px" />
                      <Flex
                        mt="10px"
                        alignItems="center"
                        gap="5px"
                        paddingBottom={"8px"}
                      >
                        <Flex flexDirection="column">
                          {geralVisionHook.states.loadingAllValues ? (
                            <Spinner />
                          ) : (
                            <Text fontSize={"18.18px"} fontWeight={700}>
                              {geralVisionHook.states.allValues?.topDash.resourcesAvailable ?? 0}
                            </Text>
                          )}
                          <Text color="#8E8E8E">Colaboradores disponíveis</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Image src={IconOrange} mr="13px" />
                      <Flex mt="10px" gap="5px" paddingBottom={"8px"}>
                        <Flex flexDir="column">
                          {geralVisionHook.states.loadingAllValues ? (
                            <Spinner />
                          ) : (
                            <Text fontSize={"18.18px"} fontWeight={700}>
                              {geralVisionHook.states.allValues?.topDash.plannedNecessity ?? 0}
                            </Text>
                          )}
                          <Text color="#8E8E8E">Necessidade prevista</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Image src={IconRed} mr="13px" />
                      <Flex mt="10px" gap="5px" paddingBottom={"8px"}>
                        <Flex flexDir="column">
                          {geralVisionHook.states.loadingAllValues ? (
                            <Spinner />
                          ) : (
                            <Text fontSize={"18.18px"} fontWeight={700}>
                              {geralVisionHook.states.allValues?.topDash.realNecessity ?? 0}
                            </Text>
                          )}
                          <Text color="#8E8E8E">Necessidade real</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </S.ContainerTop>
              <S.ContainerTop
                style={{
                  maxHeight: "100%",
                }}
              >
                <Flex flexDirection={"column"} width="100%">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text mt="7px" fontWeight={700} fontSize="18px">
                      Disponibilidades
                    </Text>
                    <Popover placement="right-start">
                      <PopoverTrigger>
                        <Button
                          padding={0}
                          ml="6px"
                          mr="auto"
                          size="sm"
                          bgColor={"transparent"}
                        >
                          <Image src={InfoGray} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        boxShadow="0px 4px 10px 0px rgba(67, 98, 139, 0.5)"
                        border="0.8px solid rgba(67, 98, 139, 0.2)"
                        maxW="310px"
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <Text
                            style={{ hyphens: "auto" }}
                            fontSize={13}
                            color="#4D4D4D"
                            borderBottom="1px solid rgba(235, 235, 235, 1)"
                            padding="8px 0 8px 0"
                          >
                            <strong>Horas Disponíveis</strong> é o total de
                            horas subtraindo as horas em andamento, quando
                            resultado for positivo.
                          </Text>
                          <Text
                            style={{ hyphens: "auto" }}
                            fontSize={13}
                            color="#4D4D4D"
                            borderBottom="1px solid rgba(235, 235, 235, 1)"
                            padding="7px 0 8px 0"
                          >
                            <strong>Horas Faltantes</strong> é o total de horas
                            subtraindo as horas em andamento, quando resultado
                            for negativo.
                          </Text>
                          <Text
                            style={{ hyphens: "auto" }}
                            fontSize={13}
                            color="#4D4D4D"
                            borderBottom="1px solid rgba(235, 235, 235, 1)"
                            padding="6px 0 8px 0"
                          >
                            <strong>Horas Excedentes</strong> é a soma da
                            quantidade de horas excedentes trabalhada por
                            colaborador.
                          </Text>
                          <Text
                            style={{ hyphens: "auto" }}
                            fontSize={13}
                            color="#4D4D4D"
                            paddingTop="6px"
                          >
                            <strong>Disponibilidade Prevista</strong> é o total
                            de horas disponíveis subtraindo as horas faltantes e
                            subtraindo a previsão de horas a iniciar.
                          </Text>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Flex>
                  <Flex flexDirection="column">
                    <Flex
                      mt="10px"
                      alignItems="center"
                      gap="5px"
                      paddingBottom={"8px"}
                    >
                      <Flex flexDirection="column" width="100%">
                        {geralVisionHook.states.loadingAllValues ? (
                          <Spinner />
                        ) : (
                          <Text fontSize={"18.18px"} fontWeight={700}>
                            {geralVisionHook.states.allValues?.disponibility.totalAvailableHours ?? 0}h
                          </Text>
                        )}
                        <Text color="#8E8E8E">Horas disponíveis</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      mt="10px"
                      alignItems="center"
                      gap="5px"
                      paddingBottom={"8px"}
                    >
                      <Flex flexDirection="column" width="100%">
                        {geralVisionHook.states.loadingAllValues ? (
                          <Spinner />
                        ) : (
                          <Text fontSize={"18.18px"} fontWeight={700}>
                            {geralVisionHook.states.allValues?.disponibility.totalMissingHours ?? 0}h
                          </Text>
                        )}
                        <Text color="#8E8E8E">Horas faltantes</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      mt="10px"
                      alignItems="center"
                      gap="5px"
                      paddingBottom={"8px"}
                    >
                      <Flex flexDir="column">
                        {geralVisionHook.states.loadingAllValues ? (
                          <Spinner />
                        ) : (
                          <Text fontSize={"18.18px"} fontWeight={700}>
                            {geralVisionHook.states.allValues?.geralVision.totalExcededHours ?? 0}h
                          </Text>
                        )}
                        <Text color="#8E8E8E">Horas excedentes</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      mt="10px"
                      alignItems="center"
                      gap="5px"
                      paddingBottom={"8px"}
                    >
                      <Flex flexDirection="column">
                        {geralVisionHook.states.loadingAllValues ? (
                          <Spinner />
                        ) : (
                          <Text fontSize={"18.18px"} fontWeight={700}>
                            {geralVisionHook.states.allValues?.disponibility
                              .totalDisponibilityHoursToHappen ?? 0}
                            h
                          </Text>
                        )}
                        <Text color="#8E8E8E">Disponibilidade prevista</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      mt="10px"
                      alignItems="center"
                      gap="5px"
                      paddingBottom={"8px"}
                    >
                      <Flex flexDirection="column">
                        {geralVisionHook.states.loadingAllValues ? (
                          <Spinner />
                        ) : (
                          <Text fontSize={"18.18px"} fontWeight={700}>
                            {geralVisionHook.states.allValues?.disponibility.allHoursActivesProjects ??
                              0}
                            h
                          </Text>
                        )}
                        <Text color="#8E8E8E">
                          Horas de Projetos em Andamento
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </S.ContainerTop>
              <S.ContainerTop
                style={{
                  maxHeight: "100%",
                }}
              >
                <Flex flexDirection={"column"} width="100%">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text mt="7px" fontWeight={700} fontSize="18px">
                      Visão Geral
                    </Text>
                    <Popover placement="right-start">
                      <PopoverTrigger>
                        <Button
                          padding={0}
                          ml="6px"
                          mr="auto"
                          size="sm"
                          bgColor={"transparent"}
                        >
                          <Image src={InfoGray} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        boxShadow="0px 4px 10px 0px rgba(67, 98, 139, 0.5)"
                        border="0.8px solid rgba(67, 98, 139, 0.2)"
                        maxW="310px"
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <Text
                            style={{ hyphens: "auto" }}
                            fontSize={13}
                            color="#4D4D4D"
                            borderBottom="1px solid rgba(235, 235, 235, 1)"
                            padding="8px 0 8px 0"
                          >
                            <strong>Capacidade Total</strong> de horas é a soma
                            de todas as horas de colaboradores cadastrados na
                            tela "Colaboradores".
                          </Text>
                          <Text
                            style={{ hyphens: "auto" }}
                            fontSize={13}
                            color="#4D4D4D"
                            borderBottom="1px solid rgba(235, 235, 235, 1)"
                            padding="8px 0 8px 0"
                          >
                            <strong>Horas em Andamento</strong> é a soma de
                            todas as horas do colaborador cadastradas em
                            projetos.
                          </Text>
                          <Text
                            style={{ hyphens: "auto" }}
                            fontSize={13}
                            color="#4D4D4D"
                            borderBottom="1px solid rgba(235, 235, 235, 1)"
                            padding="8px 0 8px 0"
                          >
                            <strong>Horas sem excedentes em andamento</strong> é
                            a soma de todas as horas de colaboradores
                            cadastradas em projetos sem contar os colaboradores
                            que estão com horas excedentes.
                          </Text>
                          <Text
                            style={{ hyphens: "auto" }}
                            fontSize={13}
                            color="#4D4D4D"
                            padding="8px 0 8px 0"
                          >
                            <strong>Previsão de horas a iniciar</strong> é a
                            soma de todas as horas de projetos que vão iniciar.
                          </Text>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Flex>
                  <Flex flexDirection="column">
                    <Flex
                      mt="10px"
                      alignItems="center"
                      gap="5px"
                      paddingBottom={"8px"}
                    >
                      <Flex flexDir="column">
                        {geralVisionHook.states.loadingAllValues ? (
                          <Spinner />
                        ) : (
                          <Text fontSize={"18.18px"} fontWeight={700}>
                            {geralVisionHook.states.allValues?.geralVision.allResourcesHours ?? 0}h
                          </Text>
                        )}
                        <Text color="#8E8E8E">Capacidade total de horas</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      mt="10px"
                      alignItems="center"
                      gap="5px"
                      paddingBottom={"8px"}
                    >
                      <Flex flexDir="column">
                        {geralVisionHook.states.loadingAllValues ? (
                          <Spinner />
                        ) : (
                          <Text fontSize={"18.18px"} fontWeight={700}>
                            {geralVisionHook.states.allValues?.geralVision.totalHoursHappening ?? 0}h
                          </Text>
                        )}
                        <Text color="#8E8E8E">Horas em andamento</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      mt="10px"
                      alignItems="center"
                      gap="5px"
                      paddingBottom={"8px"}
                    >
                      <Flex flexDir="column">
                        {geralVisionHook.states.loadingAllValues ? (
                          <Spinner />
                        ) : (
                          <Text fontSize={"18.18px"} fontWeight={700}>
                            {geralVisionHook.states.allValues?.geralVision
                              .totalHoursHappeningWithoutExceeds ?? 0}
                            h
                          </Text>
                        )}
                        <Text color="#8E8E8E">
                          Horas sem excedentes em andamento
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                      mt="10px"
                      alignItems="center"
                      gap="5px"
                      paddingBottom={"8px"}
                    >
                      <Flex flexDir="column">
                        {geralVisionHook.states.loadingAllValues ? (
                          <Spinner />
                        ) : (
                          <Text fontSize={"18.18px"} fontWeight={700}>
                            {geralVisionHook.states.allValues?.geralVision.allProjectsHours ?? 0}h
                          </Text>
                        )}
                        <Text color="#8E8E8E">Previsão de horas a iniciar</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </S.ContainerTop>
              <S.ContainerTop
                style={{
                  maxHeight: "100%",
                }}
              >
                <Flex flexDirection={"column"} width="100%" ml="10px">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontWeight={700} fontSize="18px">
                      Liberação Prevista
                    </Text>
                    <CustomDatePicker
                      currentDate={geralVisionHook.states.plannedReleaseDate}
                      isOpen={geralVisionHook.states.plannedReleaseCalendarDisplay}
                      onChange={(e: Date) => geralVisionHook.handles.handleOnChangePlannedReleaseDate(
                        e, 
                        geralVisionHook.states.setPlannedReleaseDate)}
                      onBlur={() => geralVisionHook.states.setPlannedReleaseCalendarDisplay(false)}
                      minDate={subMonths(new Date(), 1)}
                      showMonthYearPicker
                      showFullMonthYearPicker
                      showTwoColumnMonthYearPicker
                    />
                  </Flex>
                  <S.OverPlannedRelease>
                    {geralVisionHook.states.plannedReleaseLoading ? (
                      <Spinner />
                    ) : geralVisionHook.states.plannedRelease.length > 0 ? (
                      geralVisionHook.states.plannedRelease.map((pr) => (
                        <Flex
                          key={pr.name}
                          mt="10px"
                          alignItems="center"
                          gap="5px"
                          paddingBottom={"8px"}
                        >
                          <Flex flexDirection="column" width="100%">
                            <Flex
                              alignItems={"center"}
                              justifyContent="space-between"
                              gap="4px"
                            >
                              <Flex alignItems={"center"} gap="10px">
                                <Popover trigger="hover">
                                  <PopoverTrigger>
                                    <Avatar
                                      cursor="pointer"
                                      objectFit={"cover"}
                                      borderRadius="full"
                                      size={"md"}
                                      style={{ border: "1px solid red" }}
                                      border="3px solid #fff"
                                      name={pr.name}
                                      src={pr.photo_url}
                                    />
                                  </PopoverTrigger>
                                  <PopoverContent
                                    width={"max-content"}
                                    maxWidth="330px"
                                    boxShadow="0px 4px 10px 0px rgba(67, 98, 139, 0.5)"
                                    border="0.8px solid rgba(67, 98, 139, 0.2)"
                                  >
                                    <PopoverArrow />
                                    <PopoverCloseButton
                                      mt="2px"
                                      color="#43628B"
                                    />
                                    <PopoverHeader>
                                      <Text
                                        // fontWeight={600}
                                        // pl="10px"
                                        // pr="10px"
                                        // color="#4D4D4D"
                                        // mr={"30px"}
                                      >
                                        {geralVisionHook.utils.resourceName(pr.name)}
                                      </Text>
                                    </PopoverHeader>
                                    {/* <PopoverBody pl='0' pr='0' borderTop='0.25px solid rgba(232, 236, 241, 1);'>
                                                                                {loadingResourceProjects ? (
                                                                                    <Spinner />
                                                                                ) : (
                                                                                    <Flex flexDirection={'column'}>
                                                                                        {selectedResourceProject && (
                                                                                            <>
                                                                                                <>
                                                                                                    {selectedResourceProject.projects.length > 0 ? (
                                                                                                        selectedResourceProject.projects.map(rp => (
                                                                                                            <Text margin='0 20px 0 22px' color='#4D4D4D' key={rp.id}>{rp.project.name} - {rp.hours_amount}h</Text>
                                                                                                        ))
                                                                                                    ) : (
                                                                                                        <Text margin='0 20px 0 22px'>Colaborador não está em nenhum projeto</Text>
                                                                                                    )}
                                                                                                    <S.BorderPopover />
                                                                                                </>
                                                                                                <Text margin='0 20px 0 22px' color='#4D4D4D' mt={'10px'}>horas disponíveis: {selectedResourceProject.available_hours}h</Text>
                                                                                            </>
                                                                                        )}
                                                                                    </Flex>
                                                                                )}
                                                                            </PopoverBody> */}
                                  </PopoverContent>
                                </Popover>
                                <S.ContainerPlannedRelease>
                                  <Text fontWeight={700} mb="-5px">
                                    {pr.output_estimate
                                      ? new Date(
                                        pr.output_estimate
                                      ).toLocaleDateString("pt-BR", {
                                        timeZone: "UTC",
                                      })
                                      : "Data não disponível"}
                                  </Text>
                                  <Text color="#8E8E8E">
                                    {geralVisionHook.utils.resourceName(pr.name)}
                                  </Text>
                                </S.ContainerPlannedRelease>
                              </Flex>
                              <Text
                                pos="relative"
                                top="10px"
                                mr="15px"
                                color="#8E8E8E"
                              >
                                {pr.output_estimate
                                  ? new Date(
                                    pr.output_estimate
                                  ).toLocaleDateString("pt-BR", {
                                    timeZone: "UTC",
                                  })
                                  : "Data não disponível"}
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      ))
                    ) : (
                      <span>Não há previsões nesta data</span>
                    )}
                  </S.OverPlannedRelease>
                </Flex>
              </S.ContainerTop>
            </S.TopPanel>
          </Flex>
        </HasPermission>
        <S.PanelsContainer>
          <HasPermission permissions={["view_geral_vision"]}>
            <Panel
              flex={1}
              position="relative"
              flexDir={"column"}
              style={{
                overflowX: "hidden",
              }}
            >
              <Text ml="15px" fontWeight={700} fontSize="18px">
                Alocações
              </Text>
              <Flex
                mt="5px"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Flex gap="7px">
                  <Checkbox
                    id="hideCustomersCheckbox"
                    ml="15px"
                    borderColor="#8E8E8E"
                    colorScheme="gray"
                    onChange={(e) => geralVisionHook.handles.handleHideCustomersWithNoResources(
                      e.target.checked,
                      geralVisionHook.states.customers,
                      geralVisionHook.states.setCustomersFiltered
                    )}
                    mb={"15px"}
                    size="sm"
                    pos="relative"
                    top="2px"
                  />
                  <label htmlFor="hideCustomersCheckbox">
                    <Text
                      color="#B4B4B4"
                      fontSize="13"
                      mb="14px"
                      pos="relative"
                      top="2px"
                    >
                      Ocultar clientes sem colaborador
                    </Text>
                  </label>
                </Flex>
                <Flex gap="10px">
                  <Image mt="4px" height="15px" src={IconSearch} />
                  <S.SearchButtonContainer>
                    <Input
                      _placeholder={{ color: "#B4B4B4", fontWeight: "normal" }}
                      fontSize="13"
                      variant="unstyled"
                      placeholder="Insira o cliente, colaborador ou líder"
                      value={geralVisionHook.states.searchText}
                      name="alocations"
                      width={"100%"}
                      onChange={(e) => geralVisionHook.handles.handleOnSearchByText(
                        e, 
                        geralVisionHook.states.setSearchText, 
                        geralVisionHook.states.customers, 
                        geralVisionHook.states.setCustomersFiltered
                      )}
                    />
                  </S.SearchButtonContainer>
                </Flex>
              </Flex>
              <S.BottomTableInput />
              {geralVisionHook.states.loadingCustomers ? (
                <Stack>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </Stack>
              ) : (
                <Flex maxWidth={"-webkit-fill-available"}>
                  <Table
                    variant="striped"
                    colorScheme="tableStripe"
                    ml="25px"
                    mr="21px"
                    pos="relative"
                  >
                    <Thead>
                      <Tr>
                        <Th
                          border="none"
                          textTransform="capitalize"
                          fontSize="16px"
                          color="#43628B"
                        >
                          <Text pos="relative" left="-10px">
                            Clientes
                          </Text>
                        </Th>
                        <Th
                          border="none"
                          textAlign="center"
                          textTransform="capitalize"
                          fontSize="16px"
                          color="#43628B"
                        >
                          Colaboradores
                        </Th>
                        <Th
                          border="none"
                          textAlign="center"
                          textTransform="capitalize"
                          fontSize="16px"
                          color="#43628B"
                        >
                          Líderes
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {geralVisionHook.states.customersFiltered.length > 0 ? (
                        geralVisionHook.states.customersFiltered.map((e) => {
                          return (
                            e.status === "ATIVO" && (
                              <Tr key={e.id} border="none">
                                <Td
                                  borderTopLeftRadius="50px"
                                  borderBottomLeftRadius="50px"
                                  border="none"
                                  textAlign="center"
                                  width="24%"
                                  pl="0"
                                >
                                  <Flex
                                    alignItems={"center"}
                                    gap="15px"
                                    pos="relative"
                                    left="-10px"
                                    zIndex={1}
                                  >
                                    <Avatar
                                      objectFit={"cover"}
                                      borderRadius="full"
                                      height="50px"
                                      width="50px"
                                      name={e.name}
                                      src={e.image_url}
                                      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.16);
                                                            "
                                    />
                                    <Text
                                      textAlign="left"
                                      color="#000000"
                                      fontSize="16px"
                                      fontWeight={500}
                                    >
                                      {e.name}
                                    </Text>
                                  </Flex>
                                </Td>
                                <Td border="none" width="50%">
                                  <Flex
                                    flexWrap={"wrap"}
                                    alignItems={"center"}
                                    justifyContent="center"
                                    width="100%"
                                  >
                                    {e.resources.length > 0 ? (
                                      e.resources.map((r) => (
                                        <Popover key={r.id} trigger="hover">
                                          <PopoverTrigger>
                                            <Link to={`/recursos/${r.id}`}>
                                              <Avatar
                                                onMouseEnter={() =>
                                                  geralVisionHook.handles.handleSelectResource(
                                                    r.id,
                                                    geralVisionHook.states.selectedResource, 
                                                    geralVisionHook.states.setLoadingResourceProjects,
                                                    geralVisionHook.states.setSelectedResource, 
                                                    geralVisionHook.states.setSelectedResourceProject
                                                  )
                                                }
                                                cursor="pointer"
                                                height="50px"
                                                width="50px"
                                                border="2px solid #fff"
                                                marginRight={"-10px"}
                                                name={r.name}
                                                src={r.photo_url}
                                              />
                                            </Link>
                                          </PopoverTrigger>
                                          <PopoverContent
                                            width={"max-content"}
                                            maxWidth="330px"
                                            boxShadow="0px 4px 10px rgba(67, 98, 139, 0.5)"
                                          >
                                            <PopoverArrow />
                                            <PopoverHeader>
                                              <Text
                                                to={`/recursos/${r.id}`}
                                                as={Link}
                                                fontWeight={600}
                                                pl="10px"
                                                pr="10px"
                                                color="#4D4D4D"
                                                mr={"30px"}
                                              >
                                                {geralVisionHook.utils.resourceName(r.name)}
                                              </Text>
                                              <PopoverCloseButton
                                                mt="2px"
                                                color="#43628B"
                                              />
                                            </PopoverHeader>
                                            <PopoverBody pl="0" pr="0">
                                              {geralVisionHook.states.loadingResourceProjects ? (
                                                <Spinner />
                                              ) : (
                                                <Flex flexDirection={"column"}>
                                                  {geralVisionHook.states.selectedResourceProject && (
                                                    <>
                                                      <>
                                                        {geralVisionHook.states.selectedResourceProject
                                                          .projects.length >
                                                          0 ? (
                                                          geralVisionHook.states.selectedResourceProject.projects.map(
                                                            (rp) => (
                                                              <Text
                                                                color="#4D4D4D"
                                                                margin="0 10px 0 22px"
                                                                key={rp.id}
                                                              >
                                                                {
                                                                  rp.project
                                                                    .name
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                  rp.hours_amount
                                                                }
                                                                h
                                                              </Text>
                                                            )
                                                          )
                                                        ) : (
                                                          <Text margin="0 20px 0 22px">
                                                            Colaborador não está
                                                            em nenhum projeto
                                                          </Text>
                                                        )}
                                                        <S.BorderPopover />
                                                      </>
                                                      <Text
                                                        margin="0 20px 0 22px"
                                                        color="#4D4D4D"
                                                        mt={"10px"}
                                                      >
                                                        horas disponíveis:{" "}
                                                        {
                                                          geralVisionHook.states.selectedResourceProject.available_hours
                                                        }
                                                        h
                                                      </Text>
                                                    </>
                                                  )}
                                                </Flex>
                                              )}
                                            </PopoverBody>
                                          </PopoverContent>
                                        </Popover>
                                      ))
                                    ) : (
                                      <Text>Sem colaboradores</Text>
                                    )}
                                  </Flex>
                                </Td>
                                <Td
                                  borderTopRightRadius="50px"
                                  borderBottomRightRadius="50px"
                                  border="none"
                                  width="25%"
                                >
                                  <Flex
                                    flexWrap={"wrap"}
                                    alignItems={"center"}
                                    justifyContent="center"
                                    width="100%"
                                    pos="relative"
                                    right="10px"
                                  >
                                    {e.responsibles.length > 0 ? (
                                      e.responsibles.map((r) => (
                                        <Popover key={r.id} trigger="hover">
                                          <PopoverTrigger>
                                            <Link to={`/recursos/${r.id}`}>
                                              <Avatar
                                                onMouseEnter={() =>
                                                  geralVisionHook.handles.handleSelectResource(
                                                    r.id,
                                                    geralVisionHook.states.selectedResource, 
                                                    geralVisionHook.states.setLoadingResourceProjects,
                                                    geralVisionHook.states.setSelectedResource, 
                                                    geralVisionHook.states.setSelectedResourceProject
                                                  )
                                                }
                                                cursor="pointer"
                                                height="50px"
                                                width="50px"
                                                border="2px solid #fff"
                                                marginRight={"-20px"}
                                                name={r.name}
                                                src={r.photo_url}
                                              />
                                            </Link>
                                          </PopoverTrigger>
                                          <PopoverContent
                                            width={"max-content"}
                                            maxWidth="330px"
                                            boxShadow="0px 4px 10px rgba(67, 98, 139, 0.5)"
                                          >
                                            <PopoverArrow />
                                            <PopoverCloseButton
                                              mt="2px"
                                              color="#43628B"
                                            />
                                            <PopoverHeader>
                                              <Text
                                                to={`/recursos/${r.id}`}
                                                as={Link}
                                                fontWeight={600}
                                                pl="10px"
                                                pr="10px"
                                                color="#4D4D4D"
                                                mr={"30px"}
                                              >
                                                {geralVisionHook.utils.resourceName(r.name)}
                                              </Text>
                                            </PopoverHeader>
                                            <PopoverBody pl="0" pr="0">
                                              {geralVisionHook.states.loadingResourceProjects ? (
                                                <Spinner />
                                              ) : (
                                                <Flex flexDirection={"column"}>
                                                  {geralVisionHook.states.selectedResourceProject && (
                                                    <>
                                                      <>
                                                        {geralVisionHook.states.selectedResourceProject
                                                          .projects.length >
                                                          0 ? (
                                                          geralVisionHook.states.selectedResourceProject.projects.map(
                                                            (rp) => (
                                                              <Text
                                                                color="#4D4D4D"
                                                                padding="0 10px 0 22px"
                                                                key={rp.id}
                                                              >
                                                                {
                                                                  rp.project
                                                                    .name
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                  rp.hours_amount
                                                                }
                                                                h
                                                              </Text>
                                                            )
                                                          )
                                                        ) : (
                                                          <Text margin="0 20px 0 22px">
                                                            Líder não está em
                                                            nenhum projeto
                                                          </Text>
                                                        )}
                                                        <S.BorderPopover />
                                                      </>
                                                      <Text
                                                        margin="0 20px 0 22px"
                                                        color="#4D4D4D"
                                                        mt={"10px"}
                                                      >
                                                        horas disponíveis:{" "}
                                                        {
                                                          geralVisionHook.states.selectedResourceProject.available_hours
                                                        }
                                                        h
                                                      </Text>
                                                    </>
                                                  )}
                                                </Flex>
                                              )}
                                            </PopoverBody>
                                          </PopoverContent>
                                        </Popover>
                                      ))
                                    ) : (
                                      <Text ml="17px">Sem líderes</Text>
                                    )}
                                  </Flex>
                                </Td>
                              </Tr>
                            )
                          );
                        })
                      ) : (
                        <Tr>
                          <Td colSpan={3}>
                            <Text textAlign="center">Não há clientes</Text>
                          </Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </Flex>
              )}
            </Panel>
          </HasPermission>
        </S.PanelsContainer>
      </Flex>
    </>
  );
};

export default GeralVision;
