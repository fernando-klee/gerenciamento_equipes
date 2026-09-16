import {
  Box,
  Button,
  Flex,
  Image,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";

import * as yup from "yup";

import Input from "../../../components/Forms/Input";
import Header from "../../../components/Header";
import { useAuth } from "../../../context/AuthContext";
import { api, auth } from "../../../services/api";
import VerifyIconBlue from "../../../assets/VerifyIconBlue.svg";
import PersonProfileInput from "../../../assets/PersonProfileInput.svg";
import EmailProfileInput from "../../../assets/EmailProfileInput.svg";
import PasswordProfileInput from "../../../assets/PasswordProfileInput.svg";

import * as S from "./styles";
import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";

interface Resource {
  name: string;
  id: number;
  email: string;
  registry: string;
}

const ResourceInformation: React.FC = () => {
  const toast = useToast();
  const { user, updateUser, singOut } = useAuth();
  const [successMessage2, setSuccessMessage2] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [resourceInfo, setResourceInfo] = useState<Resource>();

  const schema = yup
    .object({
      name: yup.string().required("Nome é obrigatório"),
      email: yup
        .string()
        .required("E-mail é obrigatório")
        .email("E-mail é inválido"),
    })
    .required();

  const schemaPassword = yup.object({
    newPassword: yup
      .string()
      .trim()
      .min(6, "Senha deve ter no mínimo 5 caracteres")
      .required("Nova senha é obrigatória"),
    confirmation: yup
      .string()
      .trim()
      .oneOf(
        [yup.ref("newPassword")],
        "Confirmação deve ser igual à nova senha"
      )
      .required("Confirmação de senha é obrigatória"),
  });

  const { handleSubmit, formState, register } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit: handleSubmitPassword,
    formState: formStatePassword,
    register: registerPassword,
    reset: resetPassword,
    control,
  } = useForm({
    resolver: yupResolver(schemaPassword),
    mode: "all",
  });

  const watchNewPassword = useWatch({ control, name: "newPassword" });

  useMemo(() => {
    setSuccessMessage(false);
  }, [watchNewPassword]);

  async function handleUpdateUser(values: any): Promise<void> {
    setSuccessMessage2(true);
    await updateUser(values);
  }

  useEffect(() => {
    async function loadResourceInfo() {
      try {
        const response = await api.get(`/resources/${user.id}`);
        const responseData = response.data;

        setResourceInfo(responseData);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    }

    loadResourceInfo();
  }, []);

  async function handleUpdatePassword(values: any) {
    try {
      const { newPassword, confirmation } = values;
      const apiPayload = {
        matricula: resourceInfo?.registry,
        password: newPassword,
        confirmPassword: confirmation,
      };

      const token = new Cookies().get("tc-auth-token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await auth.post("authentication/change-password", apiPayload, {
        headers,
      });

      setSuccessMessage(true);
      window.location.reload;
    } catch (error) {
      console.error("Error while updating password:", error);

      toast({
        title: "Erro ao atualizar a senha",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex direction="column" width="100%">
      <Flex
        flexDirection={["column", "row"]}
        justifyContent="space-evenly"
        style={{ gap: "20px" }}
      >
        <S.PanelsContainer>
          {user && (
            <S.Content>
              <Flex flexDir="column">
                <Flex flexDir="row">
                  <S.Container>
                    <Flex
                      flexDir="column"
                      width={["100%", "90%"]}
                      minW={["100%", "500px"]}
                    >
                      <Flex
                        onSubmit={handleSubmit(handleUpdateUser)}
                        as="form"
                        width="100%"
                      >
                        <Flex flexDir="column" gap={10} width="100%">
                          <Text fontWeight={700}>Solicitações de mudanças</Text>
                          <S.ContainerInput>
                            <Text
                              fontSize="18px"
                              textColor="rgba(51, 51, 51, 1)"
                            >
                              Nome
                            </Text>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={
                                  <Image
                                    src={PersonProfileInput}
                                    pos="relative"
                                    right="10px"
                                  />
                                }
                              />
                              <Input
                                disabled
                                defaultValue={user.name}
                                variant="flushed"
                                bottom="4px"
                                pl="30px"
                                _placeholder={{
                                  color: "#B4B4B4",
                                  fontWeight: "normal",
                                  fontsize: "12px",
                                }}
                                placeholder="Digite seu nome completo"
                                borderColor="rgba(67, 98, 139, 0.59)"
                                borderBottomWidth="2px"
                                fontSize="14px"
                                error={formState.errors.name}
                                {...register("name")}
                              />
                            </InputGroup>
                          </S.ContainerInput>
                          <Flex flexDir="row">
                            <S.ContainerInput>
                              <Flex flexDir="column">
                                <Text
                                  fontSize="18px"
                                  textColor="rgba(51, 51, 51, 1)"
                                >
                                  Email:
                                </Text>
                                <InputGroup>
                                  <InputLeftElement
                                    pointerEvents="none"
                                    children={
                                      <Image
                                        src={EmailProfileInput}
                                        pos="relative"
                                        right="10px"
                                      />
                                    }
                                  />
                                  <Input
                                    disabled
                                    defaultValue={user.email}
                                    variant="flushed"
                                    bottom="4px"
                                    pl="30px"
                                    _placeholder={{
                                      color: "#B4B4B4",
                                      fontWeight: "normal",
                                      fontsize: "12px",
                                    }}
                                    placeholder="nome@testingcompany.com.br"
                                    borderColor="rgba(67, 98, 139, 0.59)"
                                    borderBottomWidth="2px"
                                    fontSize="14px"
                                    error={formState.errors.email}
                                    {...register("email")}
                                  ></Input>
                                </InputGroup>
                              </Flex>
                            </S.ContainerInput>
                            <Flex
                              width="30%"
                              flexDir="row-reverse"
                              alignItems="flex-end"
                            >
                              {!successMessage2 ? (
                                <Flex width="100%" maxWidth="110px">
                                  <Button
                                    type="submit"
                                    bgColor="#0052CC"
                                    color="white"
                                    _hover={{ bg: "#0065FF" }}
                                    borderRadius="11px"
                                    height="33px"
                                    width="140px"
                                    boxShadow="0px 4.411457061767578px 4.411457061767578px 0px #43628B36"
                                    disabled
                                  >
                                    Salvar
                                  </Button>
                                </Flex>
                              ) : (
                                <>
                                  <Flex width="40%" pos="relative" left="13px">
                                    <Flex
                                      flexDir="column"
                                      width="100%"
                                      justifyContent="center"
                                      alignItems="center"
                                    >
                                      <Image
                                        pos="relative"
                                        left="4px"
                                        width="100%"
                                        maxWidth="50px"
                                        src={VerifyIconBlue}
                                      ></Image>
                                      <Text fontSize="16px" color="#0052CC">
                                        Perfil atualizado!
                                      </Text>
                                    </Flex>
                                  </Flex>
                                </>
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </S.Container>
                </Flex>
              </Flex>
            </S.Content>
          )}
        </S.PanelsContainer>
        <S.PanelsContainer>
          {user && (
            <S.Content>
              <Flex flexDir="column">
                <S.Container>
                  <Flex
                    flexDir="column"
                    width={["100%", "90%"]}
                    minW={["100%", "500px"]}
                  >
                    <Flex
                      onSubmit={handleSubmitPassword(handleUpdatePassword)}
                      as="form"
                      flexDir="column"
                    >
                      <Flex flexDir="column" width="100%" gap={10}>
                        <Text fontWeight={700}>Mudança de senha</Text>
                        <S.ContainerInput>
                          <Text fontSize="18px" textColor="rgba(51, 51, 51, 1)">
                            Nova senha:
                          </Text>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={
                                <Image
                                  src={PasswordProfileInput}
                                  pos="relative"
                                  right="10px"
                                />
                              }
                            />
                            <Input
                              variant="flushed"
                              bottom="4px"
                              pl="30px"
                              _placeholder={{
                                color: "#B4B4B4",
                                fontWeight: "normal",
                                fontsize: "12px",
                              }}
                              placeholder="Digite sua senha atual"
                              borderColor="rgba(67, 98, 139, 0.59)"
                              borderBottomWidth="2px"
                              fontSize="14px"
                              type="password"
                              error={formStatePassword.errors.newPassword}
                              {...registerPassword("newPassword")}
                            />
                          </InputGroup>
                        </S.ContainerInput>
                        <Flex flexDir="row" alignItems="flex-end" gap="30px">
                          <S.ContainerInput>
                            <Text
                              fontSize="18px"
                              textColor="rgba(51, 51, 51, 1)"
                            >
                              Confirme sua nova senha:
                            </Text>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={
                                  <Image
                                    src={PasswordProfileInput}
                                    pos="relative"
                                    right="10px"
                                  />
                                }
                              />
                              <Input
                                bottom="4px"
                                pl="30px"
                                variant="flushed"
                                _placeholder={{
                                  color: "#B4B4B4",
                                  fontWeight: "normal",
                                  fontsize: "12px",
                                }}
                                placeholder="Digite novamente a senha"
                                borderColor="rgba(67, 98, 139, 0.59)"
                                borderBottomWidth="2px"
                                fontSize="14px"
                                type="password"
                                error={formStatePassword.errors.confirmation}
                                {...registerPassword("confirmation")}
                              ></Input>
                            </InputGroup>
                          </S.ContainerInput>
                          {!successMessage ? (
                            <Flex width="100%" maxWidth="110px">
                              <Button
                                type="submit"
                                bgColor="#0052CC"
                                color="white"
                                _hover={{ bg: "#0065FF" }}
                                borderRadius="11px"
                                height="33px"
                                width="140px"
                                boxShadow="0px 4.411457061767578px 4.411457061767578px 0px #43628B36"
                              >
                                Salvar
                              </Button>
                            </Flex>
                          ) : (
                            <>
                              <Flex flexDir="column" alignItems="center">
                                <Image
                                  width="100%"
                                  maxWidth="50px"
                                  src={VerifyIconBlue}
                                ></Image>
                                <Text whiteSpace="nowrap" color="#0052CC">
                                  Senha atualizada!
                                </Text>
                              </Flex>
                            </>
                          )}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </S.Container>
              </Flex>
            </S.Content>
          )}
        </S.PanelsContainer>
      </Flex>
    </Flex>
  );
};

export default ResourceInformation;
