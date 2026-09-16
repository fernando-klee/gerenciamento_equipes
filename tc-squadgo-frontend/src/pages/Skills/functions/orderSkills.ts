import { SkillProps } from "../models";

export function orderSkills(skillsToOrder: SkillProps[]): SkillProps[] {
  return [...skillsToOrder].sort((a, b) => 
    a.description.localeCompare(b.description)
  );
}