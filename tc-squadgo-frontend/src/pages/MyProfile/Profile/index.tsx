import { useEffect, useState } from "react"
import { Box, Button, Center, Divider, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Spinner, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { Link } from "react-router-dom"

import { BiCode } from 'react-icons/bi'
import { IoIosNotifications } from 'react-icons/io'

import { api } from "../../../services/api"

import low_image from '../../../assets/low_image.png'

import * as S from './styles'
import { format, parseISO } from "date-fns"
import { useAuth } from "../../../context/AuthContext"

interface ResourceHistoric {
    id: number
    description: string
    type: string
    created_at: Date
}

interface ResourceHistoricFilter {
    totalHistoric: number
    current_page: number
    last_page: number
    data: ResourceHistoric
}

interface ProjectProps {
    id: number
    project: {
        id: number
        name: string
        status: string
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
    }
}

interface ResourceProps {
    id: number
    name: string
    email: string
    photo_url: string
    status: string
    hours_amount: number
    created_at: Date
    admission_date: Date | null
    vacation_date: Date | null
    resourceStatus: {
        status: {
            description: string
        }
        substatus: {
            description: string
        }
    }
}

interface FeedbackProps {
    id: number
    description: string
    type: string
    created_at: Date | string
    project: {
        id: number
        name: string
    } | null
    customer: {
        id: number
        name: string
    } | null
    reporter: {
        id: number
        name: string
    } | null
}

const Profile: React.FC = () => {
    const { user } = useAuth()

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [loadingResource, setLoadingResource] = useState(true)
    const [resource, setResource] = useState<ResourceProps>()

    const [loadingResourceProject, setLoadingResourceProject] = useState(true)
    const [projects, setProjects] = useState<ProjectProps[]>([])

    const [loadingFeedbacks, setLoadingFeedbacks] = useState(true)
    const [feedbacks, setFeedbacks] = useState<FeedbackProps[]>([])

    const [isLoadingHistoric, setIsLoadingHistoric] = useState(true)
    const [loadingMoreHistoric, setLoadingMoreHistoric] = useState(true)
    const [resourceHistorics, setResourceHistorics] = useState<ResourceHistoric[]>([])
    const [historicFilter, setHistoricFilter] = useState<Omit<ResourceHistoricFilter, 'data'>>({
        totalHistoric: 0,
        current_page: 1,
        last_page: 1
    })

    useEffect(() => {
        async function loadResource() {
            try {
                const response = await api.get(`/resources/${user.id}`)
                let { admission_date, vacation_date } = response.data

                if(admission_date) admission_date = format(new Date(admission_date), 'dd/MM/yyyy')
                if(vacation_date) vacation_date = format(new Date(vacation_date), 'dd/MM/yyyy')

                const resource = {...response.data, admission_date, vacation_date}

                setResource(resource)
            } catch (err) {
                toast({
                    title: 'Erro ao carregar dados do ',
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                })
            }
            setLoadingResource(false)
        }

        async function loadLastFeedbacks() {
            const response = await api.get(`/feedbacks?resource_id=${Number(user.id)}`);
            const feedbacksReturned: FeedbackProps[] = response.data;
        
            const filteredFeedbacks = feedbacksReturned.filter(f => f.type === "RESOURCE");
        
            const feedbacksFormatted = filteredFeedbacks.map((f: FeedbackProps) => {
                return { ...f, created_at: format(parseISO(f.created_at + ''), 'dd/MM/yyyy') };
            });
        
            setFeedbacks(feedbacksFormatted);
            setLoadingFeedbacks(false);
        }        
        
        loadResource()
        loadLastFeedbacks()
    }, [user.id, toast])

    useEffect(() => {
        async function loadResourceProject() {
            try {
                const response = await api.get(`/resources/${user.id}/projects-historic`)
                setProjects(response.data)
            } catch (err) {
                toast({
                    title: 'Erro ao carregar projetos do colaborador',
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                })
            }
            setLoadingResourceProject(false)
        }

        loadResourceProject()
    }, [resource, user.id, toast])

    useEffect(() => {
        async function loadLastsHistorics() {
            const response = await api.get(`/resources/${Number(user.id)}/historic`)
            const resourceHistoricResponse = response.data

            const resourceHistoricFilter: Omit<ResourceHistoricFilter, 'data'> = resourceHistoricResponse

            setHistoricFilter(resourceHistoricFilter)
            setIsLoadingHistoric(false)
        }

        loadLastsHistorics()
    }, [user.id])

    useEffect(() => {
        async function loadLastsHistorics() {
            const currentPage = `currentPage=${historicFilter.current_page}`;
    
            const response = await api.get(`/resources/${Number(user.id)}/historic?${currentPage}`);
            const resourceHistoricResponse = response.data;
            const resourceHistoricData = resourceHistoricResponse.data;
    
            const filteredHistorics = resourceHistoricData.filter((f: ResourceHistoric) => {
                return f.type !== 'NEW_FEEDBACK';
            });
    
            const historicsFormatted = filteredHistorics.map((f: ResourceHistoric) => {
                return { ...f, created_at: format(parseISO(f.created_at + ''), 'dd/MM/yyyy') };
            });
    
            setResourceHistorics(oldState => {
                return [...oldState, ...historicsFormatted];
            });
            setLoadingMoreHistoric(false);
            setIsLoadingHistoric(false);
        }
    
        loadLastsHistorics();
    }, [historicFilter.current_page, user.id]);
    

    const projectStatus = (status: string) => {
        switch (status) {
            case 'A_INICIAR':
                return 'A Iniciar'
            case 'EM_ANDAMENTO':
                return 'Em Andamento'
            case 'CONCLUIDO':
                return 'Concluído'
        }
    }

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

    const FeedbacksSkeleton: React.FC = () => {
        return (
            <Flex width={'100%'} gap='10px' direction='column'>
                <Skeleton height={'17px'} width='30%' />
                <Skeleton height={'17px'} width='100%' />
                <Skeleton height={'17px'} width='20%' />
            </Flex>
        )
    }

    const feedbackType = (feedback: FeedbackProps) => {
        if (feedback.type === 'RESOURCE' ) return 'Colaborador'
    }

    const resourceName = (name: string): string => {
        const lastName = name.substring(name.lastIndexOf(' '), name.length)
        const firstName = name.substring(0, name.indexOf(' '))

        return `${firstName} ${lastName}`
    }

    async function loadMoreHistoric() {
        const { current_page, last_page } = historicFilter
        if (current_page < last_page) {
            setLoadingMoreHistoric(true)
            setHistoricFilter(oldState => {
                return { ...oldState, current_page: current_page + 1 }
            })
        }
    }

    const typeOfHistory = (type: string) => {
        switch (type) {
            case 'STATUS_INACTIVE':
                return (
                    <Box
                        position='absolute'
                        top='5px'
                        left='-40px'
                        borderRadius={'50%'}
                        bgColor='#254568'
                        padding='7px'>
                        <IoIosNotifications color='#fff' />
                    </Box>)
            case 'REMOVE_PROJECT':
                return (
                    <Box
                        position='absolute'
                        top='5px'
                        left='-40px'
                        borderRadius={'50%'}
                        bgColor='#e5e5e5'
                        padding='7px'>
                        <BiCode color='#fff' />
                    </Box>
                )
            default:
                return (
                    <Box
                        position='absolute'
                        top='5px'
                        left='-40px'
                        borderRadius={'50%'}
                        bgColor='red'
                        padding='7px'>
                        <BiCode color='#fff' />
                    </Box>
                )
        }
    }

    return (
        <Flex width={'100%'}>
            <Flex direction={'column'} width='100%' gap='50px'>
                <S.ProfileContainer>
                    <S.ProfileContent>
                        <Flex flex={1} direction='column'>
                            <Text fontWeight={700} fontSize={'20px'}>Dados pessoais</Text>
                            <Flex direction={'column'} gap={'10px'} paddingTop={'10px'}>
                                <Flex gap='10px'>
                                    <Text fontSize={'18px'}><strong>Nome: </strong></Text>
                                    {loadingResource ? (
                                        <Skeleton height={'25px'} width='50%' />
                                    ) : (
                                        <Text fontSize={'18px'}>{resource?.name}</Text>
                                    )}
                                </Flex>
                                <Flex gap='10px'>
                                    <Text fontSize={'18px'} width='max-content'><strong>E-mail: </strong></Text>
                                    {loadingResource ? (
                                        <Skeleton height={'25px'} width='50%' />
                                    ) : (
                                        <Text fontSize={'18px'}>{resource?.email}</Text>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex flex={1} direction='column'>
                            <Text fontWeight={700} fontSize={'20px'}>Dados profissionais</Text>
                            <Flex direction={'column'} gap={'10px'} paddingTop={'10px'}>
                                <Flex gap='10px'>
                                    <Text fontSize={'18px'}><strong>Status: </strong></Text>
                                    {loadingResource ? (
                                        <Skeleton height={'25px'} width='50%' />
                                    ) : (
                                        <Text fontSize={'18px'}>
                                            {resource?.resourceStatus.substatus
                                                ?
                                                resource?.resourceStatus.substatus.description
                                                :
                                                resource?.resourceStatus.status.description}
                                        </Text>
                                    )}
                                </Flex>
                                <Flex gap='10px'>
                                    <Text fontSize={'18px'}><strong>Hora mensal: </strong></Text>
                                    {loadingResource ? (
                                        <Skeleton height={'25px'} width='50%' />
                                    ) : (
                                        <Text fontSize={'18px'}>{resource?.hours_amount}h</Text>
                                    )}
                                </Flex>
                                <Flex gap='10px'>
                                    <Text fontSize={'18px'}><strong>Data de admissão: </strong></Text>
                                    {resource?.admission_date && (
                                        <Text fontSize={'18px'}>{resource?.admission_date.toString()}</Text>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                    </S.ProfileContent>
                </S.ProfileContainer>
                <S.FeedbacksAndProjectsContainer>
                    <Flex gap='30px' direction={'column'} flex={1}>
                        <Text fontWeight={700} fontSize={'20px'}>Últimos projetos</Text>
                        {loadingResourceProject ? (
                            <Flex gap='30px' width='100%' wrap={'wrap'}>
                                <ProjectsSkeleton />
                                <ProjectsSkeleton />
                                <ProjectsSkeleton />
                                <ProjectsSkeleton />
                            </Flex>
                        ) : (
                            <>
                                {projects.reverse().length > 0 ? (
                                    <Flex gap='30px' direction='column' width='max-content'>
                                        <Flex gap='30px' width='100%' wrap={'wrap'} justifyContent={'flex-start'}>
                                            {projects.slice(0, 2).map(p => (
                                                <Flex key={p.id} direction={'column'} maxW='250px'>
                                                    <Image
                                                        boxShadow='0px 2px 5px 1px rgba(0,0,0,0.35)'
                                                        height={'150px'}
                                                        width={'150px'}
                                                        objectFit={'contain'}
                                                        borderRadius='10px'
                                                        mb={'10px'}
                                                        src={p.project.customer.image_url ?? low_image} />
                                                    <Text color='#797979' fontSize={'15px'}>{projectStatus(p.project.status)}</Text>
                                                    <Text fontWeight={700} fontSize={'18px'} mb='7px'>{p.project.name}</Text>
                                                    <Text color='#797979' fontSize={'15px'}>
                                                        Cliente: {p.project.customer.name}
                                                    </Text>
                                                    <Text color='#797979' fontSize={'15px'}>
                                                        Líder: {p.project.responsible ?
                                                            resourceName(p.project.responsible.name)
                                                            : 'Sem líder'}
                                                    </Text>
                                                </Flex>
                                            ))}
                                        </Flex>
                                            {projects.length > 2 && (
                                                <Button alignSelf={'center'} maxW='max-content' to={`/meu-perfil/projetos`} as={Link}>Ver mais</Button>
                                            )}
                                    </Flex>
                                ) : (
                                    <Text>Não há projetos</Text>
                                )}
                            </>
                        )}
                    </Flex>
                    <S.ProfileFeedbacks>
                        <Flex maxW={'400px'} direction='column' gap='20px'>
                            <Text fontWeight={700} fontSize={'20px'}>Últimos feedbacks</Text>
                            {loadingFeedbacks ? (
                                <Flex width={'100%'} gap='30px' direction='column'>
                                    <FeedbacksSkeleton />
                                    <FeedbacksSkeleton />
                                    <FeedbacksSkeleton />
                                </Flex>
                            ) : (
                                <>
                                    {feedbacks.length > 0 ? (
                                        <>
                                            {feedbacks.slice(0, 3).map(f => (
                                                <Flex key={f.id} width={'100%'} alignItems='center' gap='10px'>
                                                    <Flex direction='column'>
                                                        <Text fontWeight={700}>
                                                        {`${f.reporter?.name ?? 'Anônimo'} | ${feedbackType(f)}`}
                                                        </Text>
                                                        <Text>
                                                            {f.description.length > 70 ? (
                                                                <>{f.description.substring(
                                                                    0,
                                                                    f.description.substring(0, 70).lastIndexOf(' '))}...
                                                                </>
                                                            ) : (
                                                                <>{f.description}</>
                                                            )}
                                                        </Text>
                                                        <Text fontSize='14px' color='#838383'>{f.created_at.toString()}</Text>
                                                    </Flex>
                                                </Flex>
                                            ))}
                                            <Button
                                                to={`/meu-perfil/feedbacks`}
                                                as={Link}
                                                width='max-content'
                                                alignSelf='center'
                                            >Ver mais</Button>
                                        </>
                                    ) : (
                                        <Text>Não há feedbacks</Text>
                                    )}
                                </>
                            )}
                        </Flex>
                    </S.ProfileFeedbacks>
                </S.FeedbacksAndProjectsContainer>
                <S.SeeEvolutionButton width='max-content' onClick={onOpen}>Evoluções</S.SeeEvolutionButton>
            </Flex>
            <S.EvolutionsContainer>
                <Text fontWeight={700} fontSize={'20px'}>Evoluções</Text>
                {isLoadingHistoric ? (
                    <Flex width={'100%'} gap='30px' direction='column'>
                        <FeedbacksSkeleton />
                        <FeedbacksSkeleton />
                        <FeedbacksSkeleton />
                    </Flex>
                ) : (
                    <Flex direction='column' gap='50px'>
                        {resourceHistorics.length > 0 ? (
                            <>
                                <Flex direction='column' gap='50px' position='relative'>
                                    <Center
                                        height='100%'
                                        position='absolute'
                                        top='10px'
                                        left='-27px'
                                        borderWidth='1px'>
                                        <Divider orientation='vertical' />
                                    </Center>
                                    {resourceHistorics.slice(0, 4).map(f => (
                                        <Flex key={f.id} width={'100%'} alignItems='center'>
                                            <Flex direction='column'>
                                                <Flex position='relative'>
                                                    {typeOfHistory(f.type)}
                                                    <Text fontWeight={700}>
                                                        {f.description.length > 70 ? (
                                                            <>
                                                                {f.description.substring(0, f.description.substring(0, 70).lastIndexOf(' '))}...
                                                            </>
                                                        ) : (
                                                            <>{f.description}</>
                                                        )}
                                                    </Text>
                                                </Flex>
                                                <Text fontSize='14px' color='#838383'>{f.created_at.toString()}</Text>
                                            </Flex>
                                        </Flex>
                                    ))}
                                </Flex>
                                <Button
                                    onClick={onOpen}
                                    width={'max-content'}
                                    alignSelf='center'>Ver mais</Button>
                            </>
                        ) : (
                            <Text>Não há histórico</Text>
                        )}
                    </Flex>
                )}
            </S.EvolutionsContainer>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <Box>
                        <ModalHeader>Histórico</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {isLoadingHistoric ? (
                                <Spinner size='lg' />
                            ) : (
                                <Flex direction='column' gap='50px' paddingLeft='50px'>
                                    {resourceHistorics.length > 0 ? (
                                        <Flex direction='column' gap='50px' position='relative'>
                                            <Center
                                                height='100%'
                                                position='absolute'
                                                top='10px'
                                                left='-27px'
                                                borderWidth='1px'>
                                                <Divider orientation='vertical' />
                                            </Center>
                                            {resourceHistorics.map(f => (
                                                <Flex key={f.id} width={'100%'} alignItems='center'>
                                                    <Flex direction='column'>
                                                        <Flex position='relative'>
                                                            {typeOfHistory(f.type)}
                                                            <Text fontWeight={700}>
                                                                {f.description}
                                                            </Text>
                                                        </Flex>
                                                        <Text fontSize='14px' color='#838383'>{f.created_at.toString()}</Text>
                                                    </Flex>
                                                </Flex>
                                            ))}
                                        </Flex>
                                    ) : (
                                        <Text>Não há histórico</Text>
                                    )}
                                    {historicFilter.current_page < historicFilter.last_page && (
                                        <Button
                                            disabled={loadingMoreHistoric}
                                            marginTop={'10px'}
                                            width={'max-content'}
                                            onClick={() => loadMoreHistoric()}>
                                            Carregar mais
                                        </Button>
                                    )}
                                    {loadingMoreHistoric && (
                                        <Spinner mr={'5px'} />
                                    )}
                                </Flex>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='ghost' onClick={onClose}>
                                Fechar
                            </Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default Profile