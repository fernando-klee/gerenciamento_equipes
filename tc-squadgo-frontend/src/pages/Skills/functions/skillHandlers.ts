import { api } from "../../../services/api";
import { SkillProps } from "../models";


export async function handleCreate(
  values: any,
  setSkills: (updater: (prev: SkillProps[]) => SkillProps[]) => void,
  orderSkills: (skills: SkillProps[]) => SkillProps[], 
  setIsLoading: (loading: boolean) => void,
  toast: any,
  closeModal: () => void
) {
  setIsLoading(true);
  try {
    const response = await api.post("/skills", values);
    const createEntity = response.data;

    setSkills(prev => {
      const newSkills = [...prev, createEntity];
      return orderSkills(newSkills); 
    });

    toast({
      title: "Skill cadastrada com sucesso!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    closeModal();
  } catch (err: any) {
    const { message } = err.response.data;
    toast({
      title: message,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  } finally {
    setIsLoading(false);
  }
}

export async function handleUpdate(
  values: any,
  selectedSkill: SkillProps | undefined,
  setSkills: (updater: (prev: SkillProps[]) => SkillProps[]) => void,
  orderSkills: (skills: SkillProps[]) => SkillProps[], 
  setIsLoadingUpdate: (loading: boolean) => void,
  toast: any,
  closeUpdateModal: () => void
) {
  setIsLoadingUpdate(true);

  if (!selectedSkill) {
    toast({
      title: "Nenhuma skill selecionada para atualização.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    setIsLoadingUpdate(false);
    return;
  }

  try {
    
    let isDuplicate = false;
    setSkills(prev => {
      isDuplicate = prev.some(
        skill =>
          skill.description.trim().toLowerCase() === values.description.trim().toLowerCase() &&
          skill.id !== selectedSkill.id
      );
      return prev;
    });

    if (isDuplicate) {
      toast({
        title: "Já existe uma skill com esse nome.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsLoadingUpdate(false);
      return;
    }

    const response = await api.put(`/skills/${selectedSkill.id}`, values);
    const newSkillUpdated: SkillProps = response.data;

    setSkills(prev => {
      const updated = prev.map(skill =>
        skill.id === selectedSkill.id ? newSkillUpdated : skill
      );
      return orderSkills(updated); 
    });

    toast({
      title: "Skill atualizada com sucesso!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    closeUpdateModal();
  } catch (err: any) {
    const { message } = err.response?.data || { message: "Erro inesperado." };
    toast({
      title: message,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  } finally {
    setIsLoadingUpdate(false);
  }
}