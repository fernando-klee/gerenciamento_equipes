import { ResourceProps } from "../../interfaces";

export const getResourceTypes = (
    {selectedResource}: {selectedResource: ResourceProps | undefined}
) => {
    return selectedResource?.__types__.map((t: any) => t.id + "");
  };