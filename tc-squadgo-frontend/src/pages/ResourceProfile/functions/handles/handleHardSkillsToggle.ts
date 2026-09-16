import { handleSwitchToggle } from "./handleSwitchToggle";

export function handleHardSkillsToggle(
    setShowHardSkills: React.Dispatch<React.SetStateAction<boolean>>,
    showHardSkills: boolean,
    switchStates: {
        name: boolean;
        email: boolean;
        role: boolean;
        photo: boolean;
        timeInCompany: boolean;
        hardSkills: boolean;
        softSkills: boolean;
    },
    setEducationSwitch: React.Dispatch<React.SetStateAction<boolean>>,
    educationSwitch: boolean,
    setExperienceSwitch:  React.Dispatch<React.SetStateAction<boolean>>,
    experienceSwitch: boolean,
    setSwitchStates:React.Dispatch<React.SetStateAction<{
    name: boolean;
    email: boolean;
    role: boolean;
    photo: boolean;
    timeInCompany: boolean;
    hardSkills: boolean;
    softSkills: boolean;
}>>
) {
        setShowHardSkills(!showHardSkills);
        handleSwitchToggle(
        'hardSkills',
        switchStates,
        setEducationSwitch,
        educationSwitch,
        setExperienceSwitch,
        experienceSwitch,
        setSwitchStates);
    };