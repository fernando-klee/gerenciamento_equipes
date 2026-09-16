import { ChangeEvent, useContext, useEffect, useState } from "react"
import { useDisclosure, useToast } from "@chakra-ui/react"
import { ResourcesContext } from "../../../context/ResourceContext"
import { LeaderProps, ResourceProjectsProps, ResourceProps } from "../interfaces"
import { filterResourcesByName } from "../functions/services/FilterResourcesByName"
import { filterResourcesByClassification } from "../functions/services/FilterResourcesByClassification"
import { handleViewSelectedResource } from "../functions/handles/handleViewSelectedResource"
import { handleSelectResource } from "../functions/handles/handleSelectResource"
import { handleSetValueOnSelectResource } from "../functions/handles/handleSetValueOnSelectResource"
import { resourceStatusDescription } from "../functions/utils/ResourceStatusDescription"
import { handleSelectResourceAndListProjects } from "../functions/handles/handleSelectResourceAndListProjects"
import { generateOrganogram } from "../functions/utils/generateOrganogram"
import { handleSetValueOnViewSelectedResource } from "../functions/handles/handleSetValueOnViewSelectedResource"
import { handleSetValueOnFilterResourcesByClassification } from "../functions/handles/handleSetValueOnFilterResourcesByClassification"
import { handleSetValueOnFilterResourcesByName } from "../functions/handles/handleSetValueOnFilterResourcesByName"
import { handleSelectDefaultOrOther } from "../functions/handles/handleSelectDefaultOrOther"
import { typeOfResources } from "../functions/services/typeOfResources"
import { filterLeaderById } from "../functions/services/filterLeaderById"
import { handleUpdateResource } from "../functions/handles/handleUpdateResource"
import { verifyResourceProjectsStatus } from "../functions/services/verifyResourceProjectsStatus"
import { handlePhotoUpdate } from "../functions/handles/handlePhotoUpdate"
import { handleSetValueOnVerifyResourceProjectsStatus } from "../functions/handles/handleSetValueOnVerifyResourceProjectsStatus"
import { handleOnSubmit } from "../functions/handles/handleOnSubmit" 
import { getResourceTypes } from "../functions/services/getResourcesTypes"


