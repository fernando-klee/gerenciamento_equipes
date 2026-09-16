import { useState, useEffect, useMemo} from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProjectSchema, deleteUserFromProjectSchema } from "../schemas/ProjectsSchemas";
import { useLocation } from "react-router-dom";
import { handleCreateNewProject } from "../functions/handles/handleCreateNewProject";
import { handleUpdateProject } from "../functions/handles/handleUpdateProject";
import { handleRemoveResourceFromProject } from "../functions/handles/handleRemoveResourceFromProject";
import { handleAddResourceToProject } from "../functions/handles/handleAddResourceToProject";
import { handleAddOrRemoveResourceToSelectedProject, handleAddOrRemoveResourceToProjects } from "../functions/handles/handleAddOrRemoveResourceToSelectedProject" 
import { removeResourceFromProject } from "../functions/utils/removeResourceFromProject";
import { handleRemoveResourceFromProjects } from "../functions/handles/handleRemoveResourceFromProjects";
import { handleRemoveResourceFromSelectedProject } from "../functions/handles/handleRemoveResourceFromSelectedProject";
import { handleCloseNewModal } from "../functions/handles/handleCloseNew";
import { handleSelectOutputEstimateDate } from "../functions/handles/handleSelectOutputEstimateDate";
import { handleOpenModalDelete } from "../functions/handles/handleOpenModalDelete";
import { setProjectNow } from "../functions/utils/setProjectNow";
import { selectProject } from "../functions/utils/selectProject";
import { viewSelectedProject } from "../functions/utils/viewSelectedProject";
import { handleUpdateProjectSelectedResourceHours, handleUpdateResourceHours } from "../functions/handles/handleupdateProjectSelectedResourceHours";
import { updateProjectResourceHours } from "../functions/utils/updateProjectResourceHours";
import { handleUpdateProjectResourceHoursFromProjectSelected } from "../functions/handles/handleUpdateProjectResourceHoursFromProjectSelected";
import { typeOfProjects } from "../functions/utils/typeOfProjects";
import { handleLoadMoreHistoric } from "../functions/handles/handleLoadMoreHistoric"; 
import { handleShowHistoric } from "../functions/handles/handleShowHistoric"; 
import { handleOnCloseProjectHistoricModal } from "../functions/handles/handleOnCloseProjectHistoricModal";
import { handleFilterProjectsByName } from "../functions/handles/handleFilterProjectsByName";
import { handleCloseProjectView } from "../functions/handles/handleCloseProjectView";
import { handleFilterProjectByType } from "../functions/handles/handleFilterByType";
import { handleOpenNewProjectModal } from "../functions/handles/handleOpenNewProjectModel";
import { handleLoadProjects } from "../functions/handles/handleLoadProjects";
import { handleLoadHistoricFilter } from "../functions/handles/handleLoadHistoricFilter";
import { handleLoadHistoric } from "../functions/handles/handleLoadHistoric";
import { handleLoadResources } from "../functions/handles/handleLoadResources";
import { handleLoadResponsibles } from "../functions/handles/handleLoadResponsibles";
import { handleLoadCustomers } from "../functions/handles/handleLoadCustomers";
import { projectStatusDescription } from "../functions/utils/projectStatusDescription";
import { handleSwitchToggle } from "../functions/handles/handleSwitchToggle";
import { handleStatusChange } from "../functions/handles/handleStatusChange";
import { CustomerProps, HistoricProps, ProjectProps, ResourceProps } from "../interfaces";
 


