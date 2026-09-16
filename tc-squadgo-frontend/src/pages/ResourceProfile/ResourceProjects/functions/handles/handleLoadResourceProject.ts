import { format, parseISO } from "date-fns"
import { api } from "../../../../../services/api"
import { ProjectProps } from "../../interfaces"

export async function handleLoadResourceProject(
    resource_id: string,
    setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
    setLoadingProjects: React.Dispatch<React.SetStateAction<boolean>>,
    toast: any
) {
            try {
                const response = await api.get(`/resources/${resource_id}/projects-historic`)
                const projects = response.data
                const projectsFormatted = projects.map((p: ProjectProps) => {
                    const created_at = format(parseISO(p.created_at + ''), 'dd/MM/yyyy')
                    const project_start_estimate = format(parseISO(p.project.start_estimate + ''), 'dd.MM.yyyy')

                    let project_end_estimate = null
                    let project_conclusion_date = null

                    if (p.project.end_estimate) {
                        project_end_estimate = format(parseISO(p.project.end_estimate + ''), 'dd.MM.yyyy')
                    }

                    if (p.project.conclusion_date) {
                        project_conclusion_date = format(parseISO(p.project.conclusion_date + ''), 'dd.MM.yyyy')
                    }

                    return {
                        ...p,
                        created_at,
                        project: {
                            ...p.project,
                            start_estimate: project_start_estimate,
                            end_estimate: project_end_estimate,
                            conclusion_date: project_conclusion_date
                        }
                    }
                })
                setProjects(projectsFormatted)
            } catch (err) {
                toast({
                    title: 'Erro ao carregar projetos do colaborador',
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                })
            }
            setLoadingProjects(false)
        }