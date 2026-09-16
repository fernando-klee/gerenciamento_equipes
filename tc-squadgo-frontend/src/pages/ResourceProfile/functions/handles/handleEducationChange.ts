export function handleEducationChange (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    setEducationText: React.Dispatch<React.SetStateAction<string>>
) {
        const text = event.target.value;
        const formattedText = text.replace(/\n/g, "<br>");
        
        setEducationText(formattedText);
        localStorage.setItem("educationText", formattedText);
    };