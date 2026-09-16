import * as S from "./styles";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  WrapItem,
  Alert,
  Switch,
  Input as ChakraInput,
  Select as ChakraSelect,
  Select,
  CheckboxGroup,
  Checkbox,
  AlertTitle,
  AlertIcon,
  Text,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { ClassificationProps, LeaderProps } from "../../interfaces";
import { Controller, useWatch } from "react-hook-form";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Input from "../../../../components/Forms/Input";
import InputDate from "../../../../components/Forms/InputDate";
import ptBR from "date-fns/locale/pt-BR";
import * as yup from 'yup';
import { useResource } from "../../Models";

export const updateResourceSchema = yup.object().shape({
  name: yup.string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ0-9 _#-]+$/, 'Nome contém caracteres inválidos'),
  email: yup.string()
    .required('Email é obrigatório')
    .email('Email inválido'),
  hours_amount: yup.number()
    .required('Quantidade de horas é obrigatória')
    .min(0, 'A quantidade de horas deve ser maior ou igual a 0'),
  status: yup.string()
    .required('Status é obrigatório'),
  admission_date: yup.date()
    .required('Data de admissão é obrigatória'),
  vacation_date: yup.date()
    .nullable()
    .test('isAfterAdmission', 'Data de saída de férias deve ser posterior à data de admissão', function(value) {
      const admissionDate = this.parent.admission_date;
      if (!value || !admissionDate) return true;
      return new Date(value) > new Date(admissionDate);
    }),
  backFromVacation: yup.date()
    .nullable()
    .test('isAfterVacation', 'Data de retorno de férias deve ser posterior à data de saída de férias', function(value) {
      const vacationDate = this.parent.vacation_date;
      if (!value || !vacationDate) return true;
      return new Date(value) > new Date(vacationDate);
    }),
});

