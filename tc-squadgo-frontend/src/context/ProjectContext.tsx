import { useDisclosure } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { CustomerProps, HistoricProps, ProjectProps, ResourceProps } from "../pages/Projects/interfaces";
import { api } from "../services/api";
import { format, parseISO } from "date-fns";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProjectSchema, deleteUserFromProjectSchema } from "../pages/Projects/schemas/ProjectsSchemas";

interface ProjectsContextType {
    read: {
        showFinishedProjects: boolean,
        showDateDeleteUserFromProject: boolean,
        loadingProjects: boolean,
        isLoadingCreating: boolean,
        projectsFiltered: ProjectProps[],
        projects: ProjectProps[],
        newProjectResources: ResourceProps[],
        isLoadingUpdating: boolean,
        projectState: ProjectProps | undefined,
        isLoadingProjectResources: boolean,
        isLoadingUpdateResourceHours: number,
        idUserToDelete: number | null,
        isLoadingResources: boolean,
        resources: ResourceProps[],
        customers: CustomerProps[],
        allCustomers: CustomerProps[],
        switchEstimate: boolean,
        projectStatus: string,
        isLoadingResponsibles: boolean,
        responsibles: ResourceProps[],
        loadingHistoric: boolean,
        loadingMoreHistoric: boolean,
        projectHistoricSelected: {
            project_id: number;
            name: string;
        },
        historic: HistoricProps[],
        historicFilter: {
            current_page: number;
            last_page: number;
        }
    },

    write: {
        setShowFinishedProjects: React.Dispatch<React.SetStateAction<boolean>>,
        setShowDateDeleteUserFromProject: React.Dispatch<React.SetStateAction<boolean>>,
        setLoadingProjects: React.Dispatch<React.SetStateAction<boolean>>,
        setIsLoadingCreating: React.Dispatch<React.SetStateAction<boolean>>,
        setProjectsFiltered: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
        setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
        setNewProjectResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
        setIsLoadingUpdating: React.Dispatch<React.SetStateAction<boolean>>,
        setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
        setIsLoadingProjectResources: React.Dispatch<React.SetStateAction<boolean>>,
        setIsLoadingUpdateResourceHours: React.Dispatch<React.SetStateAction<number>>,
        setIdUserToDelete: React.Dispatch<React.SetStateAction<number | null>>,
        setIsLoadingResources: React.Dispatch<React.SetStateAction<boolean>>,
        setResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
        setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
        setAllCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
        setSwitchEstimate: React.Dispatch<React.SetStateAction<boolean>>,
        setProjectStatus: React.Dispatch<React.SetStateAction<string>>,
        setIsLoadingResponsibles: React.Dispatch<React.SetStateAction<boolean>>,
        setResponsibles: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
        setLoadingHistoric: React.Dispatch<React.SetStateAction<boolean>>,
        setLoadingMoreHistoric: React.Dispatch<React.SetStateAction<boolean>>,
        setProjectHistoricSelected: React.Dispatch<React.SetStateAction<{
            project_id: number;
            name: string;
        }>>,
        setHistoric: React.Dispatch<React.SetStateAction<HistoricProps[]>>,
        setHistoricFilter: React.Dispatch<React.SetStateAction<{
            current_page: number;
            last_page: number;
        }>>,
        // Forms functions
        setValueUpdate: (name: string, value: any) => void,
        registerUpdateProject: (...args: any[]) => any,
        handleSubmitUpdateProject: (...args: any[]) => any,
        resetUpdateProjectModal: (...args: any[]) => any,
        clearUpdateErrors: (...args: any[]) => any,
        controlUpdate: any,
        formStateUpdate: any,
        setValue: (name: string, value: any) => void,
        getValues: (name?: string) => any,
        watch: (name?: string) => any,
        registerNewProject: (...args: any[]) => any,
        handleSubmitNewProject: (...args: any[]) => any,
        resetNewProjectModal: (...args: any[]) => any,
        clearNewErrors: (...args: any[]) => any,
        formState: any,
        registerDeleteProject: (...args: any[]) => any,
        handleSubmitDeleteProject: (...args: any[]) => any,
        formStateDelete: any
    },

    modals: {
        view: {
            isOpen: boolean;
            onOpen: () => void;
            onClose: () => void;
        };
        new: {
            isOpen: boolean;
            onOpen: () => void;
            onClose: () => void;
        };
        update: {
            isOpen: boolean;
            onOpen: () => void;
            onClose: () => void;
        };
        delete: {
            isOpen: boolean;
            onOpen: () => void;
            onClose: () => void;
        };
        historic: {
            isOpen: boolean;
            onOpen: () => void;
            onClose: () => void;
        };
    },
}

interface ProjectsProvider {
    children: React.ReactNode
}

export const ProjectsContext = createContext({} as ProjectsContextType)

