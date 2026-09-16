import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { ResourceProfileParams, ResourceProps } from "../interfaces";
import { useAuth } from "../../../context/AuthContext";
import { loadResource } from "../functions/services/loadResources";
import { handleSwitchToggle } from "../functions/handles/handleSwitchToggle";
import { handleEducationChange } from "../functions/handles/handleEducationChange";
import { handleExperienceChange } from "../functions/handles/handleExperienceChange";
import { handleSoftSkillsToggle } from "../functions/handles/handleSoftSkillsToggle";
import { handleHardSkillsToggle } from "../functions/handles/handleHardSkillsToggle";
import { handleSendCreateLetter } from "../functions/handles/handleSendCreateLetter";
import { handleButtonClickAndShowModal } from "../functions/handles/handleButtonClickAndShowModal";
import { handleCancel } from "../functions/handles/handleCancel";
import { handleOneOnOneClick } from "../functions/handles/handleOneOnOneClick";
 

export const useResourceProfile = () => {
    const [resource, setResource] = useState<ResourceProps>()
    const [isLeader, setIsLeader] = useState(false)
    const [resourceExists, setResourceExists] = useState(true)
    const [loadingResource, setLoadingResource] = useState(true)
    const [showModalLetter, setShowModalLetter] = useState(false)
    const [showSoftSkills, setShowSoftSkills] = useState(false);
    const [showHardSkills, setShowHardSkills] = useState(false);
    const [educationSwitch, setEducationSwitch] = useState(false);
    const [experienceSwitch, setExperienceSwitch] = useState(false);
    const [educationText, setEducationText] = useState('');
    const [experiencesText, setExperiencesText] = useState('');
    const [switchStates, setSwitchStates] = useState({
            name: true,
            email: true,
            role: true,
            photo: true,
            timeInCompany: true,
            hardSkills: true,
            softSkills: true,
        });

    const toast = useToast()
    const history = useHistory();
    const { resource_id } = useParams<ResourceProfileParams>()
    const { user } = useAuth()

    useEffect(() => {
        loadResource(resource_id,
            setResource, 
            user, 
            setIsLeader,
            setResourceExists,
            setLoadingResource, 
            toast, 
            history)
    }, [resource_id, toast, user.id, history])


    const services = {
        loadResource: (
            resource_id: string,
            setResource: React.Dispatch<React.SetStateAction<any>>,
            user: { id: string },
            setIsLeader: React.Dispatch<React.SetStateAction<boolean>>,
            setResourceExists: React.Dispatch<React.SetStateAction<boolean>>,
            setLoadingResource: React.Dispatch<React.SetStateAction<boolean>>,
            toast: any,
            history: any
        ) => loadResource(
            resource_id,
            setResource, 
            user, 
            setIsLeader,
            setResourceExists,
            setLoadingResource, 
            toast, 
            history 
        )
    }

    const handles = {
        handleSwitchToggle: (
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
        ) => handleSwitchToggle(
            id, 
            switchStates,
            setEducationSwitch, 
            educationSwitch, 
            setExperienceSwitch,
            experienceSwitch, 
            setSwitchStates
        ),

        handleEducationChange: (
            event: React.ChangeEvent<HTMLTextAreaElement>,
            setEducationText: React.Dispatch<React.SetStateAction<string>>
        ) => handleEducationChange(
            event,
            setEducationText
        ),

        handleExperienceChange: (
            event: React.ChangeEvent<HTMLTextAreaElement>,
            setExperiencesText: React.Dispatch<React.SetStateAction<string>>
        ) => handleExperienceChange(
            event, 
            setExperiencesText
        ),

        handleSoftSkillsToggle: (
            setShowSoftSkills: React.Dispatch<React.SetStateAction<boolean>>,
            showSoftSkills: boolean,
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
        ) => handleSoftSkillsToggle(
            setShowSoftSkills,
            showSoftSkills,
            switchStates,
            setEducationSwitch,
            educationSwitch,
            setExperienceSwitch,
            experienceSwitch,
            setSwitchStates
        ),

        handleHardSkillsToggle: (
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
        ) => handleHardSkillsToggle(
            setShowHardSkills,
            showHardSkills,
            switchStates,
            setEducationSwitch,
            educationSwitch,
            setExperienceSwitch,
            experienceSwitch,
            setSwitchStates
        ),

        handleSendCreateLetter: (
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
        ) => handleSendCreateLetter(
            resource_id,
            switchStates,
            educationSwitch,
            educationText,
            experienceSwitch,
            experiencesText,
            history
        ),

        handleButtonClickAndShowModal: (
            setShowModalLetter: React.Dispatch<React.SetStateAction<boolean>>
        ) => handleButtonClickAndShowModal(
            setShowModalLetter
        ),

        handleCancel: (
            setShowModalLetter: React.Dispatch<React.SetStateAction<boolean>>
        ) => handleCancel (
            setShowModalLetter
        ),

        handleOneOnOneClick: (
            e: React.MouseEvent,
            isLeader: boolean
        ) => handleOneOnOneClick(
            e,
            isLeader
        )
    }

    return {
        states: {
            resource, 
            setResource, 
            isLeader, 
            setIsLeader,
            resourceExists,
            setResourceExists,
            loadingResource,
            setLoadingResource,
            showModalLetter, 
            setShowModalLetter,
            showSoftSkills, 
            setShowSoftSkills,
            showHardSkills, 
            setShowHardSkills,
            educationSwitch, 
            setEducationSwitch,
            experienceSwitch, 
            setExperienceSwitch,
            educationText,
            setEducationText,
            experiencesText, 
            setExperiencesText,
            switchStates, 
            setSwitchStates
        },
        resource_id, 
        user,
        toast,
        history,
        services,
        handles
    }
}