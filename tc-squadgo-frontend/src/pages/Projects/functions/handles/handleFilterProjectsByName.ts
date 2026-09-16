  import { ProjectProps } from "../../interfaces";
  
  export function handleFilterProjectsByName(
    name: string,
    projects: ProjectProps[],
    setProjectsFiltered: React.Dispatch<React.SetStateAction<ProjectProps[]>> 
  ) {
    name = name.toLowerCase();
    if (name !== "" || !name.match(/\s\s+/g)) {
      setTimeout(() => {
        let newProjectsFiltered = projects.filter((r: ProjectProps) => {
          // Não remover o length do resources, pois ele é utilizado para verificar se o projeto tem recursos
          const containsProject = r.name.toLocaleLowerCase().includes(name);
          const containsCustomer = r.customer.name
            .toLocaleLowerCase()
            .includes(name);
          const containsResponsibles =
            r.responsible &&
            r.responsible.name &&
            r.responsible.name.toLocaleLowerCase().includes(name);
          return containsProject || containsCustomer || containsResponsibles;
        });
        setProjectsFiltered(newProjectsFiltered);
      }, 1000);
    } else {
      setProjectsFiltered(projects);
    }
  }