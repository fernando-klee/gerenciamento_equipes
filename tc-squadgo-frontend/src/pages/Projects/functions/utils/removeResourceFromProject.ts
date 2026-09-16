import { ResourceProps } from "../../interfaces";

export function removeResourceFromProject (
  resource_id: number,
  newProjectResources: ResourceProps[],
  setNewProjectResources: (resources: ResourceProps[]) => void
) {
  const oldResources = [...newProjectResources];
  const resourceExistsIndex = oldResources.findIndex(
    (or) => or.id === resource_id
  );
  
  if (resourceExistsIndex !== -1) {
    oldResources.splice(resourceExistsIndex, 1);
    setNewProjectResources(oldResources);
  }
};