export function UpdateModal({ onCloseUpdate }: { onCloseUpdate: any }) {
  const resourceHook = useResource()

  const watchHoursAmountUpdate = useWatch({
    control: resourceHook.context.write.controlUpdate,
    name: "hours_amount",
  });

  const watchClassificationUpdate = useWatch({
    control: resourceHook.context.write.controlUpdate,
    name: "classification_id",
  });

  const watchStatusUpdate = useWatch({
    control: resourceHook.context.write.controlUpdate,
    name: "status",
  });

  const watchVacationDate = useWatch({
    control: resourceHook.context.write.controlUpdate,
    name: "vacation_date",
  });

  useEffect(() => {
    if (resourceHook.context.read.selectedResource) {
      resourceHook.services.filterLeaderById(
        resourceHook.context.read.selectedResource.leader_id,
        resourceHook.context.read.leadersComplete,
        resourceHook.context.write.setSelectedLeader
      );
    }
  }, [resourceHook.context.read.selectedResource, resourceHook.context.read.leadersComplete]);

  useMemo(() => {
    if (watchClassificationUpdate !== "4") {
      resourceHook.context.write.setValueUpdate("types_ids", []);
    }
  }, [watchClassificationUpdate]);

  useMemo(() => {
    if (watchStatusUpdate === "INATIVO") {
      resourceHook.context.write.setValueUpdate("hours_amount", 0);
    }
  }, [watchStatusUpdate]);

  return (
    <ModalContent>
      {resourceHook.context.read.selectedResource && (
        <Box as="form" onSubmit={resourceHook.context.write.handleSubmitUpdateResource((values: any) => resourceHook.handles.handleOnSubmit(
          values, {
                selectedResource: resourceHook.context.read.selectedResource,
                toast: resourceHook.toast,
                leaderId: resourceHook.context.read.leaderId,
                resources: resourceHook.context.read.resources,
                setResourcesValues: resourceHook.context.write.setResourcesValues,
                setResourcesFilteredValues: resourceHook.context.write.setResourcesFilteredValues,
                resetUpdateResourceModal: resourceHook.context.write.resetUpdateResourceModal,
                clearUpdateErrors: resourceHook.context.write.clearUpdateErrors,
                onCloseUpdate,
                handleUpdateResource: resourceHook.handles.handleUpdateResource
            }
            ))}>
          <ModalHeader>{resourceHook.context.read.selectedResource.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems="center" justifyContent="center">
              <WrapItem position="relative">
                <Avatar
                  border="2px solid red"
                  size="2xl"
                  name={resourceHook.context.read.selectedResource?.name}
                  src={resourceHook.context.read.selectedResource?.photo_url}
                />
                <FormLabel
                  cursor="pointer"
                  htmlFor="resource_photo"
                  position="absolute"
                  height={"100%"}
                  width={"100%"}
                >
                  <ChakraInput
                    name="photo"
                    display="none"
                    id="resource_photo"
                    type="file"
                    onChange={(e) => resourceHook.handles.handlePhotoUpdate(
                      e,
                      {
                        selectedResource: resourceHook.context.read.selectedResource,
                        resources: resourceHook.context.read.resources, 
                        setResources: resourceHook.context.write.setResourcesValues, 
                        setSelectedResource: resourceHook.context.write.setSelectedResourceValue 
                      }, 
                      resourceHook.toast
                    )}
                  />
                </FormLabel>
              </WrapItem>
            </Flex>
            <Flex flexDir={"column"} gap={4}>
              <FormControl>
                <Input
                  contentEditable
                  defaultValue={resourceHook.context.read.selectedResource?.name}
                  label="Nome"
                  placeholder="W3haus, Paquetá..."
                  error={resourceHook.context.write.formStateUpdate.errors.name}
                  maxLength={50}
                  {...resourceHook.context.write.registerUpdateResource("name")}
                />
                <FormErrorMessage>
                  {resourceHook.context.write.formStateUpdate.errors.name?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <Input
                  contentEditable
                  defaultValue={resourceHook.context.read.selectedResource?.email}
                  label="Email"
                  placeholder="fulano@testingcompany.com.br"
                  error={resourceHook.context.write.formStateUpdate.errors.email}
                  {...resourceHook.context.write.registerUpdateResource("email")}
                />
                <FormErrorMessage>
                  {resourceHook.context.write.formStateUpdate.errors.email?.message}
                </FormErrorMessage>
              </FormControl>
              <Flex justifyContent={"space-between"} gap="10px">
                <FormControl isInvalid={!!resourceHook.context.write.formStateUpdate.errors.admission_date}>
                  <Controller
                    control={resourceHook.context.write.controlUpdate}
                    name="admission_date"
                    render={({ field: { value } }) => (
                      <S.Pointer>
                        <InputDate
                          label="Data de admissão"
                          dateFormat="dd/MM/yyyy"
                          locale={ptBR}
                          selected={value}
                          readOnly 
                          disabled={true}
                          tabIndex={-1}
                          onChange={() => {}}
                        />
                      </S.Pointer>
                    )}
                  />
                  <FormErrorMessage>
                    {resourceHook.context.write.formStateUpdate.errors.admission_date &&
                      resourceHook.context.write.formStateUpdate.errors.admission_date.message!.toString()}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!resourceHook.context.write.formStateUpdate.errors.vacation_date}>
                  <Controller
                    control={resourceHook.context.write.controlUpdate}
                    name="vacation_date"
                    render={({ field: { onChange, value } }) => (
                      <InputDate
                        label="Saída de férias"
                        dateFormat="dd/MM/yyyy"
                        locale={ptBR}
                        onChange={onChange}
                        onBlur={onChange}
                        selected={value}
                        minDate={resourceHook.context.read.selectedResource?.admission_date ? new Date(resourceHook.context.read.selectedResource.admission_date) : undefined}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {resourceHook.context.write.formStateUpdate.errors.vacation_date?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex>
                <FormControl isInvalid={!!resourceHook.context.write.formStateUpdate.errors.backFromVacation}>
                  <Controller
                    control={resourceHook.context.write.controlUpdate}
                    name="backFromVacation"
                    render={({ field: { onChange, value } }) => (
                      <InputDate
                        label="Retorno de férias"
                        locale={ptBR}
                        onChange={onChange}
                        onBlur={onChange}
                        selected={value ? new Date(value) : null}
                        dateFormat="dd/MM/yyyy"
                        minDate={watchVacationDate ? new Date(watchVacationDate) : undefined}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {resourceHook.context.write.formStateUpdate.errors.backFromVacation?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>Líder</FormLabel>
                  <Controller
                    name="leader_id"
                    control={resourceHook.context.write.controlUpdate}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const selectedId = Number(e.target.value); 
                          field.onChange(selectedId); 
                          resourceHook.context.write.setSelectedLeader(e.target.selectedOptions[0]?.text || ''); 
                        }}
                        value={field.value || ""} 
                        //placeholder="Selecione um líder"
                      >
                        <option value="">Selecione um líder</option>
                        {resourceHook.context.read.leadersComplete.map((leader: LeaderProps) => (
                          <option key={leader.id} value={leader.id}>
                            {leader.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Flex>
              <Flex gap="10px">
                <FormControl>
                  <Controller
                    control={resourceHook.context.write.controlUpdate}
                    name="departure_forecast"
                    render={({ field: { onChange, value } }) => (
                      <InputDate
                        label="Previsão de saída da empresa"
                        locale={ptBR}
                        onChange={onChange}
                        onBlur={onChange}
                        selected={value}
                      />
                    )}
                  />
                </FormControl>
              </Flex>
              <Flex justifyContent={"space-between"} gap="10px">
                <FormControl isInvalid={!!resourceHook.context.write.formStateUpdate.errors.status}>
                  <FormLabel>Status</FormLabel>
                  <ChakraSelect
                    defaultValue={
                      resourceHook.context.read.selectedResource.resourceStatus.status.name
                    }
                    placeholder="Selecione..."
                    {...resourceHook.context.write.registerUpdateResource("status", {
                      onChange: (event: ChangeEvent<HTMLInputElement>) => resourceHook.handles.handleSetValueOnVerifyResourceProjectsStatus(
                        event, { selectedResource: resourceHook.context.read.selectedResource, setResourceProjectStatusValues: resourceHook.context.write.setResourceProjectStatusValues} ),
                    })}
                  >
                    <option value="ATIVO">Ativo</option>
                    <option value="FERIAS">Férias</option>
                    <option value="TREINAMENTO">Treinamento</option>
                    <option value="INATIVO">Inativo</option>
                  </ChakraSelect>
                  <FormErrorMessage>
                    {resourceHook.context.write.formStateUpdate.errors.status &&
                      resourceHook.context.write.formStateUpdate.errors.status.message!.toString()}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!resourceHook.context.write.formStateUpdate.errors.classification_id}
                >
                  <FormLabel>Classificação</FormLabel>
                  <ChakraSelect
                    defaultValue={
                      resourceHook.context.read.selectedResource.resourceClassification
                        ?.classification.id ?? 0
                    }
                    {...resourceHook.context.write.registerUpdateResource("classification_id")}
                  >
                    <option value={0}>Selecione...</option>
                    {resourceHook.context.read.classifications.map((e: ClassificationProps) => (
                      <option key={e.id} value={e.id}>
                        {e.description}
                      </option>
                    ))}
                  </ChakraSelect>
                  <FormErrorMessage>
                    {resourceHook.context.write.formStateUpdate.errors.classification_id &&
                      (resourceHook.context.write.formStateUpdate.errors.classification_id as any)
                        ?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              {watchClassificationUpdate &&
                watchClassificationUpdate === "4" && (
                  <Flex>
                    <FormControl
                      isInvalid={!!resourceHook.context.write.formStateUpdate.errors.types_ids}
                    >
                      <FormLabel>Tipos</FormLabel>
                      {resourceHook.context.read.types.length > 0 && (
                        <Controller
                          name="types_ids"
                          control={resourceHook.context.write.controlUpdate}
                          render={({ field: { ref, ...rest } }) => (
                            <CheckboxGroup
                              defaultValue={resourceHook.services.getResourceTypes({selectedResource: resourceHook.context.read.selectedResource})}
                              {...rest}
                            >
                              <Flex gap="10px">
                                {resourceHook.context.read.types.map((t: any) => (
                                  <Checkbox key={t.id} value={t.id + ""}>
                                    {t.name}
                                  </Checkbox>
                                ))}
                              </Flex>
                            </CheckboxGroup>
                          )}
                        />
                      )}
                      <FormErrorMessage>
                        {resourceHook.context.write.formStateUpdate.errors.types_ids &&
                          resourceHook.context.write.formStateUpdate.errors.types_ids.message!.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                )}
              {resourceHook.context.read.resourceProjectStatus && (
                <>
                  {resourceHook.context.read.resourceProjectStatus.isLoading ? (
                    <span>Carregando...</span>
                  ) : (
                    <>
                      {(resourceHook.context.read.resourceProjectStatus.projects_responsible > 0 ||
                        resourceHook.context.read.resourceProjectStatus.projects_as_resource >
                        0) && (
                          <Flex>
                            <Alert
                              status="warning"
                              display="flex"
                              flexDirection="column"
                              alignItems="flex-start"
                            >
                              <AlertTitle mr={2} mb={"15px"} display="flex">
                                <AlertIcon />
                                <Text>Este colaborador está:</Text>
                              </AlertTitle>
                              {resourceHook.context.read.resourceProjectStatus.projects_responsible >
                                0 && (
                                  <AlertDescription>
                                    - Atrelado como líder em {" "}
                                    {
                                      resourceHook.context.read.resourceProjectStatus
                                        .projects_responsible
                                    }
                                    {" "} projeto(s);
                                  </AlertDescription>
                                )}
                              {resourceHook.context.read.resourceProjectStatus.projects_as_resource >
                                0 && (
                                  <AlertDescription>
                                    - Atrelado como colaborador em {" "}
                                    {
                                      resourceHook.context.read.resourceProjectStatus
                                        .projects_as_resource
                                    }
                                    {" "} projeto(s);
                                  </AlertDescription>
                                )}
                              <AlertDescription mt="15px">
                                <strong>Observação:</strong>
                                Este colaborador será retirado de todos os
                                projetos.
                              </AlertDescription>
                              <CloseButton
                                position="absolute"
                                right="8px"
                                top="8px"
                              />
                            </Alert>
                          </Flex>
                        )}
                    </>
                  )}
                </>
              )}
              <Flex>
                <FormControl>
                  {watchHoursAmountUpdate > 180 && (
                    <Alert status="error" padding="5px">
                      A quantidade de horas inseridas está acima do normal
                    </Alert>
                  )}
                  <FormLabel htmlFor="hours-amount">Horas</FormLabel>
                  <NumberInput
                    pointerEvents="none"
                    size="md"
                    width={"100px"}
                    onChange={(e) => resourceHook.context.write.setValueUpdate("hours_amount", e)}
                    defaultValue={resourceHook.context.read.selectedResource?.hours_amount}
                    min={0}
                    max={9999}
                    {...(watchStatusUpdate === "INATIVO" && { value: 0 })}
                  >
                    <NumberInputField
                      id="hours_amount"
                      {...resourceHook.context.write.registerUpdateResource("hours_amount")}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="leader">Líder</FormLabel>
                  <Switch
                    id="leader"
                    defaultChecked={resourceHook.context.read.selectedResource?.leader}
                    {...resourceHook.context.write.registerUpdateResource("leader")}
                  />
                </FormControl>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCloseUpdate}>
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              disabled={resourceHook.states.isLoadingUpdating}
            >
              {resourceHook.states.isLoadingUpdating ? <Spinner /> : "Atualizar"}
            </Button>
          </ModalFooter>
        </Box>
      )}
    </ModalContent>
  );
}
