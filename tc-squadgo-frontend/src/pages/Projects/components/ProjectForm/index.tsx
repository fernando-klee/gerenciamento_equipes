import { useEffect } from "react";
import {
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
  Switch,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ptBR from "date-fns/locale/pt-BR";

import Input from "../../../../components/Forms/Input";
import InputDate from "../../../../components/Forms/InputDate";
import { ResourceSelector } from "../ResourceSelector";
import { ProjectProps } from "../../interfaces";

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  project?: ProjectProps;
  isLoading: boolean;
  customers: any[];
  responsibles: any[];
  isLoadingResponsibles: boolean;
  resources: any[];
  isLoadingResources: boolean;
  projectResources: any[];
  setProjectResources: (resources: any[]) => void;
}

const projectSchema = yup.object({
  name: yup.string().trim().required("Nome é obrigatório"),
  customer_id: yup
    .number()
    .min(1, "Cliente é obrigatório")
    .required("Cliente é obrigatório"),
  hours: yup
    .number()
    .typeError("Horas é obrigatório")
    .min(1, "Valor de horas deve ser maior que 1"),
  type: yup.mixed().oneOf(["PF", "PR"], "Tipo é obrigatório"),
  end_estimate: yup
    .date()
    .nullable()
    .when("type", (type, end_estimate) =>
      type === "PF"
        ? end_estimate.required("Finalização é obrigatória")
        : end_estimate
    ),
  start_estimate: yup.date().when("end_estimate", (end_estimate, schema) =>
    schema
      .test(
        "isStartDateBeforeEndDate",
        "Data deve ser menor que finalização",
        (value: any) => {
          if (end_estimate) return isBefore(value, end_estimate);
          return true;
        }
      )
      .required("Estimativa é obrigatória")
  ),
  status: yup
    .mixed()
    .oneOf(["EM_ANDAMENTO", "A_INICIAR", "CONCLUIDO"], "Status é obrigatório"),
});

export function ProjectForm({
  isOpen,
  onClose,
  onSubmit,
  project,
  isLoading,
  customers,
  responsibles,
  isLoadingResponsibles,
  resources,
  isLoadingResources,
  projectResources,
  setProjectResources,
}: ProjectFormProps) {
  const {
    control,
    watch,
    getValues,
    setValue,
    register,
    handleSubmit,
    formState,
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(projectSchema),
  });

  const watchStatus = watch("status");
  const watchType = watch("type");

  useEffect(() => {
    if (project) {
      setValue("name", project.name);
      setValue("status", project.status);
      setValue("type", project.type);
      setValue("hours", project.hours);
      setValue("customer_id", project.customer.id);
      setValue("responsible_id", project.responsible?.id || 0);
      setValue("start_estimate", project.start_estimate);
      setValue("end_estimate", project.end_estimate);
    }
  }, [project, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{project ? project.name : "Novo Projeto"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap={4}>
              <Input
                maxLength={50}
                label="Nome"
                placeholder="W3haus, Paquetá..."
                error={formState.errors.name}
                {...register("name")}
              />
              <Flex direction={"row"} gap="10px">
                <FormControl isInvalid={!!formState.errors.status}>
                  <FormLabel>Status</FormLabel>
                  <ChakraSelect
                    placeholder="Selecione..."
                    {...register("status")}
                  >
                    <option value="EM_ANDAMENTO">Em andamento</option>
                    <option value="A_INICIAR">À iniciar</option>
                    <option value="CONCLUIDO">Concluído</option>
                  </ChakraSelect>
                  <FormErrorMessage>
                    {formState.errors.status?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!formState.errors.type}>
                  <FormLabel>Tipo</FormLabel>
                  <ChakraSelect placeholder="Selecione..." {...register("type")}>
                    <option value="PF">PF</option>
                    <option value="PR">PR</option>
                  </ChakraSelect>
                  <FormErrorMessage>
                    {formState.errors.type?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <Flex gap="10px">
                <FormControl isInvalid={!!formState.errors.start_estimate}>
                  <Controller
                    control={control}
                    name="start_estimate"
                    render={({ field: { onChange, value } }) => (
                      <InputDate
                        {...(watchStatus === "EM_ANDAMENTO" ||
                        watchStatus === "CONCLUIDO"
                          ? { maxDate: new Date() }
                          : {})}
                        label="Data de início"
                        dateFormat="dd/MM/yyyy"
                        locale={ptBR}
                        onChange={onChange}
                        onBlur={onChange}
                        selected={value}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {formState.errors.start_estimate?.message}
                  </FormErrorMessage>
                </FormControl>
                {watchType === "PF" && (
                  <FormControl isInvalid={!!formState.errors.end_estimate}>
                    <Controller
                      control={control}
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
                      {formState.errors.end_estimate?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Flex>

              <Flex justifyContent={"space-between"} gap="10px">
                <FormControl
                  isInvalid={!!formState.errors.hours}
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
                    <NumberInputField id="hours" {...register("hours")} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormErrorMessage>
                    {formState.errors.hours?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formState.errors.customer_id}>
                  <FormLabel>Cliente</FormLabel>
                  <ChakraSelect {...register("customer_id")}>
                    <option value={0}>Selecione...</option>
                    {customers.map((c) => (
                      <option key={c.id + c.name} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </ChakraSelect>
                  <FormErrorMessage>
                    {formState.errors.customer_id?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <Flex>
                <FormControl isInvalid={!!formState.errors.responsible_id}>
                  <FormLabel>Líder</FormLabel>
                  <ChakraSelect
                    isDisabled={isLoadingResponsibles}
                    {...register("responsible_id")}
                  >
                    <option value={0}>Selecione...</option>
                    {responsibles.map((r) => (
                      <option key={r.id + r.name} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </ChakraSelect>
                  <FormErrorMessage>
                    {formState.errors.responsible_id?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <ResourceSelector
                isLoadingResources={isLoadingResources}
                resources={resources}
                projectResources={projectResources}
                setProjectResources={setProjectResources}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="blue" disabled={isLoading}>
              {isLoading ? <Spinner /> : project ? "Atualizar" : "Cadastrar"}
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
} 