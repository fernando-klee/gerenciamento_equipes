import { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import { Avatar, Divider, Flex, Skeleton, Text, useToast, Box } from "@chakra-ui/react"

import { api } from "../../../services/api"
import { useAuth } from "../../../context/AuthContext"

import * as S from './styles'

interface Resource {
    id: number;
    name: string;
    photo_url: string;
}

interface ProjectProps {
    id: number
    created_at: Date | string
    project: {
        id: number
        name: string
        status: string
        start_estimate: Date | string
        end_estimate: Date | string | null
        conclusion_date: Date | string | null
        customer: {
            id: number
            name: string
            image_url: string
        }
        responsible: {
            id: number
            name: string
            photo_url: string
        }
        resources: Resource[];
    }
}

const ResourceProjects = () => {
    const { user } = useAuth()

    const toast = useToast()

    const [loadingProjects, setLoadingProjects] = useState(true)
    const [projects, setProjects] = useState<ProjectProps[]>([])

    useEffect(() => {
        async function loadResourceProject() {
            try {
                const response = await api.get(`/resources/${user.id}/projects-historic`)
                const projects = response.data
                const projectsFormatted = projects.map((p: ProjectProps) => {
                    const created_at = format(parseISO(p.created_at + ''), 'dd/MM/yyyy')
                    const project_start_estimate = format(parseISO(p.project.start_estimate + ''), 'dd/MM/yyyy')

                    let project_end_estimate = null
                    let project_conclusion_date = null

                    if (p.project.end_estimate) {
                        project_end_estimate = format(parseISO(p.project.end_estimate + ''), 'dd/MM/yyyy')
                    }

                    if (p.project.conclusion_date) {
                        project_conclusion_date = format(parseISO(p.project.conclusion_date + ''), 'dd/MM/yyyy')
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

        loadResourceProject()
    }, [user.id, toast])

    const ProjectsSkeleton: React.FC = () => {
        return (
            <Flex width={'250px'} gap='15px' direction='column'>
                <Skeleton height={'100px'} width='100%' />
                <Skeleton height={'20px'} width='100%' />
                <Skeleton height={'20px'} width='100%' />
                <Skeleton height={'20px'} width='100%' />
            </Flex>
        )
    }

    const projectStatus = (status: string): string => {
        if (status === 'EM_ANDAMENTO') return 'O projeto segue em andamento.'
        else if (status === 'A_INICIAR') return 'O projeto ainda não iniciou.'
        else return 'O projeto foi finalizado.'
    }

    const resourceName = (name: string): string => {
        const lastName = name.substring(name.lastIndexOf(' '), name.length)
        const firstName = name.substring(0, name.indexOf(' '))

        return `${firstName} ${lastName}`
    }

    return (
        <Flex direction={'column'} width='100%'>
            <Flex gap='30px' direction={'column'}>
                <Text fontWeight={700} fontSize={'20px'}>Projetos Trabalhados</Text>
                {loadingProjects ? (
                    <Flex gap='30px' width='100%' wrap={'wrap'}>
                        <ProjectsSkeleton />
                        <ProjectsSkeleton />
                        <ProjectsSkeleton />
                        <ProjectsSkeleton />
                    </Flex>
                ) : (
                    <Flex padding='20px' gap='60px 30px' width='100%' wrap={'wrap'}>
                        {projects.length > 0 ? (
                            <>
                                {projects.reverse().map(p => (
                                    <Flex position={'relative'}>
                                        <Flex
                                            opacity={p.project.resources.some(resource => resource.id === Number(user.id)) && p.project.status !== 'CONCLUIDO' ? 1 : 0.5}
                                            height='min-content'
                                            position='relative'
                                            key={p.id}
                                            borderRadius='10px'
                                            padding='20px'
                                            direction={'column'}
                                            width='370px'
                                            boxShadow={'0px 2px 5px 1px rgba(0,0,0,0.35)'}
                                            gap='20px' >
                                            <Flex gap='20px'>
                                                <Avatar
                                                    position='relative' top='-50px' mb='-50px'
                                                    height={'100px'}
                                                    width={'100px'}
                                                    size='2xl'
                                                    borderRadius='10px'
                                                    src={p.project.customer.image_url}
                                                    name={p.project.customer.name} />
                                                <Flex justifyContent='space-between' width='100%' gap='10px' >
                                                    <Text fontWeight={700} fontSize={'18px'} color='#323237' wordBreak='break-word'>{p.project.name}</Text>
                                                </Flex>
                                            </Flex>
                                            <Flex direction='column'>
                                                <Text color='#797979' fontSize={'17px'}>
                                                    Entrou no projeto em {p.created_at.toString()}
                                                </Text>
                                                <Text color='#797979' fontSize={'17px'}>
                                                    Cliente: {p.project.customer.name}
                                                </Text>
                                                <Text color='#797979' fontSize={'17px'}>
                                                    {projectStatus(p.project.status)}
                                                </Text>
                                            </Flex>
                                            <Divider />
                                            <S.ProjectCardFooter>
                                                <Flex direction='column' flex={1}>
                                                    <Text wordBreak={'break-word'} fontWeight={700} color='#323237'>
                                                        {p.project.responsible ? resourceName(p.project.responsible.name) : 'Sem líder'}
                                                    </Text>
                                                    <Text color='#797979'>Líder</Text>
                                                </Flex>
                                                <Flex flex={2} gap='10px'>
                                                    <Flex direction='column' alignItems={'flex-end'} flex={1}>
                                                        <Text fontWeight={700} color='#323237'>{p.project.start_estimate.toString()}</Text>
                                                        <Text color='#797979'>Data inicial</Text>
                                                    </Flex>
                                                    {p.project.conclusion_date && (
                                                        <Flex direction='column' alignItems={'flex-end'} flex={1}>
                                                            <Text fontWeight={700} color='#323237'>{p.project.conclusion_date.toString()}</Text>
                                                            <Text color='#797979'>Data final</Text>
                                                        </Flex>
                                                    )}
                                                </Flex>
                                            </S.ProjectCardFooter>
                                        </Flex>
                                    </Flex>
                                ))}
                            </>
                        ) : (
                            <Text>Não há projetos</Text>
                        )}
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

export default ResourceProjects