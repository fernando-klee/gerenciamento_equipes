import { ChangeEvent } from "react";
import { ResourceProps } from "../../interfaces";
import { verifyResourceProjectsStatus } from "../services/verifyResourceProjectsStatus";

export function handleSetValueOnVerifyResourceProjectsStatus(
    event: ChangeEvent<HTMLInputElement>, {
    selectedResource,
    setResourceProjectStatusValues,
}: {
    selectedResource: ResourceProps,
    setResourceProjectStatusValues: any,
}
  ) {
    verifyResourceProjectsStatus(event, {
      selectedResource: selectedResource,
      setResourceProjectStatusValues: setResourceProjectStatusValues,
    });
  }