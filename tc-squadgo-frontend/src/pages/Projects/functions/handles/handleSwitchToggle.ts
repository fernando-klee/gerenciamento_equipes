export function handleSwitchToggle(
    setSwitchEstimate: React.Dispatch<React.SetStateAction<boolean>>,
    switchEstimate: boolean
) {
    setSwitchEstimate(!switchEstimate);
  };