export function ProjectsProvider({children}: ProjectsProvider) {
    const { search } = useLocation();

    const [showFinishedProjects, setShowFinishedProjects] = useState(false);
    const [showDateDeleteUserFromProject, setShowDateDeleteUserFromProject] = useState(false);
    const [loadingProjects, setLoadingProjects] = useState(true);
    
    const [isLoadingCreating, setIsLoadingCreating] = useState(false);
    const [projectsFiltered, setProjectsFiltered] = useState<ProjectProps[]>([]);
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [newProjectResources, setNewProjectResources] = useState<ResourceProps[]>([]);

    const [isLoadingUpdating, setIsLoadingUpdating] = useState(false);
    const [projectState, setProjectState] = useState<ProjectProps>();
    const [isLoadingProjectResources, setIsLoadingProjectResources] = useState(false);
    const [isLoadingUpdateResourceHours, setIsLoadingUpdateResourceHours] = useState(-1);
    const [idUserToDelete, setIdUserToDelete] = useState<null | number>(null);

    const [isLoadingResources, setIsLoadingResources] = useState(true);
    const [resources, setResources] = useState<ResourceProps[]>([]);
    const [customers, setCustomers] = useState<CustomerProps[]>([]);
    const [allCustomers, setAllCustomers] = useState<CustomerProps[]>([]);

    const [switchEstimate, setSwitchEstimate] = useState(false);
    const [projectStatus, setProjectStatus] = useState("");

    const [isLoadingResponsibles, setIsLoadingResponsibles] = useState(true);
    const [responsibles, setResponsibles] = useState<ResourceProps[]>([]);

    const [loadingHistoric, setLoadingHistoric] = useState(false);
    const [loadingMoreHistoric, setLoadingMoreHistoric] = useState(false);
    const [projectHistoricSelected, setProjectHistoricSelected] = useState({
        project_id: -1,
        name: "",
    });
    const [historic, setHistoric] = useState<HistoricProps[]>([]);
    const [historicFilter, setHistoricFilter] = useState({
        current_page: 1,
        last_page: 1,
    });

    // Modals
    const viewModal = useDisclosure();
    const newModal = useDisclosure();
    const updateModal = useDisclosure();
    const deleteModal = useDisclosure();
    const historicModal = useDisclosure();

    // Forms
    const {
        control,
        watch,
        getValues,
        setValue,
        register: registerNewProject,
        handleSubmit: handleSubmitNewProject,
        formState,
        reset: resetNewProjectModal,
        clearErrors: clearNewErrors,
    } = useForm({ resolver: yupResolver(createProjectSchema(switchEstimate)) });

    const {
        control: controlUpdate,
        watch: watchUpdate,
        getValues: getValuesUpdate,
        setValue: setValueUpdate,
        register: registerUpdateProject,
        handleSubmit: handleSubmitUpdateProject,
        formState: formStateUpdate,
        reset: resetUpdateProjectModal,
        clearErrors: clearUpdateErrors,
    } = useForm({ resolver: yupResolver(createProjectSchema(false)) });

    const {
        register: registerDeleteProject,
        handleSubmit: handleSubmitDeleteProject,
        formState: formStateDelete,
        reset: resetDeleteProjectModal,
        clearErrors: clearDeleteErrors,
    } = useForm({ resolver: yupResolver(deleteUserFromProjectSchema) });

    useEffect(() => {
        async function loadProjects() {
            const response = await api.get(`/projects`);
            const projectsWithUuid = response.data.map((p: ProjectProps) => {
                const start_estimate = parseISO(p.start_estimate + "");
                let end_estimate = null;
                if (p.end_estimate) end_estimate = parseISO(p.end_estimate + "");
                return {
                    ...p,
                    uuid: v4(),
                    start_estimate,
                    end_estimate,
                    has_loaded_resources: false,
                };
            });
            setProjects(projectsWithUuid);
            setProjectsFiltered(projectsWithUuid);
            setLoadingProjects(false);
      
            const viewProject = queryString.parse(search);
            if (viewProject) {
                const project_id = Number(viewProject.visualizar);
                const currentProjects = [...projectsWithUuid];
                const currentProject = currentProjects.find((p) => p.id === project_id);
      
                if (currentProject) {
                    setProjectState(currentProject);
                    resetUpdateProjectModal();
                    clearUpdateErrors();

                    setValueUpdate("status", currentProject.status);
                    setValueUpdate("start_estimate", currentProject.start_estimate);
                    setValueUpdate("end_estimate", currentProject.end_estimate);
                    setValueUpdate("type", currentProject.type);
                    
                    // CORREÇÃO: usar viewModal.onOpen() em vez de onOpenView
                    viewModal.onOpen();
      
                    if (!currentProject.has_loaded_resources) {
                        setIsLoadingProjectResources(true);
                        const response = await api.get(
                            `/projects/${currentProject.id}/resources`
                        );
                        currentProject.resources = response.data;
                        currentProject.has_loaded_resources = true;
                        setProjectState(currentProject);
                        setIsLoadingProjectResources(false);
                    }
                }
            }
        }
      
        async function loadResources() {
            const response = await api.get("/resources/actives");
            const currentResources = response.data.map((cr: ResourceProps) => {
                return { ...cr, value: cr.id, label: cr.name, project_hours: 0 };
            });
            setResources(currentResources);
            setIsLoadingResources(false);
        }
      
        async function loadResponsibles() {
            const response = await api.get("/resources/responsibles");
            const currentResponsibles = response.data
                .filter((cr: ResourceProps) => cr.status !== "INATIVO")
                .map((cr: ResourceProps) => {
                    return {
                        ...cr,
                        value: cr.id,
                        label: cr.name,
                        project_hours: 0,
                        departure_forecast: cr.departure_forecast,
                    };
                });
            setResponsibles(currentResponsibles);
            setIsLoadingResponsibles(false);
        }
      
        async function loadCustomers() {
            await api.get("/customers?qtdPerPage=100").then((res) => {
                const { data } = res.data;
                const allCurrentCustomers: CustomerProps[] = data.map(
                    (cr: CustomerProps) => {
                        return { ...cr, value: cr.id, label: cr.name };
                    }
                );
                setAllCustomers(allCurrentCustomers);

                const currentActiveCustomers = allCurrentCustomers.filter(
                    (acc) => acc.status === "ATIVO"
                );
                setCustomers(currentActiveCustomers);
            });
        }
      
        loadProjects();
        loadResources();
        loadResponsibles();
        loadCustomers();
      
        // eslint-disable-next-line
    }, []);
      
    useEffect(() => {
        async function loadHistoricFilter() {
            if (projectHistoricSelected.project_id !== -1) {
                const response = await api.get(
                    `/projects/${projectHistoricSelected.project_id}/historic?currentPage=1`
                );
                const responseData = response.data;
                const { current_page, last_page } = responseData;
                setHistoricFilter({ current_page, last_page });
            }
        }
      
        loadHistoricFilter();
    }, [projectHistoricSelected.project_id]);
      
    useEffect(() => {
        async function loadHistoric() {
            const response = await api.get(
                `/projects/${projectHistoricSelected.project_id}/historic?currentPage=${historicFilter.current_page}`
            );
            const responseData = response.data;
            const newHistorics = responseData.data.map((h: HistoricProps) => {
                const parsedDate = parseISO(h.created_at.toString());
                return {
                    ...h,
                    uuid: v4(),
                    created_at: format(parsedDate, "dd/MM/yyyy HH:mm"),
                };
            });
            setHistoric((oldData) => {
                return [...oldData, ...newHistorics];
            });
            setLoadingHistoric(false);
            setLoadingMoreHistoric(false);
        }
      
        loadHistoric();
      
        // eslint-disable-next-line
    }, [historicFilter]);

    return (
        <ProjectsContext.Provider
            value={{
                read: {
                    showFinishedProjects,
                    showDateDeleteUserFromProject,
                    loadingProjects,
                    isLoadingCreating,
                    projectsFiltered,
                    projects,
                    newProjectResources,
                    isLoadingUpdating,
                    projectState,
                    isLoadingProjectResources,
                    isLoadingUpdateResourceHours,
                    idUserToDelete,
                    isLoadingResources,
                    resources,
                    customers,
                    allCustomers,
                    switchEstimate,
                    projectStatus,
                    isLoadingResponsibles,
                    responsibles,
                    loadingHistoric,
                    loadingMoreHistoric,
                    projectHistoricSelected,
                    historic,
                    historicFilter
                },
                write: {
                    setShowFinishedProjects,
                    setShowDateDeleteUserFromProject,
                    setLoadingProjects,
                    setIsLoadingCreating,
                    setProjectsFiltered,
                    setProjects,
                    setNewProjectResources,
                    setIsLoadingUpdating,
                    setProjectState,
                    setIsLoadingProjectResources,
                    setIsLoadingUpdateResourceHours,
                    setIdUserToDelete,
                    setIsLoadingResources,
                    setResources,
                    setCustomers,
                    setAllCustomers,
                    setSwitchEstimate,
                    setProjectStatus,
                    setIsLoadingResponsibles,
                    setResponsibles,
                    setLoadingHistoric,
                    setLoadingMoreHistoric,
                    setProjectHistoricSelected,
                    setHistoric,
                    setHistoricFilter,
                    setValueUpdate,
                    registerUpdateProject,
                    handleSubmitUpdateProject,
                    resetUpdateProjectModal,
                    clearUpdateErrors,
                    controlUpdate,
                    formStateUpdate,
                    setValue,
                    getValues,
                    watch,
                    registerNewProject,
                    handleSubmitNewProject,
                    resetNewProjectModal,
                    clearNewErrors,
                    formState,
                    registerDeleteProject,
                    handleSubmitDeleteProject,
                    formStateDelete
                },
                modals: {
                    view: viewModal,
                    new: newModal,
                    update: updateModal,
                    delete: deleteModal,
                    historic: historicModal,
                }
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
}