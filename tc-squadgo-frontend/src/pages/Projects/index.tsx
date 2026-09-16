import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Text,
  useToast,
  Select as ChakraSelect,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Alert,
  Checkbox,
  Divider,
  Skeleton,
  SkeletonCircle,
  Switch,
} from "@chakra-ui/react";



import { useHistory } from "react-router-dom";

import { format, addDays, isValid } from "date-fns";

import Select from "react-select";
import ptBR from "date-fns/locale/pt-BR";

import { Controller } from "react-hook-form";


import { TiDelete } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { FaLockOpen, FaLock } from "react-icons/fa";
import { HiExclamationCircle } from "react-icons/hi";

import Input from "../../components/Forms/Input";
import InputDate from "../../components/Forms/InputDate";
import * as S from "./styles";
import { MdLibraryAdd } from "react-icons/md";
import ProjectsTable from "./ProjectsTable";
import {
  useProjects,
} from "./Models";
import InputDefault from "../../components/Forms/ChakraInput";
import Header from "../../components/Header";

const Projects: React.FC = () => {
  const projectsHook = useProjects();
  const toast = useToast();
  const history = useHistory();


  const typeHistoricIcon = (type: string) => {
    if (type === "NEW_PROJECT") return <FaLockOpen size={20} color="red" />;
    else if (type === "CLOSING_PROJECT")
      return <FaLock size={20} color="red" />;
    else if (type === "ADD_RESOURCE") {
      return (
        <Flex borderRadius="50%" position={"relative"} left="-2px">
          <IoIosAddCircle size={25} color="red" />
        </Flex>
      );
    } else if (
      type === "NAME" ||
      type === "HOURS" ||
      type === "TYPE" ||
      type === "STATUS" ||
      type === "INCREASE_RESOURCE_HOURS" ||
      type === "DECREASE_RESOURCE_HOURS" ||
      type === "START_ESTIMATE" ||
      type === "RESPONSIBLE_ID" ||
      type === "CUSTOMER_ID"
    ) {
      return <AiFillEdit size={23} color="red" />;
    } else {
      return (
        <Flex borderRadius="50%" position={"relative"} left="-4px">
          <TiDelete size={30} color="red" />
        </Flex>
      );
    }
  };

  return (
    <>
      <Header
        buttons={[
          {
            createPermissions: ["create_project"],
            newIcon: MdLibraryAdd,
            onClick:()=> projectsHook.handles.handleOpenNewProjectModal(
              projectsHook.handles.handleCloseNewModal,
              projectsHook.setProjectState,
              projectsHook.resetNewProjectModal,
              projectsHook.clearNewErrors,
              projectsHook.setNewProjectResources,
              projectsHook.onCloseNew,
              projectsHook.onOpenNew
            ),
            title: "Criar projeto",
          },
        ]}
      />
      <S.Container>
        <S.FiltersContainer>
          <Checkbox onChange={(e) => projectsHook.setShowFinishedProjects(e.target.checked)}>
            Exibir projetos finalizados
          </Checkbox>
          <S.FiltersContainerLeft>
            <S.FilterClassification>
              <FormLabel width="max-content" marginBottom="0">
                Filtrar por:
              </FormLabel>
              <ChakraSelect
                width={"max-content"}
                onChange={(e: any) => projectsHook.handles.handleFilterProjectByType(
                  e.target.value, projectsHook.projects, projectsHook.setProjectsFiltered)}
              >
                <option value={""}>Nenhum...</option>
                <option value="50">Projetos Internos</option>
                <option value="1">Projetos Externos</option>
              </ChakraSelect>
            </S.FilterClassification>
            <InputDefault
              width={"284px"}
              onChange={(e) => projectsHook.handles.handleFilterProjectsByName(e.target.value, projectsHook.projects,
                projectsHook.setProjectsFiltered)}
              size="md"
              name="name"
              placeholder="Insira o nome do colaborador ou cliente"
            />
          </S.FiltersContainerLeft>
        </S.FiltersContainer>
        <S.PanelsContent>
          <ProjectsTable
            projects={projectsHook.utils.typeOfProjects(projectsHook.projectsFiltered, "EM_ANDAMENTO")}
            loadingProjects={projectsHook.loadingProjects}
            selectProject={(project_id) => projectsHook.utils.selectProject(project_id,
                  projectsHook.projects,
                  projectsHook.utils.setProjectNow,
                  projectsHook.setProjectState,
                  projectsHook.resetUpdateProjectModal,
                  projectsHook.clearUpdateErrors,
                  projectsHook.setValueUpdate,
                  projectsHook.setIsLoadingProjectResources,
                  projectsHook.onOpenUpdate)}
            viewSelectedProject={(project_id) => projectsHook.utils.viewSelectedProject(
                  project_id,
                  projectsHook.projects,
                  projectsHook.utils.setProjectNow,
                  projectsHook.setProjectState,
                  projectsHook.resetUpdateProjectModal,
                  projectsHook.clearUpdateErrors,
                  projectsHook.setValueUpdate,
                  projectsHook.setIsLoadingProjectResources,
                  projectsHook.onOpenView
            )}
            showHistoric={(id, name) => projectsHook.handles.handleShowHistoric(id,
                name,
                projectsHook.setLoadingHistoric,
                projectsHook.setProjectHistoricSelected,
                projectsHook.onOpenHistoric)}
            panelTitle="Projetos em andamento"
            projectStatus="EM_ANDAMENTO"
          />
         
          <ProjectsTable
            projects={projectsHook.utils.typeOfProjects(projectsHook.projectsFiltered, "A_INICIAR")}
            loadingProjects={projectsHook.loadingProjects}
            selectProject={(project_id) => projectsHook.utils.selectProject(project_id,
                  projectsHook.projects,
                  projectsHook.utils.setProjectNow,
                  projectsHook.setProjectState,
                  projectsHook.resetUpdateProjectModal,
                  projectsHook.clearUpdateErrors,
                  projectsHook.setValueUpdate,
                  projectsHook.setIsLoadingProjectResources,
                  projectsHook.onOpenUpdate)}
            viewSelectedProject={(project_id) => projectsHook.utils.viewSelectedProject(
                  project_id,
                  projectsHook.projects,
                  projectsHook.utils.setProjectNow,
                  projectsHook.setProjectState,
                  projectsHook.resetUpdateProjectModal,
                  projectsHook.clearUpdateErrors,
                  projectsHook.setValueUpdate,
                  projectsHook.setIsLoadingProjectResources,
                  projectsHook.onOpenView
            )}
            showHistoric={(id, name) => projectsHook.handles.handleShowHistoric(id,
                name,
                projectsHook.setLoadingHistoric,
                projectsHook.setProjectHistoricSelected,
                projectsHook.onOpenHistoric)}
            panelTitle="Projetos a iniciar"
            projectStatus="A_INICIAR"
          />

          {projectsHook.showFinishedProjects && (
            <ProjectsTable
              projects={projectsHook.utils.typeOfProjects(projectsHook.projectsFiltered, "CONCLUIDO")}
              loadingProjects={projectsHook.loadingProjects}
              selectProject={(project_id) => projectsHook.utils.selectProject(project_id,
                  projectsHook.projects,
                  projectsHook.utils.setProjectNow,
                  projectsHook.setProjectState,
                  projectsHook.resetUpdateProjectModal,
                  projectsHook.clearUpdateErrors,
                  projectsHook.setValueUpdate,
                  projectsHook.setIsLoadingProjectResources,
                  projectsHook.onOpenUpdate)}
              viewSelectedProject={(project_id) => projectsHook.utils.viewSelectedProject(
                  project_id,
                  projectsHook.projects,
                  projectsHook.utils.setProjectNow,
                  projectsHook.setProjectState,
                  projectsHook.resetUpdateProjectModal,
                  projectsHook.clearUpdateErrors,
                  projectsHook.setValueUpdate,
                  projectsHook.setIsLoadingProjectResources,
                  projectsHook.onOpenView
            )}
              showHistoric={(id, name) => projectsHook.handles.handleShowHistoric(id,
                name,
                projectsHook.setLoadingHistoric,
                projectsHook.setProjectHistoricSelected,
                projectsHook.onOpenHistoric)}
              panelTitle="Projetos finalizados"
              projectStatus="CONCLUIDO"
            />
          )}
        </S.PanelsContent>
        <Modal isOpen={projectsHook.isOpenNew} onClose={() => projectsHook.handles.handleCloseNewModal(projectsHook.setProjectState,
            projectsHook.resetNewProjectModal,
            projectsHook.clearNewErrors,
            projectsHook.setNewProjectResources,
            projectsHook.onCloseNew)}>
          <ModalOverlay />
          <ModalContent>
            <Box
              as="form"
              onSubmit={projectsHook.handleSubmitNewProject((values) => projectsHook.handles.handleCreateNewProject(values, projectsHook.newProjectResources, toast, () => projectsHook.handles.handleCloseNewModal(projectsHook.setProjectState, projectsHook.resetNewProjectModal, projectsHook.clearNewErrors,projectsHook.setNewProjectResources, projectsHook.onCloseNew)))}
            >
              <ModalHeader>Cadastro de projetos</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexDir={"column"} gap={4}>
                  <Input
                    maxLength={50}
                    label="Nome"
                    placeholder="W3haus, Paquetá..."
                    error={projectsHook.formState.errors.name}
                    {...projectsHook.registerNewProject("name")}
                  />
                  <Flex direction={"row"} gap="10px">
                    <FormControl isInvalid={!!projectsHook.formState.errors.status}>
                      <FormLabel>Status</FormLabel>
                      <ChakraSelect
                        placeholder="Selecione..."
                        {...projectsHook.registerNewProject("status")}
                        onChange={(e) => projectsHook.handles.handleStatusChange(e, projectsHook.setProjectStatus)}
                      >
                        <option value="EM_ANDAMENTO">Em andamento</option>
                        <option value="A_INICIAR">À iniciar</option>
                        <option value="CONCLUIDO">Concluído</option>
                      </ChakraSelect>
                      <FormErrorMessage>
                        {projectsHook.formState.errors.status &&
                          projectsHook.formState.errors.status.message!.toString()}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!projectsHook.formState.errors.type}>
                      <FormLabel>Tipo</FormLabel>
                      <ChakraSelect
                        placeholder="Selecione..."
                        {...projectsHook.registerNewProject("type")}
                      >
                        <option value="PF">PF</option>
                        <option value="PR">PR</option>
                      </ChakraSelect>
                      <FormErrorMessage>
                        {projectsHook.formState.errors.type &&
                          projectsHook.formState.errors.type.message!.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>

                  {projectsHook.projectStatus === "A_INICIAR" && (
                    <Flex justifyContent="space-between" alignItems="center">
                      <FormLabel htmlFor="name">
                        Sem estimativa de inicio
                      </FormLabel>
                      <Switch
                        id="name"
                        isChecked={projectsHook.switchEstimate}
                        onChange={() => projectsHook.handles.handleSwitchToggle(projectsHook.setSwitchEstimate, projectsHook.switchEstimate)}
                      />
                    </Flex>
                  )}

                  <Flex gap="10px">
                    {!projectsHook.switchEstimate ? (
                      <>
                        <FormControl
                          isInvalid={!!projectsHook.formState.errors.start_estimate}
                        >
                          <Controller
                            control={projectsHook.control}
                            name="start_estimate"
                            render={({ field: { onChange, value } }) => {
                              console.log(value, "VALOR DO INPUT");

                              return (
                                <InputDate
                                  {...(projectsHook.getValues("status") === "EM_ANDAMENTO" ||
                                    projectsHook.getValues("status") === "CONCLUIDO"
                                    ? { maxDate: new Date() }
                                    : {})}
                                  label="Data de início"
                                  dateFormat="dd/MM/yyyy"
                                  locale={ptBR}
                                  onChange={onChange}
                                  onBlur={onChange}
                                  selected={value}
                                />
                              );
                            }}
                          />
                          <FormErrorMessage>
                            {projectsHook.formState.errors.start_estimate &&
                              projectsHook.formState.errors.start_estimate.message!.toString()}
                          </FormErrorMessage>
                        </FormControl>
                      </>
                    ) : null}
                    {projectsHook.watchType === "PF" && (
                      <FormControl isInvalid={!!projectsHook.formState.errors.end_estimate}>
                        <Controller
                          control={projectsHook.control}
                          name="end_estimate"
                          render={({ field: { onChange, value } }) => (
                            <InputDate
                              minDate={new Date()}
                              label="Finalização"
                              dateFormat="dd/MM/yyyy"
                              locale={ptBR}
                              onChange={onChange}
                              onBlur={onChange}
                              selected={value}
                            />
                          )}
                        />
                        <FormErrorMessage>
                          {projectsHook.formState.errors.end_estimate &&
                            projectsHook.formState.errors.end_estimate.message!.toString()}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Flex>

                  <Flex justifyContent={"space-between"} gap="10px">
                    <FormControl
                      isInvalid={!!projectsHook.formState.errors.hours}
                      maxWidth="min-content"
                    >
                      <FormLabel htmlFor="hours">Horas</FormLabel>
                      <NumberInput
                        size="md"
                        width={"100px"}
                        defaultValue={0}
                        min={0}
                        max={9999}
                      >
                        <NumberInputField
                          id="hours"
                          {...projectsHook.registerNewProject("hours")}
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>
                        {projectsHook.formState.errors.hours &&
                          projectsHook.formState.errors.hours.message!.toString()}
                      </FormErrorMessage>
                    </FormControl>

                    {projectsHook.projectState && (
                      <FormControl
                        isInvalid={!!projectsHook.formState.errors.hoursInProgress}
                        maxWidth="min-content"
                      >
                        <FormLabel htmlFor="hoursInProgress">
                          Horas em andamento
                        </FormLabel>
                        <NumberInput
                          size="md"
                          width={"100px"}
                          value={projectsHook.projectState.resources.totalHoursAmount}
                          min={0}
                          max={9999}
                        >
                          <NumberInputField
                            id="hoursInProgress"
                            {...projectsHook.registerNewProject("hoursInProgress")}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>
                          {projectsHook.formState.errors.hoursInProgress &&
                            projectsHook.formState.errors.hoursInProgress.message!.toString()}
                        </FormErrorMessage>
                      </FormControl>
                    )}

                    <FormControl isInvalid={!!projectsHook.formState.errors.customer_id}>
                      <FormLabel>Cliente</FormLabel>
                      <ChakraSelect {...projectsHook.registerNewProject("customer_id")}>
                        <option value={0}>Selecione...</option>
                        {projectsHook.customers.length > 0 &&
                          projectsHook.customers.map((c) => (
                            <option key={c.id + c.name} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                      </ChakraSelect>
                      <FormErrorMessage>
                        {projectsHook.formState.errors.customer_id &&
                          projectsHook.formState.errors.customer_id.message!.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <Flex>
                    <FormControl isInvalid={!!projectsHook.formState.errors.responsible_id}>
                      <FormLabel>Líder</FormLabel>
                      <ChakraSelect
                        isDisabled={projectsHook.isLoadingResponsibles}
                        {...projectsHook.registerNewProject("responsible_id")}
                      >
                        <option value={0}>Selecione...</option>
                        {projectsHook.responsibles.length > 0 &&
                          projectsHook.responsibles.map((r) => (
                            <option key={r.id + r.name} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                      </ChakraSelect>
                      <FormErrorMessage>
                        {projectsHook.formState.errors.responsible_id &&
                          projectsHook.formState.errors.responsible_id.message!.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <Flex>
                    <FormControl>
                      <FormLabel>Colaboradores do Projeto</FormLabel>
                      {projectsHook.isLoadingResources ? (
                        <Skeleton width={"100%"} height="35px" />
                      ) : (
                        <Select
                          isMulti={true}
                          noOptionsMessage={() => "Sem mais Colaborades"}
                          onChange={(newResource: any) => 
                            projectsHook.handles.handleAddResourceToProject(
                            newResource, 
                            projectsHook.newProjectResources, 
                            projectsHook.setNewProjectResources
                          )
                        }
                          placeholder="Adicione mais colaboradores"
                          value={null}
                          options={projectsHook.resources}
                        />
                      )}
                    </FormControl>
                  </Flex>
                  <Flex gap="8px" flexWrap={"wrap"}>
                    {projectsHook.newProjectResources.map((a) => (
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
                                a.hours_left - a.project_hours < 0
                                  ? "red"
                                  : "black"
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
                                    projectsHook.utils.updateProjectResourceHours(
                                      a.id, Number(e), projectsHook.newProjectResources, projectsHook.setNewProjectResources)
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
                                  onClick={() =>
                                    projectsHook.utils.removeResourceFromProject( a.id, 
                                    projectsHook.newProjectResources,
                                    projectsHook.setNewProjectResources)
                                  }
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
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={() => projectsHook.handles.handleCloseNewModal(
                        projectsHook.setProjectState,
                        projectsHook.resetNewProjectModal,
                        projectsHook.clearNewErrors,
                        projectsHook.setNewProjectResources,
                        projectsHook.onCloseNew
                    )}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  colorScheme="blue"
                  disabled={projectsHook.isLoadingCreating}
                >
                  {projectsHook.isLoadingCreating ? <Spinner /> : "Cadastrar"}
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </Modal>
        <Modal isOpen={projectsHook.isOpenUpdate} onClose={projectsHook.onCloseUpdate}>
          <ModalOverlay />
          <ModalContent>
            <Box
              as="form"
              onSubmit={projectsHook.handleSubmitUpdateProject((values) => projectsHook.handles.handleUpdateProject(
                values,
                projectsHook.projectState,
                projectsHook.setProjectHistoricSelected,
                projectsHook.setIsLoadingUpdating, toast, projectsHook.onCloseUpdate
                ))}
            >
              <ModalHeader>{projectsHook.projectState?.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {projectsHook.projectState && (
                  <Flex flexDir={"column"} gap={4}>
                    <Input
                      label="Nome"
                      placeholder="W3haus, Paquetá..."
                      error={projectsHook.formStateUpdate.errors.name}
                      defaultValue={projectsHook.projectState.name}
                      {...projectsHook.registerUpdateProject("name")}
                    />
                    <Flex direction={"row"} gap="10px">
                      <FormControl isInvalid={!!projectsHook.formStateUpdate.errors.status}>
                        <FormLabel>Status</FormLabel>
                        <ChakraSelect
                          placeholder="Selecione..."
                          defaultValue={projectsHook.projectState.status}
                          {...projectsHook.registerUpdateProject("status", {
                            onChange: () => {
                              if (projectsHook.getValuesUpdate("status") !== "CONCLUIDO") {
                                projectsHook.setValueUpdate("start_estimate", null);
                              }
                            },
                          })}
                        >
                          <option value="EM_ANDAMENTO">Em andamento</option>
                          <option value="A_INICIAR">À iniciar</option>
                          <option value="CONCLUIDO">Concluído</option>
                        </ChakraSelect>
                        <FormErrorMessage>
                          {projectsHook.formStateUpdate.errors.status &&
                            projectsHook.formStateUpdate.errors.status.message!.toString()}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!projectsHook.formStateUpdate.errors.type}>
                        <FormLabel>Tipo</FormLabel>
                        <ChakraSelect
                          placeholder="Selecione..."
                          defaultValue={projectsHook.projectState.type}
                          {...projectsHook.registerUpdateProject("type")}
                        >
                          <option value="PF">PF</option>
                          <option value="PR">PR</option>
                        </ChakraSelect>
                        <FormErrorMessage>
                          {projectsHook.formStateUpdate.errors.type &&
                            projectsHook.formStateUpdate.errors.type.message!.toString()}
                        </FormErrorMessage>
                      </FormControl>
                    </Flex>

                    <Flex justifyContent={"space-between"} gap="10px">
                      <FormControl
                        isInvalid={!!projectsHook.formStateUpdate.errors?.start_estimate}
                      >
                        <Controller
                          control={projectsHook.controlUpdate}
                          name="start_estimate"
                          render={({ field: { onChange, value } }) => {
                            const selectedDate = isValid(new Date(value))
                              ? new Date(value)
                              : null;

                            return (
                              <InputDate
                                {...(projectsHook.watchStatusUpdate &&
                                  (projectsHook.getValuesUpdate("status") === "EM_ANDAMENTO" ||
                                    projectsHook.getValuesUpdate("status") === "CONCLUIDO")
                                  ? { maxDate: new Date() }
                                  : {})}
                                {...(projectsHook.watchStatusUpdate &&
                                  projectsHook.getValuesUpdate("status") === "A_INICIAR"
                                  ? { minDate: addDays(new Date(), 1) }
                                  : {})}
                                label="Data de início"
                                dateFormat="dd/MM/yyyy"
                                locale={ptBR}
                                onChange={onChange}
                                onBlur={onChange}
                                selected={selectedDate}
                              />
                            );
                          }}
                        />
                        <FormErrorMessage>
                          {projectsHook.formStateUpdate.errors.start_estimate &&
                            projectsHook.formStateUpdate.errors.start_estimate.message!.toString()}
                        </FormErrorMessage>
                      </FormControl>
                      {projectsHook.watchTypeUpdate === "PF" && (
                        <FormControl
                          isInvalid={!!projectsHook.formStateUpdate.errors.end_estimate}
                        >
                          <Controller
                            control={projectsHook.controlUpdate}
                            name="end_estimate"
                            render={({ field: { onChange, value } }) => (
                              <InputDate
                                minDate={new Date()}
                                label="Estimativa de finalização"
                                dateFormat="dd/MM/yyyy"
                                locale={ptBR}
                                onChange={onChange}
                                onBlur={onChange}
                                selected={value}
                              />
                            )}
                          />
                          <FormErrorMessage>
                            {projectsHook.formStateUpdate.errors.end_estimate &&
                              projectsHook.formStateUpdate.errors.end_estimate.message!.toString()}
                          </FormErrorMessage>
                        </FormControl>
                      )}

                      {projectsHook.watchTypeUpdate === "PR" && (
                        <FormControl
                          isInvalid={!!projectsHook.formStateUpdate.errors.end_estimate}
                        >
                          <Controller
                            control={projectsHook.controlUpdate}
                            name="end_estimate"
                            render={({ field: { onChange, value } }) => (
                              <InputDate
                                minDate={new Date()}
                                label="Estimativa de finalização"
                                dateFormat="dd/MM/yyyy"
                                locale={ptBR}
                                onChange={onChange}
                                onBlur={onChange}
                                selected={value}
                              />
                            )}
                          />
                          <FormErrorMessage>
                            {projectsHook.formStateUpdate.errors.end_estimate &&
                              projectsHook.formStateUpdate.errors.end_estimate.message!.toString()}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Flex>

                    <Flex justifyContent={"space-between"} gap="10px">
                      <FormControl
                        isInvalid={!!projectsHook.formStateUpdate.errors.hours}
                        maxWidth="min-content"
                      >
                        <FormLabel htmlFor="hours">Horas contratadas</FormLabel>
                        <NumberInput
                          size="md"
                          width={"200px"}
                          defaultValue={projectsHook.projectState.hours}
                          min={0}
                          max={9999}
                        >
                          <NumberInputField
                            id="hours"
                            {...projectsHook.registerUpdateProject("hours")}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>
                          {projectsHook.formStateUpdate.errors.hours &&
                            projectsHook.formStateUpdate.errors.hours.message!.toString()}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={!!projectsHook.formStateUpdate.errors.hoursInProgress}
                        maxWidth="min-content"
                      >
                        <FormLabel htmlFor="hoursInProgress">
                          Horas em andamento
                        </FormLabel>
                        <NumberInput
                          isDisabled
                          size="md"
                          width={"200px"}
                          value={projectsHook.projectState.resources.totalHoursAmount}
                          min={0}
                          max={9999}
                        >
                          <NumberInputField
                            id="hoursInProgress"
                            {...projectsHook.registerUpdateProject("hoursInProgress")}
                          />
                        </NumberInput>
                        <FormErrorMessage>
                          {projectsHook.formStateUpdate.errors.hoursInProgress &&
                            projectsHook.formStateUpdate.errors.hoursInProgress.message!.toString()}
                        </FormErrorMessage>
                      </FormControl>
                    </Flex>
                    <Flex>
                      <FormControl
                        isInvalid={!!projectsHook.formStateUpdate.errors.customer_id}
                      >
                        <FormLabel>Cliente</FormLabel>
                        <ChakraSelect
                          defaultValue={projectsHook.projectState.customer.id}
                          {...projectsHook.registerUpdateProject("customer_id")}
                        >
                          <option value={0}>Selecione...</option>
                          {projectsHook.allCustomers.length > 0 &&
                            projectsHook.allCustomers.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                        </ChakraSelect>
                        <FormErrorMessage>
                          {projectsHook.formStateUpdate.errors.customer_id &&
                            projectsHook.formStateUpdate.errors.customer_id.message!.toString()}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={!!projectsHook.formStateUpdate.errors.responsible_id}
                      >
                        <FormLabel>Líder</FormLabel>
                        <ChakraSelect
                          isDisabled={projectsHook.isLoadingResponsibles}
                          defaultValue={
                            projectsHook.projectState.responsible
                              ? projectsHook.projectState.responsible.id
                              : 0
                          }
                          {...projectsHook.registerUpdateProject("responsible_id")}
                        >
                          <option value={0}>Selecione...</option>
                          {projectsHook.responsibles.length > 0 &&
                            projectsHook.responsibles.map((r) => (
                              <option key={r.id + r.name} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                        </ChakraSelect>
                        <FormErrorMessage>
                          {projectsHook.formStateUpdate.errors.responsible_id &&
                            projectsHook.formStateUpdate.errors.responsible_id.message!.toString()}
                        </FormErrorMessage>
                      </FormControl>
                    </Flex>
                    <Flex>
                      <FormControl>
                        <FormLabel>Colaboradores</FormLabel>
                        <Select
                          isDisabled={projectsHook.isLoadingProjectResources}
                          isMulti={true}
                          noOptionsMessage={() => "Sem mais Colaboradores"}
                          onChange={(newResource: any) => projectsHook.handles.handleAddOrRemoveResourceToSelectedProject( newResource,
                              projectsHook.projectState,
                              projectsHook.projects,
                              projectsHook.setProjects,
                              projectsHook.setProjectState,  
                              projectsHook.handles.handleRemoveResourceFromProject,
                              projectsHook.handles.handleUpdateResourceHours
                            )}
                          placeholder="Adicione mais colaboradores"
                          value={null}
                          options={projectsHook.resources}
                        />
                      </FormControl>
                    </Flex>
                    <Flex gap="8px" flexWrap={"wrap"}>
                      {projectsHook.isLoadingProjectResources ? (
                        <>
                          <SkeletonCircle size="14" />
                          <SkeletonCircle size="14" />
                          <SkeletonCircle size="14" />
                          <SkeletonCircle size="14" />
                          <SkeletonCircle size="14" />
                          <SkeletonCircle size="14" />
                        </>
                      ) : (
                        <>
                          {projectsHook.projectState ? (
                            <>
                              {projectsHook.projectState.resources.projectResource.map(
                                (a) => {
                                  return (
                                    <Popover key={`${projectsHook.projectState?.id ?? 'no-id'}-${a.id}`}>
                                      <PopoverTrigger>
                                        <S.AvatarContainer>
                                          {a.hours_left < 0 && (
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
                                              <HiExclamationCircle
                                                color="red"
                                                size={24}
                                              />
                                            </Flex>
                                          )}
                                          <Avatar
                                            zIndex={-1}
                                            objectFit={"cover"}
                                            borderRadius="full"
                                            boxSize="50px"
                                            style={
                                              a.departure_forecast != null
                                                ? { border: "1px solid red" }
                                                : { border: "none" }
                                            }
                                            name={a.name}
                                            src={a.photo_url}
                                          />
                                        </S.AvatarContainer>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        width={"max-content"}
                                        maxWidth="350px"
                                      >
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>
                                          <Flex direction="column" gap="10px">
                                            <Text>{a.name}</Text>
                                            {a.hours_left < 0 && (
                                              <Alert
                                                status="error"
                                                padding="5px"
                                              >
                                                Esse colaborador excedeu as
                                                horas disponíveis
                                              </Alert>
                                            )}
                                          </Flex>
                                        </PopoverHeader>
                                        <PopoverBody>
                                          {a.departure_forecast ? (
                                            <Text>
                                              Data de Saída:{" "}
                                              {new Date(
                                                a.departure_forecast
                                              ).toLocaleDateString()}
                                            </Text>
                                          ) : null}
                                          <Text>
                                            Horas cadastradas: {a.hours_amount}
                                          </Text>
                                          <Text>
                                            Horas livres:{" "}
                                            {a.hours_left <= 0
                                              ? 0
                                              : a.hours_left}
                                          </Text>
                                          <Text>
                                            <b>
                                              Horas atuais nesse projeto:{" "}
                                              {a.project_hours}
                                            </b>
                                          </Text>
                                          <Text
                                            color={
                                              a.hours_left < 0 ? "red" : "black"
                                            }
                                          >
                                            Horas excedentes:{" "}
                                            {a.hours_left <= 0
                                              ? a.hours_left * -1
                                              : 0}
                                          </Text>
                                          <FormControl maxWidth="max-content">
                                            <FormLabel htmlFor="hours-amount">
                                              Alterar horas para este projeto
                                            </FormLabel>
                                            <Flex direction="column" gap="10px">
                                              <Flex gap="10px">
                                                <NumberInput
                                                  isDisabled={
                                                    projectsHook.isLoadingUpdateResourceHours ===
                                                    a.id
                                                  }
                                                  size="md"
                                                  width={"100px"}
                                                  min={0}
                                                  max={9999}
                                                  // value={a.project_hours}
                                                  onChange={(e) =>
                                                    projectsHook.handles.handleUpdateProjectResourceHoursFromProjectSelected(
                                                      a.id, Number(e), projectsHook.projectState, projectsHook.setProjectState
                                                    )
                                                  }
                                                >
                                                  <NumberInputField />
                                                  <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                  </NumberInputStepper>
                                                </NumberInput>
                                                <Button
                                                  disabled={
                                                    projectsHook.isLoadingUpdateResourceHours ===
                                                    a.id
                                                  }
                                                  type="button"
                                                  colorScheme={"blue"}
                                                  onClick={() =>
                                                    projectsHook.handles.handleUpdateProjectSelectedResourceHours(
                                                      a.id, projectsHook.projectState, projectsHook.projects, projectsHook.setProjects, projectsHook.setIsLoadingUpdateResourceHours, toast
                                                    )
                                                  }
                                                >
                                                  Atualizar{" "}
                                                  {projectsHook.isLoadingUpdateResourceHours ===
                                                    a.id && (
                                                      <Spinner ml="2px" />
                                                    )}
                                                </Button>
                                              </Flex>
                                              <Button
                                                disabled={
                                                  projectsHook.isLoadingUpdateResourceHours ===
                                                  a.id
                                                }
                                                type="button"
                                                colorScheme={"red"}
                                                onClick={() =>
                                                  projectsHook.handles.handleOpenModalDelete(a.id, projectsHook.setIdUserToDelete, projectsHook.onOpenDelete)
                                                }
                                              >
                                                Remover do projeto
                                              </Button>
                                            </Flex>
                                          </FormControl>
                                        </PopoverBody>
                                      </PopoverContent>
                                    </Popover>
                                  );
                                }
                              )}
                            </>
                          ) : (
                            <Text>Projeto não contém colaboradores</Text>
                          )}
                        </>
                      )}
                    </Flex>
                  </Flex>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={projectsHook.onCloseUpdate}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  colorScheme="blue"
                  disabled={projectsHook.isLoadingUpdating}
                >
                  {projectsHook.isLoadingUpdating ? <Spinner /> : "Atualizar"}
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </Modal>
        <Modal isOpen={projectsHook.isOpenDelete} onClose={projectsHook.onCloseDelete}>
          <ModalOverlay />
          <ModalContent>
            <Box
              style={{ paddingBottom: "20px" }}
              as="form"
              onSubmit={projectsHook.handleSubmitDeleteProject(
                (values) => projectsHook.handles.handleSelectOutputEstimateDate(values, 
                    projectsHook.idUserToDelete, 
                    projectsHook.setShowDateDeleteUserFromProject, 
                    projectsHook.onCloseDelete, 
                    toast)
              )}
            >
              <ModalHeader>Você tem certeza que deseja remover esse colaborador?</ModalHeader>
              <ModalCloseButton />
              <ModalBody display="flex" gap="10px" flexDirection="column">
                <ModalFooter
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="ghost" mr={3} onClick={projectsHook.onCloseDelete}>
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    colorScheme="red"
                    onClick={() => projectsHook.handles.handleRemoveResourceFromSelectedProject(
                      projectsHook.idUserToDelete!,
                      projectsHook.projectState,
                      projectsHook.projects,
                      projectsHook.setProjects,
                      projectsHook.setProjectState,
                      toast,
                      projectsHook.onCloseDelete)}
                  >
                    Remover do projeto
                  </Button>
                </ModalFooter>
              </ModalBody>
            </Box>
          </ModalContent>
        </Modal>
        <Modal isOpen={projectsHook.isOpenView} onClose={() => projectsHook.handles.handleCloseProjectView(history,
            projectsHook.onCloseView)}>
          <ModalOverlay />
          <ModalContent>
            <Box>
              <ModalHeader mr={35}>{projectsHook.projectState?.name}</ModalHeader>
              <ModalCloseButton width={"25px"} height={"25px"} />
              {projectsHook.projectState && (
                <ModalBody>
                  <Flex flexDir={"column"} gap={4}>
                    <FormControl>
                      <FormLabel htmlFor="hours">Nome</FormLabel>
                      <Text>{projectsHook.projectState.name}</Text>
                    </FormControl>
                    <Flex justifyContent={"space-between"} gap="10px">
                      <FormControl>
                        <FormLabel>Status</FormLabel>
                        <Text>
                          {projectsHook.utils.projectStatusDescription(projectsHook.projectState.status)}
                        </Text>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Tipo</FormLabel>
                        <Text>{projectsHook.projectState.type}</Text>
                      </FormControl>
                    </Flex>
                    <Flex gap="10px">
                      <FormControl>
                        <FormLabel>Data de início</FormLabel>
                        {projectsHook.projectState.start_estimate &&
                          isValid(new Date(projectsHook.projectState.start_estimate)) ? (
                          <Text>
                            {format(
                              new Date(projectsHook.projectState.start_estimate),
                              "dd/MM/yyyy"
                            )}
                          </Text>
                        ) : (
                          <Text>Não disponível</Text>
                        )}
                      </FormControl>
                      {projectsHook.projectState.end_estimate && (
                        <FormControl>
                          <FormLabel>Estimativa de finalização</FormLabel>
                          <Text>
                            {format(projectsHook.projectState.end_estimate, "dd/MM/yyyy")}
                          </Text>
                        </FormControl>
                      )}
                    </Flex>
                    {projectsHook.projectState && (
                      <Flex justifyContent={"space-between"} gap="10px">
                        <FormControl>
                          <FormLabel htmlFor="hours">
                            Horas contratadas
                          </FormLabel>
                          <Text>{projectsHook.projectState.hours}</Text>
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="hoursInProgress">
                            Horas em andamento
                          </FormLabel>
                          <Text>{projectsHook.projectState.resources.totalHoursAmount}</Text>
                        </FormControl>
                      </Flex>
                    )}
                    <Flex>
                      <FormControl>
                        <FormLabel>Cliente</FormLabel>
                        <Text>{projectsHook.projectState.customer.name}</Text>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Líder</FormLabel>
                        <Text>
                          {projectsHook.projectState.responsible
                            ? projectsHook.projectState.responsible?.name
                            : "Sem líder"}
                        </Text>
                      </FormControl>
                    </Flex>
                    <Flex>
                      <FormControl>
                        <FormLabel>Colaboradores</FormLabel>
                      </FormControl>
                    </Flex>
                    <Flex gap="8px" flexWrap={"wrap"}>
                      {projectsHook.projectState &&
                        projectsHook.projectState.resources.projectResource ? (
                        <>
                          {projectsHook.projectState.resources.projectResource.map((a) => (
                            <Popover key={`${projectsHook.projectState?.id ?? 'no-id'}-${a.id}`}>
                              <PopoverTrigger>
                                <S.AvatarContainer>
                                  {a.hours_left < 0 && (
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
                                      <HiExclamationCircle
                                        color="red"
                                        size={24}
                                      />
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
                                    {a.hours_left < 0 && (
                                      <Alert status="error" padding="5px">
                                        Esse colaborador excedeu as horas
                                        disponíveis
                                      </Alert>
                                    )}
                                  </Flex>
                                </PopoverHeader>
                                <PopoverBody>
                                  <Text>
                                    horas cadastradas: {a.hours_amount}
                                  </Text>
                                  <Text>
                                    horas livres:{" "}
                                    {a.hours_left <= 0 ? 0 : a.hours_left}
                                  </Text>
                                  <Text
                                    color={a.hours_left < 0 ? "red" : "black"}
                                  >
                                    horas excedentes:{" "}
                                    {a.hours_left <= 0 ? a.hours_left * -1 : 0}
                                  </Text>
                                  <Text>
                                    horas para este projeto: {a.project_hours}
                                  </Text>
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          ))}
                        </>
                      ) : null}
                    </Flex>
                  </Flex>
                </ModalBody>
              )}
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={() => projectsHook.handles.handleCloseProjectView(history,
                  projectsHook.onCloseView)}>
                  Fechar
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={projectsHook.isOpenHistoric}
          onClose={() => projectsHook.handles.handleOnCloseProjectHistoricModal(projectsHook.setProjectHistoricSelected,
              projectsHook.setHistoric,
              projectsHook.onCloseHistoric)}
          size={"xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <Box>
              <ModalHeader>{projectsHook.projectHistoricSelected.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {projectsHook.loadingHistoric ? (
                  <Spinner size="lg" />
                ) : (
                  <>
                    {projectsHook.historic.length > 0 ? (
                      <Flex flexDirection={"column"}>
                        {projectsHook.historic.map((h) => (
                          <Flex key={h.uuid} minHeight="100px">
                            <Flex
                              position="relative"
                              minWidth="60px"
                              alignItems={"center"}
                              marginLeft="10px"
                            >
                              <Box
                                position="absolute"
                                zIndex="1"
                                left="-14px"
                                borderRadius={"50%"}
                                bgColor="white"
                                padding="5px"
                              >
                                {typeHistoricIcon(h.type)}
                              </Box>
                              <Divider
                                opacity="1"
                                borderLeftWidth={"2px"}
                                orientation="vertical"
                              />
                            </Flex>
                            <Flex
                              flexDirection={"column"}
                              justifyContent="center"
                            >
                              <Text
                                dangerouslySetInnerHTML={{
                                  __html: `${h.description}`,
                                }}
                              />
                              <Text color="gray">
                                {h.created_at.toString()}
                              </Text>
                            </Flex>
                          </Flex>
                        ))}
                        {projectsHook.historicFilter.current_page <
                          projectsHook.historicFilter.last_page && (
                            <Button
                              disabled={projectsHook.loadingMoreHistoric}
                              marginTop={"10px"}
                              width={"max-content"}
                              onClick={() => projectsHook.handles.handleLoadMoreHistoric(projectsHook.setLoadingMoreHistoric,
                                projectsHook.setHistoricFilter)}
                            >
                              {projectsHook.loadingMoreHistoric && <Spinner mr={"5px"} />}
                              Carregar mais
                            </Button>
                          )}
                      </Flex>
                    ) : (
                      <Text>Não há histórico</Text>
                    )}
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={() => projectsHook.handles.handleOnCloseProjectHistoricModal(projectsHook.setProjectHistoricSelected,
                  projectsHook.setHistoric,
                  projectsHook.onCloseHistoric)}>
                  Fechar
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </Modal>
      </S.Container>
    </>
  );
};

export default Projects;