import { useCallback } from 'react'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select as ChakraSelect, Spinner, Text, Textarea, Tooltip } from '@chakra-ui/react'
import { MdGroup, MdChat, MdAdd } from 'react-icons/md'
import * as S from './styles'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CreateButton from '../../../components/Buttons/CreateButton'
import { BiCalendar } from 'react-icons/bi'
import { OneOnOneButtonProps } from './interfaces'
import { useOneOnOne } from './Models'
import { oneOnOneSchema } from './schemas'

const GUIDING_QUESTIONS = [
    "Quais foram os principais pontos discutidos?",
    "Quais foram os desafios identificados?",
    "Quais foram as conquistas mencionadas?",
    "Quais são os próximos passos acordados?",
    "Há algum feedback específico a ser registrado?",
    "Quais foram as expectativas alinhadas?"
]


const ResourceOneOnOne: React.FC = () => {

    const oneOnOneHook = useOneOnOne()

    const {
        register: registerCreate,
        control: controlCreate,
        handleSubmit: handleSubmitCreate,
        formState: formStateCreate,
        reset: resetCreate,
        clearErrors: clearErrorsCreate,
        setValue: setValueCreate
    } = useForm({
        shouldUnregister: true,
        resolver: yupResolver(oneOnOneSchema)
    })

    const {
        register: registerEdit,
        control: controlEdit,
        handleSubmit: handleSubmitEdit,
        formState: formStateEdit,
        reset: resetEdit,
        clearErrors: clearErrorsEdit,
        setValue: setValueEdit
    } = useForm({
        shouldUnregister: true,
        resolver: yupResolver(oneOnOneSchema)
    })

    const watchDescription = useWatch({ control: controlCreate, name: 'description', defaultValue: '' })
    const watchType = useWatch({ control: controlCreate, name: 'type' })

    const oneOnOnesType = useCallback((type?: 'LEADER' | 'LED') => {
        if (type) return oneOnOneHook.states.oneOnOnesFiltered.filter(o => o.type === type)
        else return oneOnOneHook.states.oneOnOnesFiltered
    }, [oneOnOneHook.states.oneOnOnesFiltered])

    const OneOnOneButton = ({ text, type, icon: Icon, iconSize = 25 }: OneOnOneButtonProps) => {
        return (
            <S.OneOnOneType isSelected={oneOnOneHook.states.selectedType === type} onClick={() => oneOnOneHook.states.setSelectedType(type)}>
                <Flex justifyContent='center' alignItems='center' w='40px' h='40px' bgColor='#323237' padding='7px' borderRadius={'50%'}>
                    <Icon color='#fff' size={iconSize} />
                </Flex>
                <Flex direction='column' alignItems='flex-start'>
                    <Text fontWeight={700} color='#323237'>{text}</Text>
                    {type && (
                        <>
                            {oneOnOnesType(type).length > 0 && (
                                <Text color='#323237' fontSize='14px'>
                                    Último em {String(oneOnOnesType(type)[0].createdAt)}
                                </Text>
                            )}
                        </>
                    )}
                    <Text color='#707070' mt='5px'>
                        {oneOnOnesType(type).length}{oneOnOnesType(type).length === 1 ? ' anotação' : ' anotações'}
                    </Text>
                </Flex>
            </S.OneOnOneType>
        )
    }


    return (
        <Box width='100%' maxWidth='100%'>
            <Flex justifyContent='space-between' alignItems='center' mb='20px'>
                <Text fontSize='24px' fontWeight={700} color='#323237'>One-on-One</Text>
                <CreateButton onClick={oneOnOneHook.modals.onOpen} icon={MdAdd} />
            </Flex>

            <Flex mb="20px" gap="10px">
                <ChakraInput
                    placeholder="Buscar por anotações..."
                    onChange={(e) => oneOnOneHook.handles.handleFilterOneOnOne(
                        e.target.value,
                        oneOnOneHook.states.oneOnOnes, 
                        oneOnOneHook.states.setOneOnOnesFiltered
                    )}
                />
                <Button colorScheme="blue">
                    Buscar
                </Button>
            </Flex>

            <Flex gap='20px'>
                <Flex direction='column' gap='10px' width='300px'>
                    <OneOnOneButton
                        text='Anotações do Líder'
                        type='LEADER'
                        isActive={oneOnOneHook.states.selectedType === 'LEADER'}
                        onClick={() => oneOnOneHook.states.setSelectedType('LEADER')}
                        icon={MdChat}
                        iconSize={20}
                    />
                    <OneOnOneButton
                        text='Anotações do Liderado'
                        type='RESOURCE'
                        isActive={oneOnOneHook.states.selectedType === 'RESOURCE'}
                        onClick={() => oneOnOneHook.states.setSelectedType('RESOURCE')}
                        icon={MdGroup}
                        iconSize={20}
                    />
                </Flex>

                <Box flex='1' maxHeight='calc(100vh - 250px)'>
                    {oneOnOneHook.states.loading ? (
                        <Flex justifyContent='center' alignItems='center' h='200px'>
                            <Spinner />
                        </Flex>
                    ) : (
                        <S.NotesContainer>
                            {oneOnOneHook.states.oneOnOnesFiltered
                                .filter((oneOnOne) => oneOnOne.type === oneOnOneHook.states.selectedType)
                                .map((oneOnOne) => (
                                    <S.OneOnOneCard key={oneOnOne.id}>
                                        <Flex justifyContent='space-between' alignItems='center' mb='10px'>
                                            <Flex alignItems='center' gap='10px'>
                                                <Text fontWeight={700} color='#323237'>{oneOnOneHook.utils.oneOnOneTypeDescription(oneOnOne)}</Text>
                                                {oneOnOne.leaderId && (
                                                    <Text color='#707070'>
                                                        {oneOnOne.type === 'LEADER' ? 'por' : 'para'} {oneOnOne.leaderName}
                                                    </Text>
                                                )}
                                            </Flex>
                                                    <Flex style={{ display: 'flex', alignItems: 'center', color: '#707070' }}>
                                                        <BiCalendar style={{ marginRight: '-7px', marginBottom: '2px' }} />
                                                        <Text color='#707070'>&emsp;{oneOnOne.createdAt}</Text>
                                                    </Flex>
                                            {oneOnOne.type === 'LEADER' && (
                                                <Flex alignItems='center' gap='10px'>
                                                    <Button
                                                        size='sm'
                                                        variant='ghost'
                                                        onClick={() => oneOnOneHook.handles.handleEditClick(
                                                            oneOnOne,
                                                            oneOnOneHook.states.setSelectedNote,
                                                            setValueEdit, 
                                                            oneOnOneHook.modals.onEditOpen
                                                        )}
                                                        isLoading={oneOnOneHook.states.loadingEditing && oneOnOneHook.states.selectedNote?.id === oneOnOne.id}
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        size='sm'
                                                        variant='ghost'
                                                        colorScheme='red'
                                                        onClick={() => oneOnOneHook.handles.handleDelete(
                                                            oneOnOne.id,
                                                            oneOnOneHook.states.setLoadingDeleting,
                                                            oneOnOneHook.states.setOneOnOnesFiltered,
                                                            oneOnOneHook.states.setOneOnOnes, 
                                                            oneOnOneHook.toast
                                                        )}
                                                        isLoading={oneOnOneHook.states.loadingDeleting && oneOnOneHook.states.selectedNote?.id === oneOnOne.id}
                                                    >
                                                        Excluir
                                                    </Button>
                                                </Flex>
                                            )}
                                        </Flex>
                                        <Text color='#323237'>{oneOnOne.description}</Text>
                                    </S.OneOnOneCard>
                                ))}
                        </S.NotesContainer>
                    )}
                </Box>
            </Flex>

            <Modal isOpen={oneOnOneHook.modals.isOpen} onClose={() => oneOnOneHook.handles.handleCloseNewModal(
                resetCreate,
                clearErrorsCreate,
                oneOnOneHook.modals.onClose 
            )}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Criar nova anotação</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction='column' gap='20px'>
                            <input
                                type="hidden"
                                value="LEADER"
                                {...registerCreate('type')}
                            />
                            <FormControl isInvalid={!!formStateCreate.errors.description}>
                                <FormLabel>
                                    <Flex align="center" gap="1">
                                        Descrição
                                        <Tooltip
                                            label={
                                                <Box p={2}>
                                                    <Text fontWeight="bold" mb={2}>Perguntas norteadoras:</Text>
                                                    {GUIDING_QUESTIONS.map((question, index) => (
                                                        <Text key={index} fontSize="sm" mb={1}>• {question}</Text>
                                                    ))}
                                                </Box>
                                            }
                                            placement="right"
                                            hasArrow
                                        >
                                            <Box
                                                as="span"
                                                color="blue.500"
                                                cursor="help"
                                                fontSize="sm"
                                                lineHeight="inherit"
                                                display="inline"
                                            >
                                                (?)
                                            </Box>
                                        </Tooltip>
                                    </Flex>
                                </FormLabel>

                                <Textarea
                                    placeholder='Digite a descrição...'
                                    {...registerCreate('description')}
                                    value={watchDescription}
                                />
                                <FormErrorMessage>
                                    {formStateCreate.errors.description?.message as string}
                                </FormErrorMessage>
                            </FormControl>

                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={() => oneOnOneHook.handles.handleCloseNewModal(
                            resetCreate,
                            clearErrorsCreate,
                            oneOnOneHook.modals.onClose
                        )}>
                            Cancelar
                        </Button>
                        <Button
                            colorScheme='blue'
                            onClick={handleSubmitCreate((data)=> oneOnOneHook.handles.handleCreate(
                                data, 
                                oneOnOneHook.states.setLoadingCreating, 
                                oneOnOneHook.user, 
                                oneOnOneHook.resource_id, 
                                oneOnOneHook.states.oneOnOnes, 
                                oneOnOneHook.states.setOneOnOnesFiltered, 
                                oneOnOneHook.states.setOneOnOnes, 
                                resetCreate, 
                                clearErrorsCreate, 
                                oneOnOneHook.modals.onClose, 
                                oneOnOneHook.toast
                            ))}
                            disabled={oneOnOneHook.states.loadingCreating}
                        >
                            {oneOnOneHook.states.loadingCreating ? <Spinner /> : 'Criar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={oneOnOneHook.modals.isEditOpen} onClose={() => oneOnOneHook.handles.handleCloseEditModal(
                resetEdit,
                clearErrorsEdit,
                oneOnOneHook.states.setSelectedNote,
                oneOnOneHook.modals.onEditClose
            )}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar anotação</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction='column' gap='20px'>
                            <FormControl isInvalid={!!formStateEdit.errors.description}>
                                <FormLabel>Descrição</FormLabel>
                                <Textarea
                                    placeholder='Digite a descrição...'
                                    {...registerEdit('description')}
                                />
                                <FormErrorMessage>
                                    {formStateEdit.errors.description?.message as string}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={() => oneOnOneHook.handles.handleCloseEditModal(
                            resetEdit,
                            clearErrorsEdit,
                            oneOnOneHook.states.setSelectedNote,
                            oneOnOneHook.modals.onEditClose
                        )}>
                            Cancelar
                        </Button>
                        <Button
                            colorScheme='blue'
                            onClick={handleSubmitEdit((data) => oneOnOneHook.handles.handleEdit(
                                data, 
                                oneOnOneHook.states.selectedNote, 
                                oneOnOneHook.states.setLoadingEditing,
                                oneOnOneHook.states.oneOnOnes, 
                                oneOnOneHook.states.setOneOnOnes, 
                                oneOnOneHook.states.setOneOnOnesFiltered,
                                resetEdit, 
                                clearErrorsEdit, 
                                oneOnOneHook.states.setSelectedNote, 
                                oneOnOneHook.modals.onEditClose, 
                                oneOnOneHook.toast
                            ))}
                            disabled={oneOnOneHook.states.loadingEditing}
                        >
                            {oneOnOneHook.states.loadingEditing ? <Spinner /> : 'Salvar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ResourceOneOnOne 