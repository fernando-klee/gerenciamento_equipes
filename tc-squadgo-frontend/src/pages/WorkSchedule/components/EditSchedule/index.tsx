import * as S from "./styles";
import {
  Button,
  Checkbox,
  Flex,
  Image,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { memo, useContext, useEffect, useState } from "react";
import { RiFilterOffLine } from "react-icons/ri";
import { PayloadEntry } from "./interface";
import { WorkScheduleContext } from "../../../../context/WorkSchedule";
import { weekdaysArray } from "../../functions/WeekdaysArray";
import { months } from "../../functions/Months";
import { roomsArray } from "../../functions/RoomsArray";
import { onRemoveInfoSchedule } from "./functions/OnRemoveInfoSchedule";
import { onInfoScheduleChange } from "./functions/OnInfoScheduleChange";
import { handleSendSchedule } from "./functions/HandleSendSchedule";
import { handleSendScheduleEmail } from "./functions/HandleSendScheduleEmail";
import { DeleteModal } from "../DeleteModal";
import Header from "../../../../components/Header";
import TrashCan from "../../../../assets/TrashCan.svg";
import { WeekDayColumn } from "../WeekDayColumn";

const EditSchedule: React.FC = () => {
  const { read, write } = useContext(WorkScheduleContext);

  const [selectedOption, setSelectedOption] = useState("");
  const [showHomeOffice, setShowHomeOffice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payloadArray, setPayloadArray] = useState<PayloadEntry[]>([]);
  const [overallLoading, setOverallLoading] = useState(true);
  const [loggedIds, setLoggedIds] = useState<
    {
      idSchedule: number;
      resourceIdDelete: number;
    }[]
  >([]);

  function setOnInfoScheduleChangeValue(infoSchedule: string) {
    onInfoScheduleChange(infoSchedule, {
      payloadArray: payloadArray,
      setPayloadArray: setPayloadArray,
      setDaysOfWeek: write.setDaysOfWeek,
      resourcesData: read.resources,
    });
  }

  function setOnRemoveInfoScheduleValue(infoSchedule: string) {
    onRemoveInfoSchedule(infoSchedule, {
      payloadArray: payloadArray,
      setPayloadArray: setPayloadArray,
      setDaysOfWeek: write.setDaysOfWeek,
      setLoggedIds: setLoggedIds,
    });
  }

  const updateInfoSchedule = (newInfoSchedule: string) => {
    console.log("new info" + newInfoSchedule);
  };

  const handleCheckboxChange = () => {
    setShowHomeOffice(!showHomeOffice);
  };

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  weekdaysArray.forEach((day) => {
    day.rooms = roomsArray;
  });

  const handleClearResourcesInRooms = () => {
    setIsModalOpen(true);
  };

  function setHandleSendScheduleValue() {
    handleSendSchedule(
      loggedIds,
      read.allResources,
      read.resourcesInRoom,
      payloadArray
    );
  }

  function setHandleSendScheduleEmailValue() {
    handleSendScheduleEmail(payloadArray);
  }

  useEffect(() => {
    setOverallLoading(read.loadingResources || read.loadingSchedule);
  }, [read.loadingResources, read.loadingSchedule]);

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
                  Previsão {months[new Date().getMonth() % 12]}{" "}
                  {new Date().getFullYear()}
                </Text>
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
                  checked={false}
                  onChange={handleCheckboxChange}
                />
                <Text color="#B4B4B4" fontSize="12px" pos="relative">
                  Exibir home-office
                </Text>
              </Flex>
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
              <Flex flexDir="column" width="100%">
                <Flex justifyContent="space-between" width="100%">
                  <WeekDayColumn
                    // TODO - Abaixo é do tipo any, mas deveria ser do tipo Day
                    data={read.days}
                    checkbox={showHomeOffice}
                    allResources={read.allResources}
                    onInfoScheduleChange={setOnInfoScheduleChangeValue}
                    onUpdateInfoInParent={updateInfoSchedule}
                    onRemoveInfoSchedule={setOnRemoveInfoScheduleValue}
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
                    onClick={setHandleSendScheduleValue}
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
                    onClick={setHandleSendScheduleEmailValue}
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
                    <DeleteModal
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                    />
                  )}
                </Flex>
              </Flex>
            </Flex>
          )}
        </S.PanelsContainer>
      </Flex>
    </>
  );
};

export default memo(EditSchedule);
