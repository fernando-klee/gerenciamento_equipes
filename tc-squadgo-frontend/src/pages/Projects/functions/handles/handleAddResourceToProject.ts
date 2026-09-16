import { ResourceProps } from "../../interfaces";

export function handleAddResourceToProject(
  newResource: any,
  newProjectResources: ResourceProps[],
  setNewProjectResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>
) {
  const addNewResource: ResourceProps = newResource[0];
  
  if (newProjectResources.length === 0) {
    setNewProjectResources(newResource);
  } else {
    const oldResources = [...newProjectResources];
    const resourceExistsIndex = oldResources.findIndex(
      (or) => or.id === addNewResource.id
    );

    if (resourceExistsIndex !== -1) {
      oldResources.splice(resourceExistsIndex, 1);
    } else {
      oldResources.push(addNewResource);
    }
    setNewProjectResources(oldResources);
  }
}