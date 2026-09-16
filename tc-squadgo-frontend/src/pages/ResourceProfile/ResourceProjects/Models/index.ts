import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProjectProps, ResourceProfileParams } from "../interfaces"
import { handleLoadResourceProject } from "../functions/handles/handleLoadResourceProject"
import { projectStatus } from "../functions/utils/projectStatus"
import { resourceName } from "../functions/utils/resourceName"


export const useResourceProjects = () => {
    const { resource_id } = useParams<ResourceProfileParams>()

    const toast = useToast()

    const [loadingProjects, setLoadingProjects] = useState(true)
    const [projects, setProjects] = useState<ProjectProps[]>([])

    useEffect(() => {
        handleLoadResourceProject(
            resource_id,
            setProjects,
            setLoadingProjects,
            toast)
    }, [resource_id, toast])

    const handles = {
        handleLoadResourceProject: (
            resource_id: string,
            setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
            setLoadingProjects: React.Dispatch<React.SetStateAction<boolean>>,
            toast: any
        ) => handleLoadResourceProject(
            resource_id,
            setProjects,
            setLoadingProjects,
            toast
        )
    }

    const utils = {
        projectStatus: (status: string) => projectStatus(status),

        resourceName: (name: string) => resourceName(name)
    }

    return {
        states: {
            loadingProjects, 
            setLoadingProjects,
            projects,
            setProjects
        },

        toast,
        resource_id,
        handles,
        utils
    }
}

