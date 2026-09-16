import { Link } from "react-router-dom"
import { Avatar, Divider, Flex, Menu, MenuButton, MenuItem, MenuList, Skeleton, Text, Box } from "@chakra-ui/react"
import { HiDotsVertical } from 'react-icons/hi'
import * as S from './styles'
import { useResourceProjects } from "./Models"


const ResourceProjects = () => {

    const resourceProjectsHook = useResourceProjects()

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

    return (
        <Flex direction={'column'} width='100%'>
            <Flex gap='30px' direction={'column'}>
                <Text fontWeight={700} fontSize={'20px'}>Projetos Trabalhados</Text>
                {resourceProjectsHook.states.loadingProjects ? (
                    <Flex gap='30px' width='100%' wrap={'wrap'}>
                        <ProjectsSkeleton />
                        <ProjectsSkeleton />
                        <ProjectsSkeleton />
                        <ProjectsSkeleton />
                    </Flex>
                ) : (
                    <Flex padding='20px' gap='60px 30px' width='100%' wrap={'wrap'}>
                        {resourceProjectsHook.states.projects.length > 0 ? (
                            <>
                                {resourceProjectsHook.states.projects.reverse().map(p => (
                                    <Flex position={'relative'}>
                                        <Flex
                                            opacity={p.project.resources.some(resource => resource.id === Number(resourceProjectsHook.resource_id)) && p.project.status !== 'CONCLUIDO' ? 1 : 0.5}
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
                                                    {resourceProjectsHook.utils.projectStatus(p.project.status)}
                                                </Text>
                                            </Flex>
                                            <Divider />
                                            <S.ProjectCardFooter>
                                                <Flex direction='column' flex={1}>
                                                    <Text wordBreak={'break-word'} fontWeight={700} color='#323237'>
                                                        {p.project.responsible ? resourceProjectsHook.utils.resourceName(p.project.responsible.name) : 'Sem líder'}
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
                                        <Box position={'absolute'} right={5} top={5}>
                                            <Menu>
                                                <MenuButton
                                                    as={S.ProjectActionButton}
                                                    width='40px'
                                                    bgColor='transparent'
                                                    borderRadius='50%'
                                                    display='flex'
                                                    justifyContent='center'
                                                    alignItems='center'
                                                    padding='0'>
                                                    <HiDotsVertical size={20} color='##323237' />
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem to={`/projetos?visualizar=${p.project.id}`} target='_blank' as={Link}>Visualizar projeto</MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Box>
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