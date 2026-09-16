import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  Alert,
  Skeleton,
} from "@chakra-ui/react";
import Select from "react-select";
import { HiExclamationCircle } from "react-icons/hi";
import { ResourceProps } from "../../interfaces";
import * as S from "../../styles";

interface ResourceSelectorProps {
  isLoadingResources: boolean;
  resources: ResourceProps[];
  projectResources: ResourceProps[];
  setProjectResources: (resources: ResourceProps[]) => void;
}

export function ResourceSelector({
  isLoadingResources,
  resources,
  projectResources,
  setProjectResources,
}: ResourceSelectorProps) {
  function addResourceToProject(newResource: ResourceProps[]) {
    const addNewResource = newResource[0];
    if (projectResources.length === 0) {
      setProjectResources(newResource);
    } else {
      const oldResources = [...projectResources];
      const resourceExistsIndex = oldResources.findIndex(
        (or) => or.id === addNewResource.id
      );

      if (resourceExistsIndex !== -1) {
        oldResources.splice(resourceExistsIndex, 1);
      } else {
        oldResources.push(addNewResource);
      }
      setProjectResources(oldResources);
    }
  }

  function removeResourceFromProject(resource_id: number) {
    const oldResources = [...projectResources];
    const resourceExistsIndex = oldResources.findIndex(
      (or) => or.id === resource_id
    );
    oldResources.splice(resourceExistsIndex, 1);
    setProjectResources(oldResources);
  }

  function updateProjectResourceHours(resource_id: number, project_hours: number) {
    const oldResources = [...projectResources];
    const resourceIndex = projectResources.findIndex((r) => r.id === resource_id);
    const resource = { ...oldResources[resourceIndex] };
    resource.project_hours = project_hours;
    oldResources[resourceIndex] = resource;
    setProjectResources(oldResources);
  }

  return (
    <>
      <Flex>
        <FormControl>
          <FormLabel>Colaboradores do Projeto</FormLabel>
          {isLoadingResources ? (
            <Skeleton width={"100%"} height="35px" />
          ) : (
            <Select
              isMulti={true}
              noOptionsMessage={() => "Sem mais Colaborades"}
              onChange={addResourceToProject}
              placeholder="Adicione mais colaboradores"
              value={null}
              options={resources}
            />
          )}
        </FormControl>
      </Flex>
      <Flex gap="8px" flexWrap={"wrap"}>
        {projectResources.map((a) => (
          <Popover key={a.id}>
            <PopoverTrigger>
              <S.AvatarContainer>
                {a.hours_left - a.project_hours < 0 && (
                  <Flex
                    position="absolute"
                    top="-7px"
                    right="-5px"
                    justifyContent={"center"}
                    alignItems="center"
                    width={"24px"}
                    height={"24px"}
                    borderRadius={"50%"}
                    bgColor={"#fff"}
                  >
                    <HiExclamationCircle color="red" size={24} />
                  </Flex>
                )}
                <Avatar
                  zIndex={-1}
                  objectFit={"cover"}
                  borderRadius="full"
                  boxSize="50px"
                  name={a.name}
                  src={a.photo_url}
                />
              </S.AvatarContainer>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                <Flex direction="column" gap="10px">
                  <Text>{a.name}</Text>
                  {a.hours_left - a.project_hours < 0 && (
                    <Alert status="error" padding="5px">
                      Esse colaborador excedeu as horas disponíveis
                    </Alert>
                  )}
                </Flex>
              </PopoverHeader>
              <PopoverBody>
                <Text>horas cadastradas: {a.hours_amount}</Text>
                <Text>
                  horas livres:{" "}
                  {a.hours_left - a.project_hours <= 0
                    ? 0
                    : a.hours_left - a.project_hours}
                </Text>
                <Text
                  color={
                    a.hours_left - a.project_hours < 0 ? "red" : "black"
                  }
                >
                  horas excedentes:{" "}
                  {a.hours_left - a.project_hours <= 0
                    ? (a.hours_left - a.project_hours) * -1
                    : 0}
                </Text>
                <FormControl maxWidth="max-content">
                  <FormLabel htmlFor="hours-amount">
                    horas para este projeto
                  </FormLabel>
                  <Flex gap="10px">
                    <NumberInput
                      size="md"
                      width={"100px"}
                      min={0}
                      max={9999}
                      value={a.project_hours}
                      onChange={(e) =>
                        updateProjectResourceHours(a.id, Number(e))
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Button
                      type="button"
                      colorScheme={"red"}
                      onClick={() => removeResourceFromProject(a.id)}
                    >
                      Remover do projeto
                    </Button>
                  </Flex>
                </FormControl>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ))}
      </Flex>
    </>
  );
} 