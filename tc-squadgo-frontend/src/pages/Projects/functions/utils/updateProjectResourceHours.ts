export function updateProjectResourceHours(
    resource_id: number,
    project_hours: number,
    newProjectResources: any[],
    setNewProjectResources: React.Dispatch<React.SetStateAction<any[]>>
  ) {
    const oldResources = [...newProjectResources];
    const resourceIndex = newProjectResources.findIndex(
      (r) => r.id === resource_id
    );
    const resource = { ...oldResources[resourceIndex] };
    resource.project_hours = project_hours;
    oldResources[resourceIndex] = resource;
    setNewProjectResources(oldResources);
  }