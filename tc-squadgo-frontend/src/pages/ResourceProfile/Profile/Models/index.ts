import { useDisclosure, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FeedbackProps, ProjectProps, ResourceHistoric, ResourceHistoricFilter, ResourceProfileParams, ResourceProps } from "../interfaces"
import { loadResource } from "../functions/services/loadResource"
import { loadLastFeedbacks } from "../functions/services/loadLastFeedbacks"
import { handleLoadResourceProject } from "../functions/handles/handleLoadResourceProject"
import { handleLoadLastsHistorics } from "../functions/handles/handleLoadLastsHistorics"
import { handleloadMoreHistorics } from "../functions/handles/handleLoadMoreHistorics"
import { projectStatus } from "../functions/utils/projectsStatus"
import { feedbackType } from "../functions/utils/feedbackType" 
import { resourceName } from "../functions/utils/resourceName"
import { handlePaginateHistoric } from "../functions/handles/handlePaginateHistoric"


export const useResourceProfile = () => {
    const { resource_id } = useParams<ResourceProfileParams>()
    
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [loadingResource, setLoadingResource] = useState(true)
    const [resource, setResource] = useState<ResourceProps>()

    const [loadingResourceProject, setLoadingResourceProject] = useState(true)
    const [projects, setProjects] = useState<ProjectProps[]>([])

    const [loadingFeedbacks, setLoadingFeedbacks] = useState(true)
    const [feedbacks, setFeedbacks] = useState<FeedbackProps[]>([])

    const [isLoadingHistoric, setIsLoadingHistoric] = useState(true)
    const [loadingMoreHistoric, setLoadingMoreHistoric] = useState(true)
    const [resourceHistorics, setResourceHistorics] = useState<ResourceHistoric[]>([])
    const [historicFilter, setHistoricFilter] = useState<Omit<ResourceHistoricFilter, 'data'>>({
        totalHistoric: 0,
        current_page: 1,
        last_page: 1
    })


    useEffect(() => {
        loadResource(resource_id, setResource,setLoadingResource, toast),
        loadLastFeedbacks(resource_id, setFeedbacks, setLoadingFeedbacks)
    }, [resource_id, toast])


    useEffect(() => {
        handleLoadResourceProject(
            resource_id,
            setProjects,
            setLoadingResourceProject,
            toast)
    }, [resource, resource_id, toast])


    useEffect(() => {
        handleLoadLastsHistorics(
            resource_id,
            setHistoricFilter,
            setIsLoadingHistoric)
    }, [resource_id])

    useEffect(() => {
        handleloadMoreHistorics(
            resource_id,
            historicFilter,
            setResourceHistorics,
            setLoadingMoreHistoric,
            setIsLoadingHistoric
        )
    }, [historicFilter.current_page, resource_id])

    const services = {
        loadResource: (
            resource_id: string,
            setResource: React.Dispatch<React.SetStateAction<ResourceProps | undefined>>,
            setLoadingResource: React.Dispatch<React.SetStateAction<boolean>>,
            toast: any
        ) => loadResource(
            resource_id,
            setResource,
            setLoadingResource,
            toast
        ),

        loadLastFeedbacks: (
            resource_id: string,
            setFeedbacks: React.Dispatch<React.SetStateAction<FeedbackProps[]>>,
            setLoadingFeedbacks: React.Dispatch<React.SetStateAction<boolean>>
        ) => loadLastFeedbacks(
            resource_id,
            setFeedbacks, 
            setLoadingFeedbacks
        )
    }

    const handles = {
        handleLoadResourceProject: (
            resource_id: string,
            setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
            setLoadingResourceProject: React.Dispatch<React.SetStateAction<boolean>>,
            toast: any
        ) => handleLoadResourceProject(
            resource_id,
            setProjects,
            setLoadingResourceProject,
            toast
        ),

        handleLoadLastsHistorics:(
            resource_id: string, 
            setHistoricFilter: React.Dispatch<React.SetStateAction<Omit<ResourceHistoricFilter, "data">>>,
            setIsLoadingHistoric: React.Dispatch<React.SetStateAction<boolean>>
        ) => handleLoadLastsHistorics(
            resource_id,
            setHistoricFilter,
            setIsLoadingHistoric
        ),
        
        handleloadMoreHistorics:(
            resource_id: string,
            historicFilter: Omit<ResourceHistoricFilter, "data">,
            setResourceHistorics: React.Dispatch<React.SetStateAction<ResourceHistoric[]>>,
            setLoadingMoreHistoric: React.Dispatch<React.SetStateAction<boolean>>,
            setIsLoadingHistoric: React.Dispatch<React.SetStateAction<boolean>>
        ) => handleloadMoreHistorics(
            resource_id,
            historicFilter,
            setResourceHistorics,
            setLoadingMoreHistoric,
            setIsLoadingHistoric
        ),

        handlePaginateHistoric:(
            historicFilter: Omit<ResourceHistoricFilter, "data">,
            setHistoricFilter: React.Dispatch<React.SetStateAction<Omit<ResourceHistoricFilter, "data">>> ,
            setLoadingMoreHistoric: React.Dispatch<React.SetStateAction<boolean>>
        ) => handlePaginateHistoric(
            historicFilter,
            setHistoricFilter, 
            setLoadingMoreHistoric
        )

    }

    const utils = {
        projectStatus: (status: string) => projectStatus(status),

        feedbackType: (feedback: FeedbackProps) => feedbackType(feedback),

        resourceName:(name: string) => resourceName(name),
    }

    return {
        states: {
            loadingResource, 
            setLoadingResource,
            resource, 
            setResource,
            loadingResourceProject, 
            setLoadingResourceProject,
            projects, 
            setProjects,
            loadingFeedbacks, 
            setLoadingFeedbacks,
            feedbacks, 
            setFeedbacks,
            isLoadingHistoric, 
            setIsLoadingHistoric,
            loadingMoreHistoric, 
            setLoadingMoreHistoric,
            resourceHistorics, 
            setResourceHistorics,
            historicFilter, 
            setHistoricFilter
        },

        modals: {
            isOpen, onOpen, onClose
        },

        resource_id,
        toast,
        services,
        handles,
        utils 
    }
}