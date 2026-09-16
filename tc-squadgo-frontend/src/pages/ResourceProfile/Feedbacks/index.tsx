import { useCallback } from 'react'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select as ChakraSelect, Spinner, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { MdGroup, MdChat } from 'react-icons/md'
import { ImFolderUpload } from 'react-icons/im'
import { CgGirl } from 'react-icons/cg'
import { HiCheck } from 'react-icons/hi'
import * as S from './styles'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CreateButton from '../../../components/Buttons/CreateButton'
import { RiChatNewLine } from 'react-icons/ri'
import { FeedbackButtonProps } from './interfaces'
import { useFeedbacks } from './Models'
import { feedbackSchema } from './schemas'

const Feedbacks: React.FC = () => {
    
    const feedbacksHook = useFeedbacks()

    const {
        register,
        control,
        handleSubmit,
        formState,
        reset,
        clearErrors
    } = useForm({
        shouldUnregister: true,
        resolver: yupResolver(feedbackSchema)
    })

    const watchDescription = useWatch({ control, name: 'description', defaultValue: '' })
    const watchType = useWatch({ control, name: 'type' })

    const feedbacksType = useCallback((type?: 'PROJECT' | 'CUSTOMER' | 'PERSONAL') => {
        if (type) return feedbacksHook.states.feedbacksFiltered.filter(f => f.type === type)
        else return feedbacksHook.states.feedbacksFiltered
    }, [feedbacksHook.states.feedbacksFiltered])

    const FeedbackButton = ({ text, type, icon: Icon, iconSize = 25 }: FeedbackButtonProps) => {
        return (
            <S.FeedbackType isSelected={feedbacksHook.states.typeSelected === type} onClick={() => feedbacksHook.handles.handleChangeFeedbackType(type, feedbacksHook.states.setTypeSelected)}>
                <Flex justifyContent='center' alignItems='center' w='40px' h='40px' bgColor='#323237' padding='7px' borderRadius={'50%'}>
                    <Icon color='#fff' size={iconSize} />
                </Flex>
                <Flex direction='column' alignItems='flex-start'>
                    <Text fontWeight={700} color='#323237'>{text}</Text>
                    {type && (
                        <>
                            {feedbacksType(type).length > 0 && (
                                <Text color='#323237' fontSize='14px'>
                                    Último em {String(feedbacksType(type)[0].created_at)}
                                </Text>
                            )}
                        </>
                    )}
                    <Text color='#707070' mt='5px'>
                        {feedbacksType(type).length}{feedbacksType(type).length === 1 ? ' feedback' : ' feedbacks'}
                    </Text>
                </Flex>
            </S.FeedbackType>
        )
    }

    const FeedbackButtonSelected: React.FC = () => {
        if (feedbacksHook.states.typeSelected === 'CUSTOMER') {
            return <FeedbackButton text='Clientes' type='CUSTOMER' icon={MdChat} iconSize={20} />
        } else if (feedbacksHook.states.typeSelected === 'PERSONAL') {
            return <FeedbackButton text='Pessoal' type='PERSONAL' icon={MdGroup} />
        } else if (feedbacksHook.states.typeSelected === 'PROJECT') {
            return <FeedbackButton text='Projetos' type='PROJECT' icon={ImFolderUpload} iconSize={20} />
        } else if (feedbacksHook.states.typeSelected === 'RESOURCE') {
            return <FeedbackButton text='Colaborador' type='RESOURCE' icon={CgGirl} iconSize={20} />
        }

        return <FeedbackButton text='Todos' type={undefined} icon={CgGirl} />
    }

    return (
        <>
            <S.CreateButtonContainer>
                <CreateButton tooltipText='Criar feedback' icon={RiChatNewLine} onClick={() => feedbacksHook.modals.onOpen()} />
            </S.CreateButtonContainer>
            <S.Container>
                {feedbacksHook.states.loading ? (
                    <Spinner />
                ) : (
                    <S.FeedbacksList>
                        <Flex
                            boxShadow={'0px 2px 5px 1px rgba(0,0,0,0.35)'}
                            flex={1}
                            padding='5px'
                            direction='column'
                            gap='20px'
                            bgColor='#fff'
                            borderRadius='10px'>
                            <ChakraInput
                                defaultValue=''
                                placeholder='Pesquisar'
                                onChange={(e) => feedbacksHook.handles.handleFilterFeedback(
                                    e.target.value,
                                    feedbacksHook.states.feedbacks,
                                    feedbacksHook.states.setFeedbacksFiltered
                                    )} />
                            <Flex direction='column' gap='20px'>
                                <FeedbackButton text='Todos' type={undefined} icon={CgGirl} />
                                <FeedbackButton text='Pessoal' type='PERSONAL' icon={MdGroup} />
                                <FeedbackButton text='Projetos' type='PROJECT' icon={ImFolderUpload} iconSize={20} />
                                <FeedbackButton text='Clientes' type='CUSTOMER' icon={MdChat} iconSize={20} />
                                <FeedbackButton text='Colaborador' type='RESOURCE' icon={CgGirl} iconSize={20} />
                            </Flex>
                        </Flex>
                        <Flex
                            boxShadow={'0px 2px 5px 1px rgba(0,0,0,0.35)'}
                            direction='column'
                            padding='5px'
                            flex={2}
                            gap='20px'
                            bgColor='#fff'
                            borderRadius='10px'>
                            <FeedbackButtonSelected />
                            <Flex padding='20px' direction='column' gap='10px' overflowY={'auto'} maxH='400px'>
                                {feedbacksType(feedbacksHook.states.typeSelected).length ? (
                                    <>
                                        {feedbacksType(feedbacksHook.states.typeSelected).map((f, i) => (
                                            <Flex
                                                boxShadow={'0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)'}
                                                key={f.id}
                                                direction='column'
                                                bgColor='#fff'
                                                padding='15px'
                                                borderRadius={'9px'}
                                                gap='10px'>
                                                <Text color='#000' fontWeight={700}>
                                                    {`${f.reporter?.name ?? 'Anônimo'} | ${feedbacksHook.utils.feedbackTypeDescription(f)}`}
                                                    {feedbacksHook.utils.feedbackNameDescription(f) && ` | ${feedbacksHook.utils.feedbackNameDescription(f)}`}
                                                </Text>
                                                <Text wordBreak='break-word' color='#000'>{f.description}</Text>
                                                <Flex alignItems='center' gap='3px'>
                                                    <HiCheck color='#000' size={16} />
                                                    <Text fontSize='14px' color='#000'>{String(f.created_at)}</Text>
                                                </Flex>
                                            </Flex>
                                        ))}
                                    </>
                                ) : (
                                    <Text>Não há feedbacks nesta categoria</Text>
                                )}
                            </Flex>
                        </Flex>
                    </S.FeedbacksList>
                )}
                <Modal
                    isOpen={feedbacksHook.modals.isOpen}
                    onClose={() => feedbacksHook.handles.handleCloseNewModal(reset, clearErrors, feedbacksHook.modals.onClose)}
                    size={'xl'}>
                    <ModalOverlay />
                    <ModalContent>
                        <Box as='form' onSubmit={handleSubmit((data) => feedbacksHook.handles.handleCreate(
                            data, 
                            feedbacksHook.resource_id, 
                            feedbacksHook.user,
                            feedbacksHook.states.setLoadingCreating, 
                            feedbacksHook.states.setFeedbacksFiltered, 
                            feedbacksHook.states.feedbacks, 
                            reset, 
                            clearErrors, 
                            feedbacksHook.modals.onClose 
                        ))}>
                            <ModalHeader>Novo feedback:</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Flex
                                    flexDir={'column'}
                                    gap={4}>
                                    <FormControl isInvalid={!!formState.errors.description}>
                                        <FormLabel>Descrição</FormLabel>
                                        <Textarea
                                            size={'lg'}
                                            placeholder='Feedback do colaborador...'
                                            {...register('description')}
                                            maxLength={1500}
                                        />
                                        <Text mt='5px' color='#747474' fontSize='15px'>Limite: {1500 - (`${watchDescription}`.length)}</Text>
                                        <FormErrorMessage>
                                            {formState.errors.description && formState.errors.description.message!.toString()}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!formState.errors.type}>
                                        <FormLabel>Tipo</FormLabel>
                                        <ChakraSelect
                                            placeholder='Selecione...'
                                            {...register('type')} >
                                            <option value='CUSTOMER'>Clientes</option>
                                            <option value='PERSONAL'>Pessoal</option>
                                            <option value='PROJECT'>Projeto</option>
                                            <option value='RESOURCE'>Colaborador</option>
                                        </ChakraSelect>

                                        <FormErrorMessage>
                                            {formState.errors.type && formState.errors.type.message!.toString()}
                                        </FormErrorMessage>
                                    </FormControl>
                                    {watchType === 'PROJECT' && (
                                        <>
                                            {feedbacksHook.states.isLoadingProjects ? (
                                                <Spinner />
                                            ) : (
                                                <FormControl isInvalid={!!formState.errors.project_id}>
                                                    <FormLabel>Projetos</FormLabel>
                                                    <ChakraSelect
                                                        {...register('project_id')}
                                                        value={feedbacksHook.states.selectedProjectId}
                                                        onChange={(e) => {
                                                            const projectId = parseInt(e.target.value);
                                                            feedbacksHook.states.setSelectedProjectId(projectId);
                                                        }}
                                                    >
                                                        <option value={0}>Selecione...</option>
                                                        {feedbacksHook.states.projects.map(p => (
                                                            <option key={p.id} value={p.id}>{p.name}</option>
                                                        ))}
                                                    </ChakraSelect>

                                                    <FormLabel>Clientes</FormLabel>
                                                    <ChakraSelect
                                                        {...register('customer_id')}
                                                    >
                                                        <option value={0}>Selecione...</option>
                                                        {feedbacksHook.states.projects
                                                            .filter(project => project.id === feedbacksHook.states.selectedProjectId)
                                                            .map(project => (
                                                                <option key={project.customer.id} value={project.customer.id}>{project.customer.name}</option>
                                                            ))}
                                                    </ChakraSelect>

                                                    <FormErrorMessage>
                                                        {formState.errors.project_id && formState.errors.project_id.message!.toString()}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </>
                                    )}

                                    {watchType === 'CUSTOMER' && (
                                        <>
                                            {feedbacksHook.states.isLoadingCustomers ? (
                                                <Spinner />
                                            ) : (
                                                <FormControl isInvalid={!!formState.errors.customer_id}>
                                                    <FormLabel>Projetos</FormLabel>
                                                    <ChakraSelect
                                                        {...register('project_id')} >
                                                        <option value={0}>Selecione...</option>
                                                        {feedbacksHook.states.projects.map(p => (
                                                            <option key={p.id} value={p.id}>{p.name}</option>
                                                        ))}
                                                    </ChakraSelect>

                                                    <FormLabel>Clientes</FormLabel>
                                                    <ChakraSelect
                                                        {...register('customer_id')} >
                                                        <option value={0}>Selecione...</option>
                                                        {feedbacksHook.states.customers.map(p => (
                                                            <option key={p.id} value={p.id}>{p.name}</option>
                                                        ))}
                                                    </ChakraSelect>

                                                    <FormErrorMessage>
                                                        {formState.errors.customer_id && formState.errors.customer_id.message!.toString()}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </>

                                    )}

                                </Flex>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant='ghost' mr={3} onClick={() => feedbacksHook.handles.handleCloseNewModal(reset, clearErrors, feedbacksHook.modals.onClose)}>
                                    Cancelar
                                </Button>
                                <Button disabled={feedbacksHook.states.loadingCreating} type='submit' colorScheme='blue'>
                                    {feedbacksHook.states.loadingCreating && (
                                        <Spinner marginRight={'5px'} />
                                    )}
                                    Cadastrar</Button>
                            </ModalFooter>
                        </Box>
                    </ModalContent>
                </Modal>
            </S.Container>
        </>
    )
}

export default Feedbacks