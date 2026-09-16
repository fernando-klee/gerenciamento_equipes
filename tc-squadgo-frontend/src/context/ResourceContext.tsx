import React, { createContext, useEffect, useState } from "react"
import {
    ClassificationProps,
    LeaderProps,
    ResourceProjectStatusProps,
    ResourceProps,
    TypesProps
} from "../pages/Resources/interfaces"
import { api } from "../services/api"
import { parseISO } from "date-fns"
import { v4 } from "uuid"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { resourceSchema } from "../pages/Resources/schemas/ResourceSchema"

interface ResourcesContextType {
    read: {
        resources: ResourceProps[],
        resourcesFiltered: ResourceProps[],
        loadingResources: boolean,
        resourceProjectStatus: ResourceProjectStatusProps | undefined,
        types: TypesProps[],
        classifications: ClassificationProps[],
        leaders: string[],
        selectedResource: any,
        leadersComplete: LeaderProps[],
        selectedLeader: string,
        leaderId: number | null,
    },
    write: {
        setValueUpdate: (name: string, value: any) => void,
        registerUpdateResource: (...args: any[]) => any,
        handleSubmitUpdateResource: (...args: any[]) => any,
        resetUpdateResourceModal: (...args: any[]) => any,
        clearUpdateErrors: (...args: any[]) => any,
        setResourcesValues: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
        setResourcesFilteredValues: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
        setResourceProjectStatusValues: React.Dispatch<React.SetStateAction<ResourceProjectStatusProps | undefined>>,
        setSelectedLeader: React.Dispatch<React.SetStateAction<string>>,
        setSelectedResourceValue: React.Dispatch<React.SetStateAction<ResourceProps | undefined>>,
        controlUpdate: any,
        formStateUpdate: any,
    }
}

interface ResourcesProvider {
    children: React.ReactNode
}

export const ResourcesContext = createContext({} as ResourcesContextType)

export function ResourcesProvider({ children }: ResourcesProvider) {
    const [resources, setResources] = useState<ResourceProps[]>([])
    const [resourcesFiltered, setResourcesFiltered] = useState<ResourceProps[]>([])
    const [resourceProjectStatus, setResourceProjectStatus] = useState<ResourceProjectStatusProps | undefined>(undefined)
    const [selectedResource, setSelectedResource] = useState<ResourceProps>()

    const [leaders, setLeaders] = useState<string[]>([])
    const [leadersComplete, setLeadersComplete] = useState<LeaderProps[]>([])
    const [selectedLeader, setSelectedLeader] = useState<string>('')
    const [leaderId, setLeaderId] = useState<number | null>(null)

    const [types, setTypes] = useState<TypesProps[]>([])
    const [classifications, setClassifications] = useState<ClassificationProps[]>([])

    const [loadingResources, setLoadingResources] = useState<boolean>(true)

    const {
        control: controlUpdate,
        setValue: setValueUpdate,
        register: registerUpdateResource,
        handleSubmit: handleSubmitUpdateResource,
        formState: formStateUpdate,
        reset: resetUpdateResourceModal,
        clearErrors: clearUpdateErrors
    } = useForm({
        resolver: yupResolver(resourceSchema)
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/resources/responsibles')
                const names = response.data.map((leader: { name: string }) => leader.name)
                setLeadersComplete(response.data)
                setLeaders(names)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        async function loadTypes() {
            await api.get('/types')
                .then(res => {
                    setTypes(res.data)
                })
        }

        loadTypes()
    }, [])

    useEffect(() => {
        async function loadClassifications() {
            const response = await api.get('/classifications')
            setClassifications(response.data)
        }

        loadClassifications()
    }, [])

    useEffect(() => {
        async function loadResources() {
            const response = await api.get(`/resources`)
            const currentResources = response.data.map((cr: ResourceProps) => {
                let admission_date = null
                if (cr.admission_date) admission_date = parseISO(cr.admission_date + '')

                let vacation_date = null
                if (cr.vacation_date) {
                    vacation_date = parseISO(cr.vacation_date + '')
                }

                let backFromVacation = null
                if (cr.backFromVacation) {
                    backFromVacation = parseISO(cr.backFromVacation + '')
                }

                let departure_forecast = null
                if (cr.departure_forecast) {
                    departure_forecast = parseISO(cr.departure_forecast + '')
                }

                return {
                    ...cr, uuid1: v4(), uuid2: v4(), uuid3: v4(), admission_date,
                    vacation_date, backFromVacation, departure_forecast
                }
            })
            setResources(currentResources)
            setResourcesFiltered(currentResources)
            setLoadingResources(false)
        }

        loadResources()
    }, [])

    return (
        <ResourcesContext.Provider
            value={{
                read: {
                    resources,
                    resourcesFiltered,
                    loadingResources,
                    resourceProjectStatus,
                    types,
                    classifications,
                    leaders,
                    selectedResource,
                    leadersComplete,
                    selectedLeader,
                    leaderId,
                },
                write: {
                    setResourcesValues: setResources,
                    setResourcesFilteredValues: setResourcesFiltered,
                    setResourceProjectStatusValues: setResourceProjectStatus,
                    setSelectedResourceValue: setSelectedResource,
                    setSelectedLeader,
                    controlUpdate,
                    setValueUpdate,
                    registerUpdateResource,
                    handleSubmitUpdateResource,
                    formStateUpdate,
                    resetUpdateResourceModal,
                    clearUpdateErrors
                }
            }}
        >
            {children}
        </ResourcesContext.Provider>
    )
}