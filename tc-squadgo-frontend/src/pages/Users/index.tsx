import * as yup from "yup";

import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

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
  Radio,
  RadioGroup,
  Skeleton,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { AiOutlineUserAdd } from "react-icons/ai";

import Panel from "../../components/Panel";
import Input from "../../components/Forms/Input";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { HasPermission } from "../../components/HasPermission";
import CreateButton from "../../components/Buttons/CreateButton";
import Header from "../../components/Header";

interface RoleProps {
  id: number;
  name: string;
}

interface UserProps {
  id: number;
  name: string;
  email: string;
  status: string;
  __roles__: RoleProps[];
}

const Users: React.FC = () => {
  const toast = useToast();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [roles, setRoles] = useState<RoleProps[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProps>();
  const [isLoadingCreating, setIsLoadingCreating] = useState(false);
  const [isLoadingUpdating, setIsLoadingUpdating] = useState(false);
  const [isLoadingDeleting, setIsLoadingDeleting] = useState(false);
  const [isLoadingSelectingUser, setIsLoadingSelectingUser] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/users");
      setUsers(response.data);
      setLoadingUsers(false);
    }

    async function loadRoles() {
      api
        .get("/roles")
        .then((res) => {
          setRoles(res.data);
        })
        .catch((err) => {
          toast({
            title: "Erro ao carregar grupo de permissões",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        });
    }

    loadUsers();
    loadRoles();
  }, [toast]);

  const newUserSchema = yup
    .object({
      name: yup.string().required("Nome é obrigatório")
      .min(3, "Deve ter no mínimo 3 caracteres")
      .max(40, "Deve ter até 40 caracteres")
      .matches(/^[a-zA-ZÀ-ÿ _#-]+$/, "Nome contém caracteres inválidos"),
      email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("E-mail não é válido")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "E-mail contém caracteres especiais inválidos"
      ),
    listRoles: yup.string().required("Grupo de permissão é obrigatório"),
    })
    .required();

  const {
    control,
    register: registerNewUser,
    handleSubmit: handleSubmitNewUser,
    formState: formStateNewUser,
    reset: resetNewUser,
    clearErrors,
  } = useForm({ resolver: yupResolver(newUserSchema) });

  const {
    control: controlUpdate,
    register: registerUpdateUser,
    handleSubmit: handleSubmitUpdateUser,
    formState: formStateUpdateUser,
    reset: resetUpdateUser,
    clearErrors: clearErrorsUpdate,
    setValue: setValueUpdate,
  } = useForm({ resolver: yupResolver(newUserSchema) });

  function closeUpdateModal() {
    setSelectedUser(undefined);
    resetUpdateUser();
    clearErrorsUpdate();
    onCloseUpdate();
  }

  function closeNewModal() {
    resetNewUser();
    clearErrors();
    onClose();
  }

  function selectUser(user_id: number) {
    setIsLoadingSelectingUser(true);
    const currentUser = users.find((u) => u.id === user_id);
    if (currentUser) {
      setSelectedUser(currentUser);
      if (currentUser.__roles__.length > 0)
        setValueUpdate("listRoles", currentUser.__roles__[0].id + "");
    }
    setIsLoadingSelectingUser(false);
    onOpenUpdate();
  }

  async function deleteUser(user_id: number) {
    setIsLoadingDeleting(true);

    try {
      await api.delete(`/users/${user_id}`);
      const oldUsers = [...users];
      const userIndex = oldUsers.findIndex((ou) => ou.id === user_id);
      oldUsers.splice(userIndex, 1);

      setUsers(oldUsers);

      toast({
        title: "Usuário deletado!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Ocorreu um erro ao tentar deletar usuário",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setIsLoadingDeleting(false);
  }

  async function handleCreate(values: any) {
    setIsLoadingCreating(true);
    try {
      const { name, email, listRoles } = values;

      const response = await api.post("/users", {
        name,
        email,
        roles_ids: [listRoles],
      });
      const newUserCreated: RoleProps = response.data;

      setUsers((oldUser: any) => {
        return [...oldUser, newUserCreated];
      });

      resetNewUser();
      clearErrors();

      toast({
        title: "Usuário cadastrado com sucesso!",
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
    setIsLoadingCreating(false);
    closeNewModal();
  }

  async function handleUpdateUser(values: any) {
    setIsLoadingUpdating(true);
    if (selectedUser) {
      try {
        const { name, email, listRoles } = values;

        const response = await api.put(`/users/${selectedUser?.id}`, {
          name,
          email,
          roles_ids: [listRoles],
        });

        const newUserUpdated: UserProps = response.data;
        const oldUsers = [...users];
        const userIndex = oldUsers.findIndex((ou) => ou.id === selectedUser.id);
        oldUsers[userIndex] = newUserUpdated;
        setUsers(oldUsers);

        toast({
          title: "Usuário atualizado com sucesso!",
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

  const usuariosAtivos = users.filter((user) => user.status !== "INATIVO");
  const quantidadeUsuariosAtivos = usuariosAtivos.length.toString();

  return (
    <>
      <Header
        buttons={[]}
        // buttons={[
        //   {
        //     createPermissions: ["create_user"],
        //     newIcon: AiOutlineUserAdd,
        //     title: "Criar usuário",
        //     onClick: onOpen,
        //   },
        // ]}
      />
      <S.Container>
        <Panel
          title="Usuários"
          counter={quantidadeUsuariosAtivos}
          marginTop={"100px"}
          flex={1}
          position="relative"
          flexDir={"column"}
        >
          {loadingUsers ? (
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
                    <Th>E-MAIL</Th>
                    <HasPermission permissions={["update_user", "delete_user"]}>
                      <Th></Th>
                    </HasPermission>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.length > 0 ? (
                    users
                      .filter((u) => u.status !== "INATIVO")
                      .map((u) => (
                        <Tr key={u.email}>
                          <Td>
                            <Text fontWeight={700}>{u.id}</Text>
                          </Td>
                          <Td>
                            <Text fontWeight={700}>{u.name}</Text>
                          </Td>
                          <Td>
                            <Text fontWeight={700}>{u.email}</Text>
                          </Td>
                          <HasPermission
                            permissions={["update_user", "delete_user"]}
                          >
                            <Td>
                              <Box display="flex" gap="10px">
                                <HasPermission permissions={["update_user"]}>
                                  <S.UserActionButton
                                    onClick={() => selectUser(u.id)}
                                  >
                                    <FiEdit size={20} />
                                  </S.UserActionButton>
                                </HasPermission>
                              </Box>
                            </Td>
                          </HasPermission>
                        </Tr>
                      ))
                  ) : (
                    <Text width="100%" textAlign="center">
                      Não há usuários cadastrados
                    </Text>
                  )}
                </Tbody>
              </Table>
            </Flex>
          )}
        </Panel>
        <Modal isOpen={isOpen} onClose={() => closeNewModal()}>
          <ModalOverlay />
          <ModalContent>
            <Box as="form" onSubmit={handleSubmitNewUser(handleCreate)}>
              <ModalHeader>Cadastrar usuário</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexDir={"column"} gap={4}>
                  <Input
                    maxW={"300px"}
                    label="Nome"
                    placeholder="Beltrano de tal"
                    error={formStateNewUser.errors.name}
                    {...registerNewUser("name")}
                  />
                  <Input
                    maxW={"300px"}
                    label="E-mail"
                    placeholder="beltrano@testingcompany.com.br"
                    error={formStateNewUser.errors.email}
                    {...registerNewUser("email")}
                  />
                  <Flex>
                    <FormControl
                      id="listRoles"
                      isInvalid={!!formStateNewUser.errors.listRoles}
                    >
                      <FormLabel>Grupo de permissões</FormLabel>
                      <Controller
                        name="listRoles"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup {...field}>
                            <S.PermissionsUpdateContainer>
                              {roles.map((p) => (
                                <Radio key={p.id} value={p.id + ""}>
                                  {p.name}
                                </Radio>
                              ))}
                            </S.PermissionsUpdateContainer>
                          </RadioGroup>
                        )}
                      />
                      <FormErrorMessage>
                        {formStateNewUser.errors.listRoles &&
                          formStateNewUser.errors.listRoles?.message!.toString()}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={() => closeNewModal()}>
                  Cancelar
                </Button>
                <Button
                  disabled={isLoadingCreating}
                  type="submit"
                  colorScheme="blue"
                >
                  Cadastrar usuário
                  {isLoadingCreating && <Spinner />}
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpenUpdate} onClose={() => closeUpdateModal()}>
          <ModalOverlay />
          <ModalContent>
            <Box as="form" onSubmit={handleSubmitUpdateUser(handleUpdateUser)}>
              <ModalHeader>Atualizar {selectedUser?.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {selectedUser && (
                  <Flex flexDir={"column"} gap={4}>
                    <Input
                      defaultValue={selectedUser.name}
                      label="Nome"
                      placeholder="W3haus, Paquetá..."
                      error={formStateUpdateUser.errors.name}
                      {...registerUpdateUser("name")}
                    />
                    <Input
                      defaultValue={selectedUser.email}
                      label="E-mail"
                      placeholder="fulano@testingcompany.com.br"
                      error={formStateUpdateUser.errors.email}
                      {...registerUpdateUser("email")}
                    />
                    <Flex>
                      <FormControl>
                        <FormLabel>Grupo de permissões</FormLabel>
                        {isLoadingSelectingUser ? (
                          <span>Carregando...</span>
                        ) : (
                          selectedUser && (
                            <Controller
                              name="listRoles"
                              control={controlUpdate}
                              render={({ field: { ref, value, ...rest } }) => (
                                <RadioGroup
                                  {...(selectedUser.__roles__.length > 0 && {
                                    defaultValue:
                                      selectedUser.__roles__[0].id + "",
                                  })}
                                  {...rest}
                                >
                                  <S.PermissionsUpdateContainer>
                                    {roles.map((p) => (
                                      <Radio key={p.id} value={p.id + ""}>
                                        {p.name}
                                      </Radio>
                                    ))}
                                  </S.PermissionsUpdateContainer>
                                </RadioGroup>
                              )}
                            />
                          )
                        )}
                      </FormControl>
                    </Flex>
                  </Flex>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={() => closeUpdateModal()}
                >
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

export default Users;
