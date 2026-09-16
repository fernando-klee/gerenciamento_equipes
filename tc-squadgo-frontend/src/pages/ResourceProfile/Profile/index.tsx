import { Box, Button, Center, Divider, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Spinner, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { Link } from "react-router-dom"

import { BiCode } from 'react-icons/bi'
import { IoIosNotifications } from 'react-icons/io'

import low_image from '../../../assets/low_image.png'

import * as S from './styles'
import { useResourceProfile } from "./Models"


const Profile: React.FC = () => {

    const profileHook = useResourceProfile()

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
                                    {profileHook.states.loadingResource ? (
                                        <Skeleton height={'25px'} width='50%' />
                                    ) : (
                                        <Text fontSize={'18px'}>{profileHook.states.resource?.name}</Text>
                                    )}
                                </Flex>
                                <Flex gap='10px'>
                                    <Text fontSize={'18px'} width='max-content'><strong>E-mail: </strong></Text>
                                    {profileHook.states.loadingResource ? (
                                        <Skeleton height={'25px'} width='50%' />
                                    ) : (
                                        <Text fontSize={'18px'}>{profileHook.states.resource?.email}</Text>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex flex={1} direction='column'>
                            <Text fontWeight={700} fontSize={'20px'}>Dados profissionais</Text>
                            <Flex direction={'column'} gap={'10px'} paddingTop={'10px'}>
                                <Flex gap='10px'>
                                    <Text fontSize={'18px'}><strong>Status: </strong></Text>
                                    {profileHook.states.loadingResource ? (
                                        <Skeleton height={'25px'} width='50%' />
                                    ) : (
                                        <Text fontSize={'18px'}>
                                            {profileHook.states.resource?.resourceStatus.substatus
                                                ?
                                                profileHook.states.resource?.resourceStatus.substatus.description
                                                :
                                                profileHook.states.resource?.resourceStatus.status.description}
                                        </Text>
                                    )}
                                </Flex>
                                <Flex gap='10px'>
                                    <Text fontSize={'18px'}><strong>Hora mensal: </strong></Text>
                                    {profileHook.states.loadingResource ? (
                                        <Skeleton height={'25px'} width='50%' />
                                    ) : (
                                        <Text fontSize={'18px'}>{profileHook.states.resource?.hours_amount}h</Text>
                                    )}
                                </Flex>
                                <Flex gap='10px'>
                                    <Text fontSize={'18px'}><strong>Data de admissão: </strong></Text>
                                    {profileHook.states.resource?.admission_date && (
                                        <Text fontSize={'18px'}>{profileHook.states.resource?.admission_date.toString()}</Text>
                                    )}
                                </Flex>
                                <Flex gap='10px'>
                                    <Text fontSize={'18px'}><strong>Saída de férias: </strong></Text>
                                    {profileHook.states.resource?.vacation_date && (
                                        <Text fontSize={'18px'}>{profileHook.states.resource?.vacation_date.toString()}</Text>
                                    )}
                                </Flex>
                                <Flex gap='10px'>
                                    <Text fontSize={'18px'}><strong>Retorno de férias: </strong></Text>
                                    {profileHook.states.resource?.backFromVacation && (
                                        <Text fontSize={'18px'}>{profileHook.states.resource?.backFromVacation.toString()}</Text>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                    </S.ProfileContent>
                </S.ProfileContainer>
                <S.FeedbacksAndProjectsContainer>
                    <Flex gap='30px' direction={'column'} flex={1}>
                        <Text fontWeight={700} fontSize={'20px'}>Últimos projetos</Text>
                        {profileHook.states.loadingResourceProject ? (
                            <Flex gap='30px' width='100%' wrap={'wrap'}>
                                <ProjectsSkeleton />
                                <ProjectsSkeleton />
                                <ProjectsSkeleton />
                                <ProjectsSkeleton />
                            </Flex>
                        ) : (
                            <>
                                {profileHook.states.projects.reverse().length > 0 ? (
                                    <Flex gap='30px' direction='column' width='max-content'>
                                        <Flex gap='30px' width='100%' wrap={'wrap'} justifyContent={'flex-start'}>
                                            {profileHook.states.projects.slice(0, 2).map(p => (
                                                <Flex key={p.id} direction={'column'} maxW='250px'>
                                                    <Image
                                                        boxShadow='0px 2px 5px 1px rgba(0,0,0,0.35)'
                                                        height={'150px'}
                                                        width={'150px'}
                                                        objectFit={'contain'}
                                                        borderRadius='10px'
                                                        mb={'10px'}
                                                        src={p.project.customer.image_url ?? low_image} />
                                                    <Text color='#797979' fontSize={'15px'}>{profileHook.utils.projectStatus(p.project.status)}</Text>
                                                    <Text fontWeight={700} fontSize={'18px'} mb='7px'>{p.project.name}</Text>
                                                    <Text color='#797979' fontSize={'15px'}>
                                                        Cliente: {p.project.customer.name}
                                                    </Text>
                                                    <Text color='#797979' fontSize={'15px'}>
                                                        Líder: {p.project.responsible ?
                                                            profileHook.utils.resourceName(p.project.responsible.name)
                                                            : 'Sem líder'}
                                                    </Text>
                                                    <S.LinkToProject target={'_blank'} to={`/projetos?visualizar=${p.project.id}`}>VER PROJETO</S.LinkToProject>
                                                </Flex>
                                            ))}
                                        </Flex>
                                        {profileHook.states.projects.length > 2 && (
                                            <Button alignSelf={'center'} maxW='max-content' to={`/recursos/${profileHook.resource_id}/projetos`} as={Link}>Ver mais</Button>
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
                            {profileHook.states.loadingFeedbacks ? (
                                <Flex width={'100%'} gap='30px' direction='column'>
                                    <FeedbacksSkeleton />
                                    <FeedbacksSkeleton />
                                    <FeedbacksSkeleton />
                                </Flex>
                            ) : (
                                <>
                                    {profileHook.states.feedbacks.length > 0 ? (
                                        <>
                                            {profileHook.states.feedbacks.slice(0, 3).map(f => (
                                                <Flex key={f.id} width={'100%'} alignItems='center' gap='10px'>
                                                    <Flex direction='column'>
                                                        <Text fontWeight={700}>
                                                            {profileHook.utils.feedbackType(f)}
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
                                                to={`/recursos/${profileHook.resource_id}/feedbacks`}
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
                <S.SeeEvolutionButton width='max-content' onClick={profileHook.modals.onOpen}>Evoluções</S.SeeEvolutionButton>
            </Flex>
            <S.EvolutionsContainer>
                <Text fontWeight={700} fontSize={'20px'}>Evoluções</Text>
                {profileHook.states.isLoadingHistoric ? (
                    <Flex width={'100%'} gap='30px' direction='column'>
                        <FeedbacksSkeleton />
                        <FeedbacksSkeleton />
                        <FeedbacksSkeleton />
                    </Flex>
                ) : (
                    <Flex direction='column' gap='50px'>
                        {profileHook.states.resourceHistorics.length > 0 ? (
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
                                    {profileHook.states.resourceHistorics.slice(0, 4).map(f => (
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
                                    onClick={profileHook.modals.onOpen}
                                    width={'max-content'}
                                    alignSelf='center'>Ver mais</Button>
                            </>
                        ) : (
                            <Text>Não há histórico</Text>
                        )}
                    </Flex>
                )}
            </S.EvolutionsContainer>
            <Modal isOpen={profileHook.modals
                .isOpen} onClose={profileHook.modals.onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <Box>
                        <ModalHeader>Histórico</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {profileHook.states.isLoadingHistoric ? (
                                <Spinner size='lg' />
                            ) : (
                                <Flex direction='column' gap='50px' paddingLeft='50px'>
                                    {profileHook.states.resourceHistorics.length > 0 ? (
                                        <Flex direction='column' gap='50px' position='relative'>
                                            <Center
                                                height='100%'
                                                position='absolute'
                                                top='10px'
                                                left='-27px'
                                                borderWidth='1px'>
                                                <Divider orientation='vertical' />
                                            </Center>
                                            {profileHook.states.resourceHistorics.map(f => (
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
                                    {profileHook.states.historicFilter.current_page < profileHook.states.historicFilter.last_page && (
                                        <Button
                                            disabled={profileHook.states.loadingMoreHistoric}
                                            marginTop={'10px'}
                                            width={'max-content'}
                                            onClick={() => profileHook.handles.handlePaginateHistoric(
                                                profileHook.states.historicFilter,
                                                profileHook.states.setHistoricFilter, 
                                                profileHook.states.setLoadingMoreHistoric
                                            )}>
                                            Carregar mais
                                        </Button>
                                    )}
                                    {profileHook.states.loadingMoreHistoric && (
                                        <Spinner mr={'5px'} />
                                    )}
                                </Flex>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='ghost' onClick={profileHook.modals.onClose}>
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