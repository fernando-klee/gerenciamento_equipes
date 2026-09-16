import { useState, useEffect } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { UseFormReset, UseFormClearErrors } from "react-hook-form";
import { loadSkills } from "../functions/loadSkills";
import { closeModal } from "../functions/closeModal";
import { closeUpdateModal } from "../functions/closeUpdateModal";
import { handleDeleteSkill } from "../functions/deleteSkill";
import { orderSkills } from "../functions/orderSkills";
import { selectSkill } from "../functions/selectSkill";
import { handleCreate, handleUpdate } from "../functions/skillHandlers";
import { skillsByType } from "../functions/skillsByType";


export interface SkillFormData {
  description: string;
  type: "HARD" | "SOFT";
}

export interface SkillProps {
  id: number;
  uuid: string;
  description: string;
  type: string;
}

export const useSkillState = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [skills, setSkills] = useState<SkillProps[]>([]);
  const [isLoadingDeleteSkill, setIsLoadingDeleteSkill] = useState(false);

  useEffect(() => {
    loadSkills(setSkills, setLoadingSkills, toast);
  }, [toast]);

  const handles = {
    handleCreate: (
      values: any,
      reset: any,
      clearErrors: any,
      onClose: () => void
    ) =>
      handleCreate(
        values,
        setSkills,
        orderSkills,
        setIsLoading,
        toast,
        () => closeModal(reset, clearErrors, onClose)
    ),
    handleUpdate: (
      values: any,
      selectedSkill: SkillProps | undefined,
      closeUpdateModal: () => void
    ) =>
      handleUpdate(
        values,
        selectedSkill,
        setSkills,
        orderSkills,
        setIsLoadingUpdate,
        toast,
        closeUpdateModal
    ),
    handleDeleteSkill: (
      skill_id: number,
      currentSkills: SkillProps[],
      setSkills: (skills: SkillProps[]) => void
    ) =>
      handleDeleteSkill(
        skill_id,
        currentSkills,
        setSkills,
        setIsLoadingDelete,
        toast
    ),
  }

  const load = {
    loadSkills: () => loadSkills(setSkills, setLoadingSkills, toast)
  }

  const skillsType = {
  skillsByType: (type: string) => skillsByType(skills, type)
  };

  const order = {
    orderSkills: (skillsToOrder: SkillProps[]) => orderSkills(skillsToOrder)
  };

  return {
   skills,
    setSkills,
    isLoading,
    isLoadingUpdate,
    isLoadingDelete,
    isLoadingDeleteSkill,
    setIsLoadingDeleteSkill,
    loadingSkills,
    handles,
    skillsType,
    load,
    order
  };
};

export const useSkillModals = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const [selectedSkill, setSelectedSkill] = useState<SkillProps>();

  const closeModalHandler = {
    closeModal: (
        reset: UseFormReset<any>,
        clearErrors: UseFormClearErrors<any>,
        onClose: () => void 
        ) => 
        closeModal(  reset, clearErrors, onClose),

    closeUpdateModal: (
        setSelectedSkill: (skill: SkillProps | undefined) => void,
        resetUpdate: UseFormReset<SkillFormData>,
        clearErrorsUpdate: () => void,
        onCloseUpdate: () => void
        ) =>
        closeUpdateModal(
        setSelectedSkill,
        resetUpdate,
        clearErrorsUpdate,
        onCloseUpdate
      ),
  }

  const selectHandler = {
    selectSkill: (
      skill: SkillProps,
      resetUpdate: UseFormReset<SkillFormData>,
      clearErrorsUpdate: () => void,
      onOpenUpdate: () => void
    ) =>
      selectSkill(
        skill,
        setSelectedSkill,
        resetUpdate,
        clearErrorsUpdate,
        onOpenUpdate
      ),
  }

  return {
    isOpen, onOpen, onClose,
    isOpenUpdate, onOpenUpdate, onCloseUpdate,
    closeModalHandler,
    selectedSkill,
    setSelectedSkill,
    selectHandler,  
  };
};