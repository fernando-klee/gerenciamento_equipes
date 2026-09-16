export function handleStatusChange(
    event: any,
    setProjectStatus: React.Dispatch<React.SetStateAction<string>>
) {
    const status = event.target.value;
    setProjectStatus(status);
  };