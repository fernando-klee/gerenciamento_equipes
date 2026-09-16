export function handleChangeHardSwitchValue(
    event: React.ChangeEvent<HTMLInputElement>,
    startValueHardSkillSwitch: number,
    setStartValueHardSkillSwitch: React.Dispatch<React.SetStateAction<number>>,
    setGeralHardSkillsUpdate: React.Dispatch<React.SetStateAction<boolean>>
) {
        const isChecked = event.target.checked

        if (startValueHardSkillSwitch === 0) {
            setStartValueHardSkillSwitch(1)
            setGeralHardSkillsUpdate(isChecked)
        } else if (startValueHardSkillSwitch === 1) {
            setStartValueHardSkillSwitch(2)
            setGeralHardSkillsUpdate(isChecked)
        } else {
            setStartValueHardSkillSwitch(0)
            setGeralHardSkillsUpdate(false)
        }
    }