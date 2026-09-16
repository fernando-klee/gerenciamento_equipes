export function handleSwitchToggle (
    id: keyof typeof switchStates | 'education' | 'experiences',
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
    setSwitchStates: React.Dispatch<React.SetStateAction<{
    name: boolean;
    email: boolean;
    role: boolean;
    photo: boolean;
    timeInCompany: boolean;
    hardSkills: boolean;
    softSkills: boolean;
}>>
) {
        if (id === 'education') {
            setEducationSwitch(!educationSwitch);
        } else if (id === 'experiences') {
            setExperienceSwitch(!experienceSwitch);
        } else {
            setSwitchStates((prevSwitchStates) => ({
                ...prevSwitchStates,
                [id]: !prevSwitchStates[id as keyof typeof switchStates],
            }));
        }
    };