import { v4 } from "uuid";
import { SkillProps } from "../models";

export const skillsByType = (skills: SkillProps[], type: string): SkillProps[] => {
  return skills
    .filter((skill) => skill.type === type)
    .map((skill) => ({ ...skill, uuid: v4() }));
};