import { UseFormReset } from "react-hook-form";
import { SkillFormData } from "../schemas/SkillSchema";
import { SkillProps } from "../models";

export function closeUpdateModal (
  setSelectedSkill: (skill: SkillProps | undefined) => void,
  resetUpdate: UseFormReset<SkillFormData>,
  clearErrorsUpdate: () => void,
  onCloseUpdate: () => void
) {
  setSelectedSkill(undefined);
  resetUpdate();
  clearErrorsUpdate();
  onCloseUpdate();
};