export function handleExperienceChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    setExperiencesText: React.Dispatch<React.SetStateAction<string>>
) {
        const text = event.target.value;
        const formattedText = text.replace(/\n/g, "<br>");
        setExperiencesText(formattedText);
    };