export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [projectsFiltered, setProjectsFiltered] = useState<ProjectProps[]>([]);
  const [newProjectResources, setNewProjectResources] = useState<ResourceProps[]>([]);
  const [isLoadingCreating, setIsLoadingCreating] = useState(false);
  const [switchEstimate, setSwitchEstimate] = useState(false);
  const [idUserToDelete, setIdUserToDelete] = useState<null | number>(null);
  const [showDateDeleteUserFromProject, setShowDateDeleteUserFromProject] = useState(false);
  const [projectState, setProjectState] = useState<ProjectProps>();
  const [isLoadingProjectResources, setIsLoadingProjectResources] = useState(false);
  const [isLoadingUpdateResourceHours, setIsLoadingUpdateResourceHours] = useState(-1);
  const [loadingHistoric, setLoadingHistoric] = useState(false);
  const [loadingMoreHistoric, setLoadingMoreHistoric] = useState(false);
  const [projectHistoricSelected, setProjectHistoricSelected] = useState({project_id: -1, name: "", });
  const [historic, setHistoric] = useState<HistoricProps[]>([]);
  const [historicFilter, setHistoricFilter] = useState({current_page: 1, last_page: 1, });

  const [isLoadingUpdating, setIsLoadingUpdating] = useState(false);
  const [projectStatus, setProjectStatus] = useState("");

  const [showFinishedProjects, setShowFinishedProjects] = useState(false);


  const [resources, setResources] = useState<ResourceProps[]>([]);
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const [allCustomers, setAllCustomers] = useState<CustomerProps[]>([]);
  const [isLoadingResources, setIsLoadingResources] = useState(true);
  const [isLoadingResponsibles, setIsLoadingResponsibles] = useState(true);
  const [responsibles, setResponsibles] = useState<ResourceProps[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const toast = useToast();

  const { search } = useLocation();
  const {
      isOpen: isOpenView,
      onOpen: onOpenView,
      onClose: onCloseView,
    } = useDisclosure();
    const {
      isOpen: isOpenNew,
      onOpen: onOpenNew,
      onClose: onCloseNew,
    } = useDisclosure();
  
    const {
      isOpen: isOpenUpdate,
      onOpen: onOpenUpdate,
      onClose: onCloseUpdate,
    } = useDisclosure();
    const {
      isOpen: isOpenDelete,
      onOpen: onOpenDelete,
      onClose: onCloseDelete,
    } = useDisclosure();
  
    const {
      isOpen: isOpenHistoric,
      onOpen: onOpenHistoric,
      onClose: onCloseHistoric,
    } = useDisclosure();

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
    
      const watchStatus = watch("status");
      const watchType = useWatch({ control, name: "type" });
    
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
        control: controlDelete,
        register: registerDeleteProject,
        handleSubmit: handleSubmitDeleteProject,
        formState: formStateDelete,
        formState: { isSubmitting: isSubmittingDelete },
        reset: resetDeleteProjectModal,
        clearErrors: clearDeleteErrors,
      } = useForm({ resolver: yupResolver(deleteUserFromProjectSchema) });
    
      const watchStatusUpdate = watchUpdate("status");
      const watchTypeUpdate = useWatch({ control: controlUpdate, name: "type" });

  useEffect(() => {
     handleLoadProjects(
      setProjects,
      setProjectsFiltered,
      setLoadingProjects,
      search,
      setProjectState,
      resetUpdateProjectModal,
      clearUpdateErrors,
      setValueUpdate,
      onOpenView,
      setIsLoadingProjectResources,
      toast
     ),

     handleLoadResources(
      setResources,
      setIsLoadingResources
     ),

     handleLoadResponsibles(
      setResponsibles,
      setIsLoadingResponsibles
     ),

     handleLoadCustomers(
      setAllCustomers,
      setCustomers
     )

  }, [])


  useEffect(() => {
     handleLoadHistoricFilter(
      projectHistoricSelected,
      setHistoricFilter
     )
  }, [projectHistoricSelected.project_id])
  
  useEffect(() => {
     handleLoadHistoric(
      projectHistoricSelected,
      historicFilter,
      setHistoric,
      setLoadingHistoric,
      setLoadingMoreHistoric
     )
  }, [historicFilter, projectHistoricSelected.project_id])

    useMemo(() => {
      if (getValues("type") !== "PF") {
        setValue("end_estimate", null);
      }
  
      //eslint-disable-next-line
    }, [watchType]);
  
    useMemo(() => {
      if (getValuesUpdate("type") !== "PF") {
        setValueUpdate("end_estimate", null);
      }
  
      //eslint-disable-next-line
    }, [watchTypeUpdate]);


  const handles = {
    handleCreateNewProject:(
      values: any,
      newProjectResources: ResourceProps[],
      toast: any,
      closeModal: () => void
  ) => handleCreateNewProject(
      values,
      switchEstimate,  
      newProjectResources,
      setProjects,
      setProjectsFiltered,
      setIsLoadingCreating,
      toast,
      closeModal
    ),

    handleUpdateProject: (
    values: any,
    projectState: ProjectProps | undefined,
    setProjectHistoricSelected: React.Dispatch<React.SetStateAction<{ project_id: number; name: string }>>,
    setIsLoadingUpdating: React.Dispatch<React.SetStateAction<boolean>>,
    toast: any,
    onCloseUpdate: () => void
  ) => handleUpdateProject(
      values,
      projectState,
      setProjects,
      setProjectsFiltered,
      setProjectHistoricSelected,
      setIsLoadingUpdating,
      toast,
      onCloseUpdate
    ),

    handleRemoveResourceFromProject: (
      resource_id: number,
      project_id: number
    ) => handleRemoveResourceFromProject(resource_id, project_id),

    handleAddResourceToProject: (
      newResource: any,
      newProjectResources: ResourceProps[],
      setNewProjectResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>
    ) => handleAddResourceToProject(
      newResource,
      newProjectResources,
      setNewProjectResources
    ),
    
    handleAddOrRemoveResourceToSelectedProject: (
      newResource: any,
      projectState: ProjectProps | undefined,
      projects: ProjectProps[],
      setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
      setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
      handleRemoveResourceFromProject: (resourceId: number, projectId: number) => void,
      handleUpdateResourceHours: (resourceId: number, projectId: number, hours: number) => void
    ) => handleAddOrRemoveResourceToSelectedProject(
      newResource,
      projectState,
      projects,
      setProjects,
      setProjectState, 
      handleRemoveResourceFromProject,
      handleUpdateResourceHours
    ),

    handleAddOrRemoveResourceToProjects: (
        newResource: any,
        projectState: ProjectProps | undefined,
        projects: ProjectProps[],
        setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
        handleRemoveResourceFromProject: (resourceId: number, projectId: number) => void,
        handleUpdateResourceHours: (resourceId: number, projectId: number, hours: number) => void
    ) => handleAddOrRemoveResourceToProjects(
      newResource,
      projectState,
      projects,
      setProjects, 
      handleRemoveResourceFromProject,
      handleUpdateResourceHours
    ),

    handleRemoveResourceFromProjects: (
      resource_id: number, 
      projectState: ProjectProps | undefined,
      projects: ProjectProps[],
      setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
      toast: any
    ) => handleRemoveResourceFromProjects(
      resource_id, 
      projectState,
      projects,
      setProjects,
      toast
    ),

    handleRemoveResourceFromSelectedProject: (
      resource_id: number,
      projectState: ProjectProps | undefined,
      projects: ProjectProps[],
      setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
      setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
      toast: any,
      onCloseDelete: () => void
    ) => handleRemoveResourceFromSelectedProject(
      resource_id,
      projectState,
      projects,
      setProjects,
      setProjectState,
      toast,
      onCloseDelete
    ),

    handleCloseNewModal: (
    setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
    resetNewProjectModal: () => void,
    clearNewErrors: () => void,
    setNewProjectResources: (resources: any[]) => void,
    onCloseNew: () => void
  ) => handleCloseNewModal(
    setProjectState,
    resetNewProjectModal,
    clearNewErrors,
    setNewProjectResources,
    onCloseNew
  ),

  handleSelectOutputEstimateDate: (
    values: any,
    idUserToDelete: number | null,
    setShowDateDeleteUserFromProject: React.Dispatch<React.SetStateAction<boolean>>,
    onCloseDelete: () => void,
    toast: any
  ) => handleSelectOutputEstimateDate(
    values,
    idUserToDelete,
    setShowDateDeleteUserFromProject,
    onCloseDelete,
    toast
  ),

  handleOpenModalDelete: (
    resource_id: number,
    setIdUserToDelete: React.Dispatch<React.SetStateAction<number | null>>, 
    onOpenDelete: () => void
  ) => handleOpenModalDelete(
    resource_id,
    setIdUserToDelete,
    onOpenDelete
  ),

  handleUpdateProjectSelectedResourceHours: (
    resource_id: number,
    projectState: ProjectProps | undefined,
    projects: ProjectProps[],
    setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
    setIsLoadingUpdateResourceHours: React.Dispatch<React.SetStateAction<number>>,
    toast: any
  ) => handleUpdateProjectSelectedResourceHours(
    resource_id,
    projectState,
    projects,
    setProjects,
    setIsLoadingUpdateResourceHours,
    toast
  ),

  handleUpdateResourceHours: (
    resource_id: number,
    project_id: number,
    project_hours: number
  ) => handleUpdateResourceHours(
    resource_id,
    project_id,
    project_hours
  ),

  handleUpdateProjectResourceHoursFromProjectSelected: (
    resource_id: number,
    project_hours: number,
    projectState: ProjectProps | undefined,
    setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>
  ) => handleUpdateProjectResourceHoursFromProjectSelected(
    resource_id,
    project_hours,
    projectState,
    setProjectState
  ),

  handleLoadMoreHistoric: (
    setLoadingMoreHistoric: React.Dispatch<React.SetStateAction<boolean>>,
    setHistoricFilter: React.Dispatch<React.SetStateAction<{
    current_page: number;
    last_page: number;
  }>>
  ) => handleLoadMoreHistoric(
    setLoadingMoreHistoric,
    setHistoricFilter
  ),

  handleShowHistoric: (
    id: number,
    name: string,
    setLoadingHistoric: React.Dispatch<React.SetStateAction<boolean>>,
    setProjectHistoricSelected: React.Dispatch<React.SetStateAction<{
    project_id: number;
    name: string;
  }>>,
    onOpenHistoric: () => void
  ) => handleShowHistoric(
    id,
    name,
    setLoadingHistoric,
    setProjectHistoricSelected,
    onOpenHistoric
  ),

  handleOnCloseProjectHistoricModal: (
    setProjectHistoricSelected: React.Dispatch<React.SetStateAction<{
    project_id: number;
    name: string;
  }>>,
    setHistoric: React.Dispatch<React.SetStateAction<any[]>>,
    onCloseHistoric: () => void
  ) => handleOnCloseProjectHistoricModal(
    setProjectHistoricSelected,
    setHistoric,
    onCloseHistoric
  ),

  handleFilterProjectsByName: (
    name: string,
    projects: ProjectProps[],
    setProjectsFiltered: React.Dispatch<React.SetStateAction<ProjectProps[]>> 
  ) => handleFilterProjectsByName(
    name, 
    projects,
    setProjectsFiltered
  ),

  handleCloseProjectView: (
    history: any,
    onCloseView: () => void
  ) => handleCloseProjectView(
     history,
     onCloseView
  ),

  handleFilterProjectByType: (
    customer_id: number,
    projects: ProjectProps[],
    setProjectsFiltered: React.Dispatch<React.SetStateAction<ProjectProps[]>>
  ) => handleFilterProjectByType(
    customer_id,
    projects,
    setProjectsFiltered           
  ),

  handleOpenNewProjectModal: (
     handleCloseNewModal: (
    setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
    resetNewProjectModal: () => void,
    clearNewErrors: () => void,
    setNewProjectResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
    onCloseNew: () => void
  ) => void,
    setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
    resetNewProjectModal: () => void,
    clearNewErrors: () => void,
    setNewProjectResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
    onCloseNew: () => void,
    onOpenNew: () => void
  ) => handleOpenNewProjectModal(
    handleCloseNewModal,
    setProjectState,
    resetNewProjectModal,
    clearNewErrors,
    setNewProjectResources,
    onCloseNew,
    onOpenNew
  ),

  handleLoadProjects: (
    setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
    setProjectsFiltered: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
    setLoadingProjects: React.Dispatch<React.SetStateAction<boolean>>,
    search: string,
    setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
    resetUpdateProjectModal: () => void,
    clearUpdateErrors: () => void,
    setValueUpdate: (name: string, value: any) => void,
    onOpenView: () => void,
    setIsLoadingProjectResources: React.Dispatch<React.SetStateAction<boolean>>,
    toast: any
  ) => handleLoadProjects(
    setProjects,
    setProjectsFiltered,
    setLoadingProjects,
    search,
    setProjectState,
    resetUpdateProjectModal,
    clearUpdateErrors,
    setValueUpdate,
    onOpenView,
    setIsLoadingProjectResources,
    toast
  ), 

  handleLoadResources:(
    setResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
    setIsLoadingResources: React.Dispatch<React.SetStateAction<boolean>>
  ) => handleLoadResources(
    setResources,
    setIsLoadingResources
  ),

  handleLoadResponsibles:(
    setResponsibles: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
    setIsLoadingResponsibles: React.Dispatch<React.SetStateAction<boolean>>
  ) => handleLoadResponsibles(
    setResponsibles,
    setIsLoadingResponsibles
  ),

  handleLoadCustomers:(
    setAllCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>
  ) => handleLoadCustomers(
    setAllCustomers,
    setCustomers
  ),

  handleLoadHistoricFilter: (
    projectHistoricSelected: { project_id: number; name: string },
    setHistoricFilter: React.Dispatch<React.SetStateAction<{
      current_page: number;
      last_page: number;
    }>>
  ) => handleLoadHistoricFilter(
    projectHistoricSelected,
    setHistoricFilter
  ),

  handleLoadHistoric: (
    projectHistoricSelected: { project_id: number; name: string },
    historicFilter: { current_page: number; last_page: number },
    setHistoric: React.Dispatch<React.SetStateAction<HistoricProps[]>>,
    setLoadingHistoric: React.Dispatch<React.SetStateAction<boolean>>,
    setLoadingMoreHistoric: React.Dispatch<React.SetStateAction<boolean>>
  ) => handleLoadHistoric(
    projectHistoricSelected,
    historicFilter,
    setHistoric,
    setLoadingHistoric,
    setLoadingMoreHistoric
  ),

  handleSwitchToggle:(
    setSwitchEstimate: React.Dispatch<React.SetStateAction<boolean>>,
    switchEstimate: boolean
  ) => handleSwitchToggle(
    setSwitchEstimate, 
    switchEstimate
  ),

  handleStatusChange:(
    event: any,
    setProjectStatus: React.Dispatch<React.SetStateAction<string>>
  ) => handleStatusChange(
    event, 
    setProjectStatus
  )
    
  }

  const utils = {
    setProjectNow: (
      project: ProjectProps,
      setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
      resetUpdateProjectModal: () => void,
      clearUpdateErrors: () => void,
      setValueUpdate: (name: string, value: any) => void,
      setIsLoadingProjectResources: React.Dispatch<React.SetStateAction<boolean>>
    ) => setProjectNow(
      project,
      setProjectState,
      resetUpdateProjectModal,
      clearUpdateErrors,
      setValueUpdate,
      setIsLoadingProjectResources
    ),

    selectProject: (
      project_id: number,
      projects: ProjectProps[],
      setProjectNow: Function, 
      setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
      resetUpdateProjectModal: any,
      clearUpdateErrors: any,
      setValueUpdate: any,
      setIsLoadingProjectResources: React.Dispatch<React.SetStateAction<boolean>>,
      onOpenUpdate: () => void
    ) => selectProject(
      project_id,
      projects,
      setProjectNow,
      setProjectState,
      resetUpdateProjectModal,
      clearUpdateErrors,
      setValueUpdate,
      setIsLoadingProjectResources,
      onOpenUpdate
    ),

    viewSelectedProject: (
      project_id: number,
      projects: ProjectProps[],
      setProjectNow: Function,
      setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
      resetUpdateProjectModal: () => void,
      clearUpdateErrors: () => void,
      setValueUpdate: (name: string, value: any) => void,
      setIsLoadingProjectResources: React.Dispatch<React.SetStateAction<boolean>>,
      onOpenView: () => void
    ) => viewSelectedProject(
        project_id,
        projects,
        setProjectNow,
        setProjectState,
        resetUpdateProjectModal,
        clearUpdateErrors,
        setValueUpdate,
        setIsLoadingProjectResources,
        onOpenView
    ),

    removeResourceFromProject: (
      resource_id: number,
      newProjectResources: ResourceProps[],
      setNewProjectResources: (resources: ResourceProps[]) => void
    ) => removeResourceFromProject(
      resource_id,
      newProjectResources,
      setNewProjectResources
    ),

    updateProjectResourceHours: (
      resource_id: number,
      project_hours: number,
      newProjectResources: any[],
      setNewProjectResources: React.Dispatch<React.SetStateAction<any[]>>
    ) => updateProjectResourceHours(
      resource_id,
      project_hours,
      newProjectResources,
      setNewProjectResources
    ),

    typeOfProjects:(
      projectsFiltered: ProjectProps[],
      pStatus: string
    ) => typeOfProjects(
      projectsFiltered,
      pStatus
    ),

    projectStatusDescription:(status: string) => projectStatusDescription(status)


  }



  return {
    projects,
    setProjects,
    projectsFiltered,
    setProjectsFiltered,
    newProjectResources,
    setNewProjectResources,
    setShowDateDeleteUserFromProject,
    idUserToDelete, 
    setIdUserToDelete,
    isLoadingCreating,
    switchEstimate, 
    setSwitchEstimate, 
    projectState, 
    setProjectState,
    isLoadingProjectResources, 
    setIsLoadingProjectResources,
    isLoadingUpdateResourceHours, 
    setIsLoadingUpdateResourceHours,
    historic, setHistoric,
    loadingHistoric, setLoadingHistoric,
    loadingMoreHistoric, setLoadingMoreHistoric,
    projectHistoricSelected,
    setProjectHistoricSelected,
    historicFilter,
    setHistoricFilter,
    resources,
    setResources,
    customers,
    setCustomers,
    allCustomers,
    setAllCustomers,
    isLoadingResources,
    setIsLoadingResources,
    isLoadingResponsibles,
    setIsLoadingResponsibles,
    responsibles,
    setResponsibles,
    loadingProjects,
    setLoadingProjects,
    isLoadingUpdating,
    setIsLoadingUpdating,
    projectStatus, 
    setProjectStatus,
    showFinishedProjects, 
    setShowFinishedProjects,

    
    isOpenView, onOpenView, onCloseView,
    isOpenNew, onOpenNew, onCloseNew,
    isOpenUpdate, onOpenUpdate, onCloseUpdate,
    isOpenDelete, onOpenDelete, onCloseDelete,
    isOpenHistoric, onOpenHistoric, onCloseHistoric,

    
    control, watch, getValues, setValue,
    registerNewProject, handleSubmitNewProject, formState,
    resetNewProjectModal, clearNewErrors,
    watchStatus, watchType,

   
    controlUpdate, watchUpdate, getValuesUpdate, setValueUpdate,
    registerUpdateProject, handleSubmitUpdateProject, formStateUpdate,
    resetUpdateProjectModal, clearUpdateErrors,
    watchStatusUpdate, watchTypeUpdate,

    
    controlDelete, registerDeleteProject, handleSubmitDeleteProject,
    formStateDelete, isSubmittingDelete,
    resetDeleteProjectModal, clearDeleteErrors,

    
    toast,
    search,

    
    handles,
    utils,
  };

};

    
  