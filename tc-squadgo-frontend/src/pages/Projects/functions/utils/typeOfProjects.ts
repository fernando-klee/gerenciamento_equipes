import { ProjectProps } from "../../interfaces";

export function typeOfProjects(
  projectsFiltered: ProjectProps[],
  pStatus: string
): ProjectProps[] {
  return projectsFiltered
    .filter((p) => p.status === pStatus)
    .sort((a, b) => 
      a.customer.name.localeCompare(b.customer.name) || 
      a.name.localeCompare(b.name)
    );
}