  import { ProjectProps } from "../../interfaces";

  export function handleUpdateProjectResourceHoursFromProjectSelected(
    resource_id: number,
    project_hours: number,
    projectState: ProjectProps | undefined,
    setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>> ) {
    if (projectState) {
      const oldProjectSelected = { ...projectState };
      const oldResourcesProjectSelected = [
        ...oldProjectSelected.resources.projectResource,
      ];
      const resourceIndex = oldResourcesProjectSelected.findIndex(
        (r) => r.id === resource_id
      );

      const resource = { ...oldResourcesProjectSelected[resourceIndex] };
      resource.hours_left =
        resource.hours_left - (project_hours - resource.project_hours);
      resource.project_hours = project_hours;
      oldResourcesProjectSelected[resourceIndex] = resource;
      oldProjectSelected.resources.projectResource =
        oldResourcesProjectSelected;
      setProjectState(oldProjectSelected);
    }
  } 