export const useResource = () => {
    const [selectResourceId, setSelectResourceId] = useState<number>(-1)
    const [selectResourceProjectLists, setSelectResourceProjectLists] = useState<ResourceProjectsProps | undefined>()
    const [loadingResourceProjectLists, setLoadingResourceProjectLists] = useState<boolean>(false)
    
    const [showNotActiveResources, setShowNotActiveResources] = useState(false)
    const [selectOtherList, setSelectOtherList] = useState(false)
    const [isLoadingUpdating, setIsLoadingUpdating] = useState(false);
    const toast = useToast();

    const {
        isOpen: isOpenView,
        onOpen: onOpenView,
        onClose: onCloseView
    } = useDisclosure()

    const {
        isOpen: isOpenUpdate,
        onOpen: onOpenUpdate,
        onClose: onCloseUpdate
    } = useDisclosure()


    const {read, write} = useContext(ResourcesContext)

    const services = {
        filterResourcesByName:(
            name: string, {setResourcesFiltered,resources,}: {
            setResourcesFiltered: any,
            resources: any[],}
        ) => filterResourcesByName(
            name,
            {setResourcesFiltered,
            resources}
        ),

        filterResourcesByClassification:(
            classificationResource: number, {
            setResourcesFiltered,
            resources,
            }: {
                setResourcesFiltered: any,
                resources: any[],
            }
        ) => filterResourcesByClassification(
            classificationResource,
            { setResourcesFiltered,
            resources, }
        ), 

        typeOfResources:(
            tableName: string, 
            selectOtherList: boolean,
            {resourcesFiltered} : {resourcesFiltered: ResourceProps[]}
        ) => typeOfResources(
            tableName,
            selectOtherList,
            {resourcesFiltered}
        ),

        filterLeaderById:(
            idLeader: number,
            leadersComplete: LeaderProps[],
            setSelectedLeader: React.Dispatch<React.SetStateAction<string>>
        ) => filterLeaderById(
            idLeader,
            leadersComplete,
            setSelectedLeader
        ),

        verifyResourceProjectsStatus:(
            e: ChangeEvent<HTMLInputElement>, {
                selectedResource,
                setResourceProjectStatusValues,
            }: {
                selectedResource: ResourceProps,
                setResourceProjectStatusValues: any,
            }
        ) => verifyResourceProjectsStatus(
            e, 
            {selectedResource,
            setResourceProjectStatusValues}
        ), 
        getResourceTypes:( 
            {selectedResource}: {selectedResource: ResourceProps | undefined}
        ) => getResourceTypes({selectedResource})
    }

    const handles = {
        handleViewSelectedResource:(
            resource_id: number, {
                resources,
                setSelectedResource,
                onOpenView
            }: {
                resources: ResourceProps[],
                setSelectedResource: any,
                onOpenView: () => void
            }
        ) => handleViewSelectedResource(
            resource_id, {
                resources,
                setSelectedResource,
                onOpenView
            }
        ),

        handleSelectResource:(
            resource_id: number, {
            setResourceProjectStatus,
            resetUpdateResourceModal,
            clearUpdateErrors,
            resources,
            leadersComplete,
            setSelectedLeader,
            setSelectedResource,
            setValueUpdate,
            onOpenUpdate
        }: {
            setResourceProjectStatus: any,
            resetUpdateResourceModal: any,
            clearUpdateErrors: any,
            resources: any[],
            leadersComplete: any[],
            setSelectedLeader: any,
            setSelectedResource: any,
            setValueUpdate: any,
            onOpenUpdate: () => void
        }
        ) => handleSelectResource(
            resource_id, {
                setResourceProjectStatus,
                resetUpdateResourceModal,
                clearUpdateErrors,
                resources,
                leadersComplete,
                setSelectedLeader,
                setSelectedResource,
                setValueUpdate,
                onOpenUpdate
            }
        ),

        handleSetValueOnSelectResource:(
            resource_id: number, 
            { read, write, onOpenUpdate }: {
                read: any, 
                write: any, 
                onOpenUpdate: () => void
            }
        ) => handleSetValueOnSelectResource(
            resource_id, {read, write, onOpenUpdate}
        ),

        handleSelectResourceAndListProjects:(
            resource_id: number,
            selectResourceId: number,
            setLoadingResourceProjectLists: React.Dispatch<React.SetStateAction<boolean>>,
            setSelectResourceId: React.Dispatch<React.SetStateAction<number>>,
            setSelectResourceProjectLists: React.Dispatch<React.SetStateAction<ResourceProjectsProps | undefined>>
        ) => handleSelectResourceAndListProjects(
            resource_id,
            selectResourceId,
            setLoadingResourceProjectLists,
            setSelectResourceId,
            setSelectResourceProjectLists
        ),

        handleSetValueOnViewSelectedResource:(
            resource_id: number, {resources,
            setSelectedResource,
            onOpenView}: {
                resources: ResourceProps[],
                setSelectedResource: React.Dispatch<React.SetStateAction<ResourceProps | undefined>>,
                onOpenView: () => void
            }
        ) => handleSetValueOnViewSelectedResource(
            resource_id, {resources, setSelectedResource, onOpenView}
        ),

        handleSetValueOnFilterResourcesByClassification: (
            classification: string, {write, read}: {write: any, read: any}
        ) => handleSetValueOnFilterResourcesByClassification(
            classification, {write, read}
        ),

        handleSetValueOnFilterResourcesByName:(
            name: string, {write, read}:{write: any, read: any}
        ) => handleSetValueOnFilterResourcesByName(
            name, {write, read}
        ),

        handleSelectDefaultOrOther:(
            setSelectOtherList: React.Dispatch<React.SetStateAction<boolean>>
        ) => handleSelectDefaultOrOther(
            setSelectOtherList
        ),

        handleUpdateResource:(
            values: any, 
            selectedResource: any, 
            toast: any, 
            leaderId: any, 
            resources: any, 
            setResourcesValues: any,
            setResourcesFiltered: any, 
            resetUpdateResourceModal: any, 
            clearUpdateErrors: any, 
            onCloseUpdate: any
        ) => handleUpdateResource(
            values,
            selectedResource,
            toast,
            leaderId,
            resources,
            setResourcesValues,
            setResourcesFiltered,
            resetUpdateResourceModal,
            clearUpdateErrors,
            onCloseUpdate
        ),

        handlePhotoUpdate:(
            e: ChangeEvent<HTMLInputElement>,
            {selectedResource, resources, setResources, setSelectedResource
            }: {selectedResource: ResourceProps | undefined, resources: ResourceProps[], setResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>, 
                setSelectedResource: React.Dispatch<React.SetStateAction<ResourceProps | undefined>>},
            toast: any
        ) => handlePhotoUpdate(
            e, {selectedResource, resources, setResources, setSelectedResource}, toast
        ),

        handleSetValueOnVerifyResourceProjectsStatus:(
            event: ChangeEvent<HTMLInputElement>, {
            selectedResource,
            setResourceProjectStatusValues,
            }: {
                selectedResource: ResourceProps,
                setResourceProjectStatusValues: any,
            }
        ) => handleSetValueOnVerifyResourceProjectsStatus(
            event, { selectedResource, setResourceProjectStatusValues}
        ),

        handleOnSubmit:(
            values: any, {
            selectedResource,
            toast,
            leaderId,
            resources,
            setResourcesValues,
            setResourcesFilteredValues,
            resetUpdateResourceModal,
            clearUpdateErrors,
            onCloseUpdate,
            handleUpdateResource,
        }: {
            selectedResource: any,
            toast: any,
            leaderId: number | null,
            resources: any[],
            setResourcesValues: (resources: any[]) => void,
            setResourcesFilteredValues: (resources: any[]) => void,
            resetUpdateResourceModal: () => void,
            clearUpdateErrors: () => void,
            onCloseUpdate: () => void,
            handleUpdateResource: any,
        }
        ) => handleOnSubmit(
            values, {
                selectedResource,
                toast,
                leaderId,
                resources,
                setResourcesValues,
                setResourcesFilteredValues,
                resetUpdateResourceModal,
                clearUpdateErrors,
                onCloseUpdate,
                handleUpdateResource
            }
        )

    }

    const utils = {
        resourceStatusDescription:(
            status: string,
            hours_amount: number,
            classification?: string
        ) => resourceStatusDescription(
            status,
            hours_amount,
            classification    
        ), 

        generateOrganogram:() => generateOrganogram()  
    }

    return {
        context: {
            read, 
            write
        },

        states: {
            selectResourceId, 
            setSelectResourceId,
            selectResourceProjectLists, 
            setSelectResourceProjectLists,
            loadingResourceProjectLists, 
            setLoadingResourceProjectLists,
            showNotActiveResources, 
            setShowNotActiveResources,
            selectOtherList, 
            setSelectOtherList,
            isLoadingUpdating, 
            setIsLoadingUpdating
        },

        modals: {
            isOpenView,
            onOpenView,
            onCloseView,
            isOpenUpdate,
            onOpenUpdate,
            onCloseUpdate
        },

        toast,
        services,
        handles,
        utils
    }
}