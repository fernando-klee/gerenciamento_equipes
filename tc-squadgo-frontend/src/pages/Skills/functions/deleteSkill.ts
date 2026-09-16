import { api } from "../../../services/api";
import { SkillProps } from "../models";

export async function handleDeleteSkill (
  skill_id: number,
  currentSkills: SkillProps[],
  setSkills: (skills: SkillProps[]) => void,
  setIsLoadingDelete: (loading: boolean) => void,
  toast: any
) {
  setIsLoadingDelete(true);
  try {
    await api.delete(`/skills/${skill_id}`);
    const updatedSkills = currentSkills.filter(skill => skill.id !== skill_id);
    setSkills(updatedSkills);

    toast({
      title: "Skill deletada com sucesso!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (error) {
    toast({
      title: "Erro ao deletar skill",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  } finally {
    setIsLoadingDelete(false);
  }
};