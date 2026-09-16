import { api } from "../../../services/api";
import { SkillProps } from "../models";
import { useToast } from "@chakra-ui/react";
import { orderSkills } from "./orderSkills";

export async function loadSkills (
  setSkills: (skills: SkillProps[]) => void,
  setLoadingSkills: (loading: boolean) => void,
  toast: ReturnType<typeof useToast>
): Promise<void> {
  try {
    setLoadingSkills(true);
    const response = await api.get("/skills");
    const ordered = orderSkills(response.data); 
    setSkills(ordered);
  } catch (error) {
    toast({
      title: "Erro ao carregar skills",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  } finally {
    setLoadingSkills(false);
  }
};