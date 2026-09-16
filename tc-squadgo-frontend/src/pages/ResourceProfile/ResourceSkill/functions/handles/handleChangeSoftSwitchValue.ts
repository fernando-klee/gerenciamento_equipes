export function handleChangeSoftSwitchValue(
    event: React.ChangeEvent<HTMLInputElement>,
    startValueSoftSkillSwitch: number,
    setStartValueSoftSkillSwitch: React.Dispatch<React.SetStateAction<number>>,
    setGeralSoftSkillsUpdate: React.Dispatch<React.SetStateAction<boolean>>
) {
    const isChecked = event.target.checked

    if (startValueSoftSkillSwitch === 0) {
        setStartValueSoftSkillSwitch(1)
        setGeralSoftSkillsUpdate(isChecked)
    } else if (startValueSoftSkillSwitch === 1) {
        setStartValueSoftSkillSwitch(2)
        setGeralSoftSkillsUpdate(isChecked)
    } else {
        setStartValueSoftSkillSwitch(0)
        setGeralSoftSkillsUpdate(false)
    }
}
