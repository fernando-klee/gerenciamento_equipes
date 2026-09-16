export async function handleSendCreateLetter(
    resource_id: string,
    switchStates: {
        name: boolean;
        email: boolean;
        role: boolean;
        photo: boolean;
        timeInCompany: boolean;
        hardSkills: boolean;
        softSkills: boolean;
    },
    educationSwitch: boolean,
    educationText: string,
    experienceSwitch: boolean,
    experiencesText: string,
    history: any
) {
        try {
            const queryParams = new URLSearchParams();

            Object.entries(switchStates).forEach(([key, value]) => {
                queryParams.append(key, String(value));
            });

            queryParams.append('educationSwitch', String(educationSwitch));
            if (educationSwitch) {
                const formattedEducationText = educationText.replace(/<br>/g, "\n");
                queryParams.append('educationText', formattedEducationText);
                localStorage.setItem("educationText", formattedEducationText);
            }

            queryParams.append('experiencesSwitch', String(experienceSwitch));
            if (experienceSwitch) {
                const formattedExperiencesText = experiencesText.replace(/<br>/g, "\n");
                queryParams.append('experiencesText', formattedExperiencesText);
                localStorage.setItem("experiencesText", formattedExperiencesText);
            }

            history.push(`/carta-de-apresentacao/${resource_id}?${queryParams.toString()}`);
        } catch (error) {
            console.log("Error:", error);
        }
    };