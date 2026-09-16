import {
  Box,
  Button,
  Flex,
  Select as ChakraSelect,
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
} from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import SkillType from "./SkillType";
import Input from "../../components/Forms/Input";
import * as S from "./styles";
import { MdAddchart } from "react-icons/md";
import Header from "../../components/Header";
import { useSkillModals, useSkillState, SkillProps, SkillFormData } from "./models";
import { skillSchema } from "./schemas/SkillSchema";


const Skills: React.FC = () => {
  
  const { register, handleSubmit, formState, reset, clearErrors } = useForm<SkillFormData>({
    resolver: yupResolver(skillSchema),
  });

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: formStateUpdate,
    reset: resetUpdate,
    clearErrors: clearErrorsUpdate,
  } = useForm<SkillFormData>({
    resolver: yupResolver(skillSchema),
  });

  const skillsHook = useSkillState();
  const modalsHooks = useSkillModals();

  return (
    <>
      <Header
        buttons={[
          {
            createPermissions: ["create_skill"],
            newIcon: MdAddchart,
            onClick: () => modalsHooks.onOpen(),
            title: "Criar skill",
          },
        ]}
      />

      <Flex flexDirection={"column"}>
        <S.PanelsContent>
          <SkillType
            title="Hard Skills"
            text="hard skill"
            skills={skillsHook.skillsType.skillsByType("HARD")}
            loadingSkills={skillsHook.loadingSkills}
            isLoadingDeleteSkill={skillsHook.isLoadingDeleteSkill}
            selectSkill={(skill: SkillProps) =>
              modalsHooks.selectHandler.selectSkill(skill, resetUpdate, clearErrorsUpdate, modalsHooks.onOpenUpdate)}
            deleteSkill={(skillId: number) =>
              skillsHook.handles.handleDeleteSkill(skillId, skillsHook.skills, skillsHook.setSkills)
            }
          />
          <SkillType
            title="Soft Skills"
            text="soft skill"
            skills={skillsHook.skillsType.skillsByType("SOFT")}
            loadingSkills={skillsHook.loadingSkills}
            isLoadingDeleteSkill={skillsHook.isLoadingDeleteSkill}
            selectSkill={(skill: SkillProps) =>
              modalsHooks.selectHandler.selectSkill(skill, resetUpdate, clearErrorsUpdate, modalsHooks.onOpenUpdate)}
            deleteSkill={(skillId: number) =>
              skillsHook.handles.handleDeleteSkill(skillId, skillsHook.skills, skillsHook.setSkills)
            }
          />
        </S.PanelsContent>

        <Modal
          isOpen={modalsHooks.isOpen}
          onClose={() => modalsHooks.closeModalHandler.closeModal(reset, clearErrors, modalsHooks.onClose)}
        >
          <ModalOverlay />
          <ModalContent>
            <Box
              as="form"
              onSubmit={handleSubmit((values) =>
                skillsHook.handles.handleCreate(values, reset, clearErrors, modalsHooks.onClose)
              )}
            >
              <ModalHeader>Cadastro de Skills</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexDir={"column"} gap={4}>
                  <Input
                    label="Nome"
                    placeholder="Selenium, Cypress..."
                    error={formState.errors.description}
                    {...register("description")}
                  />
                  <FormControl isInvalid={!!formState.errors.type}>
                    <FormLabel>Tipo</FormLabel>
                    <ChakraSelect placeholder="Selecione..." {...register("type")}>
                      <option value="HARD">Hard Skill</option>
                      <option value="SOFT">Soft Skill</option>
                    </ChakraSelect>
                    <FormErrorMessage>
                      {formState.errors.type && formState.errors.type.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={() => modalsHooks.closeModalHandler.closeModal(reset, clearErrors, modalsHooks.onClose)}
                >
                  Cancelar
                </Button>
                <Button type="submit" colorScheme="blue">
                  Cadastrar
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={modalsHooks.isOpenUpdate}
          onClose={() =>
            modalsHooks.closeModalHandler.closeUpdateModal(
              modalsHooks.setSelectedSkill,
              resetUpdate,
              clearErrorsUpdate,
              modalsHooks.onCloseUpdate
            )
          }
        >
          <ModalOverlay />
          <ModalContent>
            <Box
              as="form"
              onSubmit={handleSubmitUpdate((values) =>
                skillsHook.handles.handleUpdate(values, modalsHooks.selectedSkill, modalsHooks.onCloseUpdate)
              )}
            >
              <ModalHeader>Atualizar {modalsHooks.selectedSkill?.description}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {modalsHooks.selectedSkill && (
                  <Flex flexDir={"column"} gap={4}>
                    <Input
                      label="Nome"
                      placeholder="C#, Python..."
                      error={formStateUpdate.errors.description}
                      {...registerUpdate("description")}
                    />
                    <FormControl isInvalid={!!formStateUpdate.errors.type}>
                      <FormLabel>Tipo</FormLabel>
                      <ChakraSelect {...registerUpdate("type")}>
                        <option value="HARD">Hard Skill</option>
                        <option value="SOFT">Soft Skill</option>
                      </ChakraSelect>
                      <FormErrorMessage>
                        {formStateUpdate.errors.type?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={modalsHooks.onCloseUpdate}>
                  Cancelar
                </Button>
                <Button type="submit" colorScheme="blue">
                  Atualizar
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default Skills;
