 import { ProjectProps } from "../../interfaces";

 export function handleFilterProjectByType(
    customer_id: number,
    projects: ProjectProps[],
    setProjectsFiltered: React.Dispatch<React.SetStateAction<ProjectProps[]>>
 ) {
    const typeProject = Number(customer_id);

    if (typeProject === 50) {
      setTimeout(() => {
        let newProjectsFiltered = projects.filter(
          (r: ProjectProps) => r.customer?.id === typeProject
        );

        setProjectsFiltered(newProjectsFiltered);
      }, 300);
    } else if (typeProject === 1) {
      setTimeout(() => {
        let newProjectsFiltered = projects.filter(
          (r: ProjectProps) => r.customer?.id !== 50
        );

        setProjectsFiltered(newProjectsFiltered);
      }, 300);
    } else {
      setProjectsFiltered(projects);
    }
  }