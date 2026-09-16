import { useEffect, useState } from "react";
import * as yup from "yup";

import { FaRegTrashAlt, FaUserShield } from "react-icons/fa";

import { FiEdit } from "react-icons/fi";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";

import * as S from "./styles";
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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Spinner,
  Stack,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import Panel from "../../components/Panel";
import Input from "../../components/Forms/Input";
import { api } from "../../services/api";
import { HasPermission } from "../../components/HasPermission";
import CreateButton from "../../components/Buttons/CreateButton";
import Header from "../../components/Header";

interface PermissionProps {
  id: number;
  description: string;
  type: string;
  slug: string;
  action: string;
}

interface RoleProps {
  id: number;
  name: string;
  __permissions__: PermissionProps[];
}

const Roles: React.FC = () => {
  const toast = useToast();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [roles, setRoles] = useState<RoleProps[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleProps>();
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [permissions, setPermissions] = useState<PermissionProps[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const [isLoadingUpdating, setIsLoadingUpdating] = useState(false);

  useEffect(() => {
    async function loadRoles() {
      const response = await api.get("/roles");
      setRoles(response.data);
      setLoadingRoles(false);
    }

    async function loadPermissions() {
      const response = await api.get("/permissions");
      setPermissions(response.data);
      setLoadingPermissions(false);
    }

    loadRoles();
    loadPermissions();
  }, [toast]);

  const newRoleSchema = yup
    .object({
      name: yup.string().trim().matches(/^[a-zA-ZÀ-ÿ0-9 _#-]+$/, "Descrição contém caracteres inválidos").min(3, 'Deve ter no mínimo 3 caracteres válidos').max(40, 'Deve ter até 40 caracteres').required("Nome é obrigatório"),
      listPermissions: yup.array().min(1, "Selecione pelo menos 1 permissão"),
    })
    .required();

  const {
    control,
    register: registerNewRole,
    handleSubmit: handleSubmitNewRole,
    formState: formStateNewRole,
    reset: resetNewRole,
    clearErrors,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(newRoleSchema),
    defaultValues: {
      name: "",
      listPermissions: [] as { p_id: number }[],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "listPermissions",
  });

  const {
    control: controlUpdate,
    register: registerUpdateRole,
    handleSubmit: handleSubmitUpdateRole,
    formState: formStateUpdateRole,
    reset: resetUpdateRole,
    clearErrors: clearErrorsUpdate,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(newRoleSchema),
  });

  const {
    fields: fieldsUpdate,
    append: appendUpdate,
    remove: removeUpdate,
  } = useFieldArray({ control: controlUpdate, name: "listPermissions" });

  function closeUpdateModal() {
    setSelectedRole(undefined);
    resetUpdateRole();
    clearErrorsUpdate();
    onCloseUpdate();
  }

  function closeNewModal() {
    resetNewRole();
    clearErrors();
    onClose();
  }

  function openNewModal() {
    onOpen();
  }

  function selectRole(role_id: number) {
    const currentRole = roles.find((r) => r.id === role_id);
    if (currentRole) {
      setSelectedRole(currentRole);
      currentRole.__permissions__.map((cr) => appendUpdate({ p_id: cr.id }));
    }
    onOpenUpdate();
  }

  async function handleCreate(values: any) {
    setIsCreating(true);
    const { name, listPermissions } = values;

    let permissionsToInt = [];

    if (listPermissions) {
      permissionsToInt = listPermissions.map((p: { p_id: number }) => {
        return p.p_id;
      });
    }

    try {
      const response = await api.post("/roles", {
        name,
        permissions_ids: permissionsToInt,
      });
      const newRoleCreated: RoleProps = response.data;

      setRoles((oldRole: any) => {
        return [...oldRole, newRoleCreated];
      });

      closeNewModal();
      toast({
        title: "Novo grupo de permissão cadastrado com sucesso!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err: any) {
      const { message } = err.response.data;
      toast({
        title: message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setIsCreating(false);
  }

  async function handleUpdateRole(values: any) {
    setIsLoadingUpdating(true);
    if (selectedRole) {
      try {
        const { name, listPermissions } = values;

        let permissionsToInt = [];

        if (listPermissions) {
          permissionsToInt = listPermissions.map((p: { p_id: number }) => {
            return Number(p.p_id);
          });
        }

        const response = await api.put(`/roles/${selectedRole.id}`, {
          name,
          permissions_ids: permissionsToInt,
        });
        const oldRoles = [...roles];
        const roleIndex = oldRoles.findIndex((r) => r.id === selectedRole.id);
        oldRoles[roleIndex] = response.data;
        setRoles(oldRoles);

        toast({
          title: `${selectedRole.name} atualizado com sucesso!`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        closeUpdateModal();
      } catch (err: any) {
        const { message } = err.response.data;
        toast({
          title: message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }

    setIsLoadingUpdating(false);
  }

  async function deleteRole(role_id: number) {
    setIsLoadingDelete(true);

    try {
      await api.delete(`/roles/${role_id}`);

      const oldRoles = [...roles];
      const roleIndex = oldRoles.findIndex((or) => or.id === role_id);
      oldRoles.splice(roleIndex, 1);
      setRoles(oldRoles);

      toast({
        title: "Grupo de permissão deletado!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro ao tentar deletar grupo de permissão",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    setIsLoadingDelete(false);
  }

  const newRolesByActionTr = (
    type: string,
    title: string,
    roles: PermissionProps[]
  ) => {
    const rolesSameType = roles.filter((r) => r.type === type);

    function changeSwitchNewRole(action: string, roles: PermissionProps[]) {
      const containsActions = roles.find((r) => r.action === action);
      if (!containsActions) {
        return <Td></Td>;
      }

      function addNewPermissionToForm(p_id: number) {
        const permissionIndex = fields.findIndex((p) => p.p_id === p_id);
        if (permissionIndex === -1) append({ p_id });
        else remove(permissionIndex);
      }

      return (
        <Td>
          <Switch
            size="md"
            value={containsActions.id}
            onChange={(e) => addNewPermissionToForm(Number(e.target.value))}
          />
        </Td>
      );
    }

    const hasCreate = changeSwitchNewRole("CREATE", rolesSameType);
    const hasEdit = changeSwitchNewRole("UPDATE", rolesSameType);
    const hasView = changeSwitchNewRole("VIEW", rolesSameType);
    const hasDelete = changeSwitchNewRole("DELETE", rolesSameType);
    const hasNotify = changeSwitchNewRole("NOTIFY", rolesSameType);

    return (
      <Tr>
        <Td>{title}</Td>
        {hasCreate}
        {hasView}
        {hasEdit}
        {hasDelete}
        {hasNotify}
      </Tr>
    );
  };

  const updateRolesByActionTr = (
    type: string,
    title: string,
    roles: PermissionProps[]
  ) => {
    const rolesSameType = roles.filter((r) => r.type === type);

    function changeSwitchNewRole(action: string, roles: PermissionProps[]) {
      const containsActions = roles.find((r) => r.action === action);
      if (!containsActions) {
        return <Td></Td>;
      }

      function addUpdatePermissionToForm(p_id: number) {
        const permissionIndex = fieldsUpdate.findIndex(
          (p: any) => p.p_id === p_id
        );
        if (permissionIndex === -1) appendUpdate({ p_id });
        else removeUpdate(permissionIndex);
      }

      return (
        <Td>
          <Switch
            size="md"
            isChecked={fieldsUpdate.some(
              (p: any) => p.p_id === containsActions.id
            )}
            value={containsActions.id}
            onChange={(e) => addUpdatePermissionToForm(Number(e.target.value))}
          />
        </Td>
      );
    }

    const hasCreate = changeSwitchNewRole("CREATE", rolesSameType);
    const hasEdit = changeSwitchNewRole("UPDATE", rolesSameType);
    const hasView = changeSwitchNewRole("VIEW", rolesSameType);
    const hasDelete = changeSwitchNewRole("DELETE", rolesSameType);
    const hasNotify = changeSwitchNewRole("NOTIFY", rolesSameType);

    return (
      <Tr>
        <Td>{title}</Td>
        {hasCreate}
        {hasView}
        {hasEdit}
        {hasDelete}
        {hasNotify}
      </Tr>
    );
  };

  return (
    <>
      <Header
        buttons={[
          {
            createPermissions: ["create_role"],
            newIcon: FaUserShield,
            title: "Criar Novo Grupo de Permissões",
            onClick: () => openNewModal(),
          },
        ]}
      />
      <S.Container>
        <Panel
          title="Grupos de permissões"
          counter={roles.length.toString()}
          marginTop={"100px"}
          flex={1}
          position="relative"
          flexDir={"column"}
        >
          {loadingRoles ? (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : (
            <Flex maxWidth={"-webkit-fill-available"} overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>NOME</Th>
                    <HasPermission permissions={["update_role"]}>
                      <Th></Th>
                    </HasPermission>
                  </Tr>
                </Thead>
                <Tbody>
                  {roles.length > 0 ? (
                    roles.map((r) => (
                      <Tr key={r.id}>
                        <Td>
                          <Text fontWeight={700}>{r.id}</Text>
                        </Td>
                        <Td>
                          <Text fontWeight={700}>{r.name}</Text>
                        </Td>
                        <HasPermission
                          permissions={["update_role", "delete_role"]}
                        >
                          <Td display="flex" gap="10px">
                            <HasPermission permissions={["update_role"]}>
                              <Box display="flex" gap="10px">
                                <S.EditRolesButton
                                  onClick={() => selectRole(r.id)}
                                >
                                  <FiEdit size={20} />
                                </S.EditRolesButton>
                              </Box>
                            </HasPermission>
                            <HasPermission permissions={["delete_role"]}>
                              <Popover>
                                <PopoverTrigger>
                                  <S.RolesActionButton>
                                    <FaRegTrashAlt size={20} />
                                  </S.RolesActionButton>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <PopoverArrow />
                                  <PopoverCloseButton />
                                  <PopoverHeader>
                                    <Flex direction="column" gap="10px">
                                      <Text>Deletar grupo de permissão?</Text>
                                    </Flex>
                                  </PopoverHeader>
                                  <PopoverBody>
                                    <Text>
                                      Você tem certeza que deseja deletar este
                                      grupo de permissão?
                                    </Text>
                                  </PopoverBody>
                                  <PopoverFooter
                                    display="flex"
                                    justifyContent={"flex-end"}
                                  >
                                    <Button
                                      disabled={isLoadingDelete}
                                      colorScheme={"red"}
                                      onClick={() => deleteRole(r.id)}
                                    >
                                      {isLoadingDelete && (
                                        <Spinner marginRight="10px" />
                                      )}
                                      Deletar
                                    </Button>
                                  </PopoverFooter>
                                </PopoverContent>
                              </Popover>
                            </HasPermission>
                          </Td>
                        </HasPermission>
                      </Tr>
                    ))
                  ) : (
                    <Text width="100%" textAlign="center">
                      Não há grupos de permissões cadastrados
                    </Text>
                  )}
                </Tbody>
              </Table>
            </Flex>
          )}
        </Panel>
        <Modal isOpen={isOpen} onClose={() => closeNewModal()} size={"4xl"}>
          <ModalOverlay />
          <ModalContent>
            <Box as="form" onSubmit={handleSubmitNewRole(handleCreate)}>
              <ModalHeader>Novo Grupo de Permissão</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexDir={"column"} gap={4}>
                  <Input
                    maxW={"300px"}
                    label="Nome"
                    placeholder="Admin, gerente, analista..."
                    error={formStateNewRole.errors.name}
                    {...registerNewRole("name")}
                  />

                  {fields.map((f, i) => (
                    <input
                      key={f.p_id}
                      type={"hidden"}
                      {...registerNewRole(`listPermissions.${i}.p_id`)}
                    />
                  ))}

                  <Flex>
                    <FormControl
                      isInvalid={!!formStateNewRole.errors.listPermissions}
                    >
                      <FormLabel>Selecione as permissões</FormLabel>
                      {loadingPermissions ? (
                        <Flex width="100%" justifyContent={"center"}>
                          <Spinner />
                        </Flex>
                      ) : (
                        <TableContainer>
                          <Table variant="simple">
                            <Thead>
                              <Tr>
                                <Th></Th>
                                <Th>Criar</Th>
                                <Th>Ler</Th>
                                <Th>Editar</Th>
                                <Th>Deletar</Th>
                                <Th>Notificar</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {newRolesByActionTr(
                                "USERS",
                                "Usuários",
                                permissions
                              )}
                              {newRolesByActionTr(
                                "RESOURCES",
                                "Colaboradores",
                                permissions
                              )}
                              {newRolesByActionTr(
                                "PROJECTS",
                                "Projetos",
                                permissions
                              )}
                              {newRolesByActionTr(
                                "CUSTOMERS",
                                "Clientes",
                                permissions
                              )}
                              {newRolesByActionTr(
                                "SKILLS",
                                "Skills",
                                permissions
                              )}
                              {newRolesByActionTr(
                                "VERSION_NOTES",
                                "Notas da Versão",
                                permissions
                              )}
                              {newRolesByActionTr(
                                "PERMISSIONS_GROUP",
                                "Grupo de Permissões",
                                permissions
                              )}
                              {newRolesByActionTr(
                                "GERAL_VISION",
                                "Visão Geral",
                                permissions
                              )}
                              {newRolesByActionTr(
                                "DASHBOARD_MENU",
                                "Dashboard",
                                permissions
                              )}
                              {newRolesByActionTr(
                                "WORK_SCHEDULES",
                                "Escalas",
                                permissions
                              )}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      )}

                      <FormErrorMessage>
                        {formStateNewRole.errors.listPermissions &&
                          (formStateNewRole.errors.listPermissions as any)
                            ?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={closeNewModal}>
                  Cancelar
                </Button>
                <Button type="submit" colorScheme="blue" disabled={isCreating}>
                  {isCreating ? <Spinner /> : "Cadastrar"}
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isOpenUpdate}
          onClose={() => closeUpdateModal()}
          size={"4xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <Box as="form" onSubmit={handleSubmitUpdateRole(handleUpdateRole)}>
              <ModalHeader>Atualizar {selectedRole?.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexDir={"column"} gap={4}>
                  {selectedRole && (
                    <>
                      <Input
                        defaultValue={selectedRole.name}
                        label="Nome"
                        placeholder="W3haus, Paquetá..."
                        error={formStateUpdateRole.errors.name}
                        {...registerUpdateRole("name")}
                      />

                      {fieldsUpdate.map((f: any, i: number) => (
                        <input
                          key={f.p_id}
                          type="hidden"
                          {...registerUpdateRole(`listPermissions.${i}.p_id`)}
                        />
                      ))}

                      <Flex>
                        <FormControl
                          isInvalid={
                            !!formStateUpdateRole.errors.listPermissions
                          }
                        >
                          <FormLabel>Selecione as permissões</FormLabel>
                          <TableContainer>
                            <Table variant="simple">
                              <Thead>
                                <Tr>
                                  <Th></Th>
                                  <Th>Criar</Th>
                                  <Th>Ler</Th>
                                  <Th>Editar</Th>
                                  <Th>Deletar</Th>
                                  <Th>Notificar</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {updateRolesByActionTr(
                                  "USERS",
                                  "Usuários",
                                  permissions
                                )}
                                {updateRolesByActionTr(
                                  "RESOURCES",
                                  "Colaboradores",
                                  permissions
                                )}
                                {updateRolesByActionTr(
                                  "PROJECTS",
                                  "Projetos",
                                  permissions
                                )}
                                {updateRolesByActionTr(
                                  "CUSTOMERS",
                                  "Clientes",
                                  permissions
                                )}
                                {updateRolesByActionTr(
                                  "SKILLS",
                                  "Skills",
                                  permissions
                                )}
                                {updateRolesByActionTr(
                                  "VERSION_NOTES",
                                  "Notas da Versão",
                                  permissions
                                )}
                                {updateRolesByActionTr(
                                  "PERMISSIONS_GROUP",
                                  "Grupo de Permissões",
                                  permissions
                                )}
                                {updateRolesByActionTr(
                                  "GERAL_VISION",
                                  "Visão Geral",
                                  permissions
                                )}
                                {updateRolesByActionTr(
                                  "DASHBOARD_MENU",
                                  "Dashboard",
                                  permissions
                                )}
                                {updateRolesByActionTr(
                                  "WORK_SCHEDULES",
                                  "Escalas",
                                  permissions
                                )}
                              </Tbody>
                            </Table>
                          </TableContainer>
                          <FormErrorMessage>
                            {formStateUpdateRole.errors.listPermissions &&
                              (
                                formStateUpdateRole.errors
                                  .listPermissions as any
                              )?.message}
                          </FormErrorMessage>
                        </FormControl>
                      </Flex>
                    </>
                  )}
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={closeUpdateModal}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  colorScheme="blue"
                  disabled={isLoadingUpdating}
                >
                  {isLoadingUpdating ? <Spinner /> : "Atualizar"}
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </Modal>
      </S.Container>
    </>
  );
};

export default Roles;
