import { api } from "../../../../services/api";

export async function handleRemoveResourceFromProject (
  resource_id: number,
  project_id: number
) {
  await api.delete(`/projects/${project_id}/resources/${resource_id}`);
};