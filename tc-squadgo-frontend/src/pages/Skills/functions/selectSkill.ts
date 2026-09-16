import { UseFormReset } from "react-hook-form";
import { SkillFormData } from "../schemas/SkillSchema";
import { SkillProps } from "../models";

export function selectSkill (
  skill: SkillProps,
  setSelectedSkill: (skill: SkillProps) => void,
  resetUpdate: UseFormReset<SkillFormData>,
  clearErrorsUpdate: () => void,
  onOpenUpdate: () => void
) {
  setSelectedSkill(skill);
  resetUpdate(skill);
  clearErrorsUpdate();
  onOpenUpdate();
};