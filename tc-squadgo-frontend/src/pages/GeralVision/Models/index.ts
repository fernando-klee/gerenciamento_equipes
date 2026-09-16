import { useEffect, useState } from "react";
import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";
import { AllValuesProps, CustomerProps, PlannedReleaseProps, ResourceProjectsProps } from "../interfaces";
import { loadValues } from "../functions/services/loadValues";
import { loadCustomers } from "../functions/services/loadCustomers";
import { checkPermission } from "../functions/services/checkPermission";
import { fetchPlannedRelease } from "../functions/services/fetchPlannedRelease";
import { handleOnSearchByText } from "../functions/handles/handleOnSearchByText";
import { handleSelectResource } from "../functions/handles/handleSelectResource";
import { handleOnChangePlannedReleaseDate } from "../functions/handles/handleOnnChangePlannedReleaseDate";
import { handleHideCustomersWithNoResources } from "../functions/handles/handleHideCustomersWithNoResources";
import { resourceName } from "../functions/utils/resourceName";


export const useGeralVision = () => {
    const toast = useToast();
    const { user } = useAuth();
    const [loadingAllValues, setLoadingAllValues] = useState(true);
    const [allValues, setAllValues] = useState<AllValuesProps>();
    const [loadingCustomers, setLoadingCustomers] = useState(true);
    const [customers, setCustomers] = useState<CustomerProps[]>([]);
    const [customersFiltered, setCustomersFiltered] = useState<CustomerProps[]>(
    []
    );
    const [plannedReleaseLoading, setPlannedReleaseLoading] = useState(false);
    const [plannedReleaseCalendarDisplay, setPlannedReleaseCalendarDisplay] =
    useState(false);
    const [plannedReleaseDate, setPlannedReleaseDate] = useState(new Date());
    const [plannedRelease, setPlannedRelease] = useState<PlannedReleaseProps[]>(
    []
    );
    const [loadingResourceProjects, setLoadingResourceProjects] = useState(false);
    const [selectedResource, setSelectedResource] = useState(-1);
    const [selectedResourceProject, setSelectedResourceProject] =
    useState<ResourceProjectsProps>();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const hasPermission = checkPermission(user.permissions, "view_geral_vision");
        if (hasPermission) {
            loadValues(setAllValues, setLoadingAllValues);
        }

        loadCustomers(
            setCustomers,
            setCustomersFiltered,
            setLoadingCustomers,
            toast
        );
    }, [toast, user.permissions])

    useEffect(() => {
        fetchPlannedRelease(
            setPlannedReleaseLoading,
            plannedReleaseDate,
            setPlannedRelease)
    }, [plannedReleaseDate])

    const services = {
        loadValues: (
            setAllValues: React.Dispatch<React.SetStateAction<AllValuesProps | undefined>>,
            setLoadingAllValues: React.Dispatch<React.SetStateAction<boolean>>
        ) => loadValues(
            setAllValues,
            setLoadingAllValues
        ), 

        loadCustomers: (
            setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
            setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
            setLoadingCustomers: React.Dispatch<React.SetStateAction<boolean>>, 
            toast: (options: UseToastOptions) => void 
        ) => loadCustomers(
            setCustomers,
            setCustomersFiltered,
            setLoadingCustomers,
            toast
        ), 

        checkPermission: (
            userPermissions: string[],
            requiredPermission: string
        ) => checkPermission(
            userPermissions,
            requiredPermission
        ), 

        fetchPlannedRelease: (
            setPlannedReleaseLoading: React.Dispatch<React.SetStateAction<boolean>>,
            plannedReleaseDate: Date,
            setPlannedRelease: React.Dispatch<React.SetStateAction<PlannedReleaseProps[]>>
        ) => fetchPlannedRelease(
            setPlannedReleaseLoading,
            plannedReleaseDate,
            setPlannedRelease
        )

    }

    const handles = {
        handleOnSearchByText: (
            e: React.ChangeEvent<HTMLInputElement>,
            setSearchText: React.Dispatch<React.SetStateAction<string>>,
            customers: CustomerProps[],
            setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>
        ) => handleOnSearchByText(
            e, 
            setSearchText, 
            customers, 
            setCustomersFiltered
        ),

        handleSelectResource: (
            resource_id: number,
            selectedResource: number,
            setLoadingResourceProjects: React.Dispatch<React.SetStateAction<boolean>>,
            setSelectedResource: React.Dispatch<React.SetStateAction<number>>,
            setSelectedResourceProject: React.Dispatch<React.SetStateAction<ResourceProjectsProps | undefined>>
        ) => handleSelectResource(
            resource_id, 
            selectedResource, 
            setLoadingResourceProjects,
            setSelectedResource, 
            setSelectedResourceProject
        ),

         handleOnChangePlannedReleaseDate: (
            e: Date,
            setPlannedReleaseDate: React.Dispatch<React.SetStateAction<Date>>
         ) =>  handleOnChangePlannedReleaseDate(
            e, 
            setPlannedReleaseDate
         ), 

         handleHideCustomersWithNoResources: (
            isChecked: boolean,
            customers: CustomerProps[],
            setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>
         ) => handleHideCustomersWithNoResources(
            isChecked,
            customers,
            setCustomersFiltered
         )
    }

    const utils = {
        resourceName: (name: string) => resourceName(name)
    }

    return {
        states: {
            loadingAllValues, 
            setLoadingAllValues,
            allValues, 
            setAllValues,
            loadingCustomers, 
            setLoadingCustomers,
            customers, 
            setCustomers,
            customersFiltered, 
            setCustomersFiltered,
            plannedReleaseLoading, 
            setPlannedReleaseLoading,
            plannedReleaseCalendarDisplay, 
            setPlannedReleaseCalendarDisplay,
            plannedReleaseDate, 
            setPlannedReleaseDate,
            plannedRelease, 
            setPlannedRelease,
            loadingResourceProjects, 
            setLoadingResourceProjects,
            selectedResource, 
            setSelectedResource, 
            selectedResourceProject, 
            setSelectedResourceProject, 
            searchText, 
            setSearchText
        },

        services,
        handles,
        utils,
        toast, 
        user
    }
}