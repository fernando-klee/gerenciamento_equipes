import { useEffect, useState, useCallback } from 'react'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select as ChakraSelect, Spinner, Text, Textarea, useDisclosure, Tooltip } from '@chakra-ui/react'
import * as yup from 'yup'
import { format, parseISO } from 'date-fns'
import { IconType } from 'react-icons'
import { MdGroup, MdChat, MdAdd } from 'react-icons/md'
import * as S from './styles'
import { api } from '../../../services/api'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CreateButton from '../../../components/Buttons/CreateButton'
import { useAuth } from '../../../context/AuthContext'
import { BiCalendar } from 'react-icons/bi'

interface OneOnOneProps {
    id: number
    description: string
    type: 'LEADER' | 'RESOURCE'
    leaderId: number
    resourceId: number
    createdAt: string
    updatedAt: string
    leaderName: string
}

interface OneOnOneButtonProps {
    text: string
    type?: any
    icon: IconType
    iconSize?: number
    isActive: boolean;
    onClick: () => void;
}

const GUIDING_QUESTIONS = [
    "Quais foram os principais pontos discutidos?",
    "Quais foram os desafios identificados?",
    "Quais foram as conquistas mencionadas?",
    "Quais são os próximos passos acordados?",
    "Há algum feedback específico a ser registrado?",
    "Quais foram as expectativas alinhadas?"
]

const MyProfileOneOnOne: React.FC = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [loadingCreating, setLoadingCreating] = useState(false)
    const [loadingEditing, setLoadingEditing] = useState(false)
    const [loadingDeleting, setLoadingDeleting] = useState(false)
    const [oneOnOnes, setOneOnOnes] = useState<OneOnOneProps[]>([])
    const [oneOnOnesFiltered, setOneOnOnesFiltered] = useState<OneOnOneProps[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const [selectedNote, setSelectedNote] = useState<OneOnOneProps | null>(null)
    const [selectedType, setSelectedType] = useState<'LEADER' | 'RESOURCE'>('RESOURCE')
    const [isLeader, setIsLeader] = useState(false)
    const [leaderId, setLeaderId] = useState<number | null>(null)
    const [leaderName, setLeaderName] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function loadUserData() {
            try {
                const response = await api.get(`/resources/${user.id}`)
                setIsLeader(response.data.leader)
                setLeaderId(response.data.leader_id)

                // Fetch leader's name if there is a leader
                if (response.data.leader_id) {
                    const leaderResponse = await api.get(`/resources/${response.data.leader_id}`)
                    setLeaderName(leaderResponse.data.name)
                }
            } catch (error) {
                console.error(error)
            }
        }

        loadUserData()
    }, [user.id])

    useEffect(() => {
        async function loadOneOnOnes() {
            try {
                const response = await api.get(`/one-on-one`, {
                    params: {
                        resourceId: Number(user.id),
                        leaderId: leaderId
                    }
                });

                const oneOnOnesFormatted = response.data.map((o: OneOnOneProps) => ({
                    ...o,
                    createdAt: format(parseISO(o.createdAt), 'dd/MM/yyyy')
                }));

                setOneOnOnes(oneOnOnesFormatted);
                setOneOnOnesFiltered(oneOnOnesFormatted);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (user.id && leaderId) {
            loadOneOnOnes();
        }
    }, [user.id, leaderId]);

    const oneOnOneSchema = yup.object({
        description: yup.string()
            .trim()
            .min(3, 'Deve ter no mínimo 3 caracteres')
            .max(1500, 'Deve ter até 1500 caracteres')
            .test('has-letters', 'A descrição deve conter pelo menos 3 letras', value => {
                if (!value) return false;
                const letterCount = (value.match(/[a-zA-ZÀ-ÿ]/g) || []).length;
                return letterCount >= 3;
            })
            .required('Descrição é obrigatória'),
        type: yup.mixed().oneOf(['LEADER', 'RESOURCE'], 'Tipo é obrigatório'),
    }).required()

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

    useEffect(() => {
        if (!isLeader) {
            setValueCreate('type', 'RESOURCE')
        }
    }, [isLeader, setValueCreate])

    const watchDescription = useWatch({ control: controlCreate, name: 'description', defaultValue: '' })
    const watchType = useWatch({ control: controlCreate, name: 'type' })

    const oneOnOnesType = useCallback((type?: 'LEADER' | 'LED') => {
        if (type) return oneOnOnesFiltered.filter(o => o.type === type)
        else return oneOnOnesFiltered
    }, [oneOnOnesFiltered])

    const OneOnOneButton = ({ text, type, icon: Icon, iconSize = 25 }: OneOnOneButtonProps) => {
        return (
            <S.OneOnOneType isSelected={selectedType === type} onClick={() => setSelectedType(type)}>
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

    function closeNewModal() {
        resetCreate()
        clearErrorsCreate()
        onClose()
    }

    function closeEditModal() {
        resetEdit()
        clearErrorsEdit()
        setSelectedNote(null)
        onEditClose()
    }

    function handleEditClick(note: OneOnOneProps) {
        setSelectedNote(note)
        setValueEdit('description', note.description)
        onEditOpen()
    }

    async function handleCreate(data: any) {
        if (!isLeader && data.type === 'LEADER') {
            return
        }

        setLoadingCreating(true)
        try {
            const payload = {
                description: data.description,
                type: isLeader ? data.type : 'RESOURCE',
                leaderId: isLeader ? leaderId : user.id,
                resourceId: isLeader ? user.id : leaderId,
            }

            const response = await api.post('/one-on-one', payload)

            const oneOnOneCreated = response.data as OneOnOneProps
            const oneOnOneCreatedFormatted: any = {
                ...oneOnOneCreated,
                createdAt: format(parseISO(oneOnOneCreated.createdAt), 'dd/MM/yyyy')
            }

            const oldOneOnOnes = [...oneOnOnes, oneOnOneCreatedFormatted]
            setOneOnOnesFiltered(oldOneOnOnes)
            setOneOnOnes(oldOneOnOnes)

            closeNewModal()
            window.location.reload()
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingCreating(false)
        }
    }

    async function handleEdit(data: any) {
        if (!selectedNote) return

        setLoadingEditing(true)
        try {
            await api.put(`/one-on-one/${selectedNote.id}`, {
                description: data.description
            })

            const updatedNotes = oneOnOnes.map(note =>
                note.id === selectedNote.id
                    ? { ...note, description: data.description }
                    : note
            )
            setOneOnOnes(updatedNotes)
            setOneOnOnesFiltered(updatedNotes)

            closeEditModal()
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingEditing(false)
        }
    }

    async function handleDelete(id: number) {
        if (!window.confirm('Tem certeza que deseja excluir esta anotação?')) return

        setLoadingDeleting(true)
        try {
            await api.delete(`/one-on-one/${id}`)
            setOneOnOnesFiltered(prev => prev.filter(oneOnOne => oneOnOne.id !== id))
            setOneOnOnes(prev => prev.filter(oneOnOne => oneOnOne.id !== id))
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingDeleting(false)
        }
    }

    function handleFilterOneOnOne(text: string) {
        text = text.toLowerCase()
        if (text !== '' || !text.match(/\s\s+/g)) {
            setTimeout(() => {
                const filtered = oneOnOnes.filter((o) =>
                    o.description.toLowerCase().includes(text)
                )
                setOneOnOnesFiltered(filtered)
            }, 1000)
        } else {
            setOneOnOnesFiltered(oneOnOnes)
        }
    }

    const filteredNotes = oneOnOnes.filter((note) => note.type === selectedType);

    const oneOnOneTypeDescription = (oneOnOne: OneOnOneProps): string => {
        if (oneOnOne.type === 'LEADER') return 'Anotações do Líder'
        else return 'Anotações do Liderado'
    }

    return (
        <Box width='100%' maxWidth='100%'>
            <Flex justifyContent='space-between' alignItems='center' mb='20px'>
                <Text fontSize='24px' fontWeight={700} color='#323237'>One-on-One</Text>
                <CreateButton onClick={onOpen} icon={MdAdd} />
            </Flex>

            <Flex mb="20px" gap="10px">
                <ChakraInput
                    placeholder="Buscar por anotações..."
                    onChange={(e) => handleFilterOneOnOne(e.target.value)}
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
                        isActive={selectedType === 'LEADER'}
                        onClick={() => setSelectedType('LEADER')}
                        icon={MdChat}
                        iconSize={20}
                    />
                    <OneOnOneButton
                        text='Anotações do Liderado'
                        type='RESOURCE'
                        isActive={selectedType === 'RESOURCE'}
                        onClick={() => setSelectedType('RESOURCE')}
                        icon={MdGroup}
                        iconSize={20}
                    />
                </Flex>

                <Box flex='1' maxHeight='calc(100vh - 250px)'>
                    {loading ? (
                        <Flex justifyContent='center' alignItems='center' h='200px'>
                            <Spinner />
                        </Flex>
                    ) : (
                        <S.NotesContainer>
                            {oneOnOnesFiltered
                                .filter((oneOnOne) => oneOnOne.type === selectedType)
                                .map((oneOnOne) => (
                                    <S.OneOnOneCard key={oneOnOne.id}>
                                        <Flex justifyContent='space-between' alignItems='center' mb='10px'>
                                            <Flex alignItems='center' gap='10px'>
                                                <Text fontWeight={700} color='#323237'>{oneOnOneTypeDescription(oneOnOne)}</Text>
                                                {oneOnOne.leaderId && (
                                                    <Text color='#707070'>
                                                        {oneOnOne.type === 'LEADER' ? 'por' : 'para'} {oneOnOne.leaderName}
                                                    </Text>
                                                )}
                                            </Flex>
                                            <Flex alignItems='center' gap='10px'>
                                                <Flex style={{ display: 'flex', alignItems: 'center', color: '#707070' }}>
                                                    <BiCalendar style={{ marginRight: '-7px', marginBottom: '2px' }} />
                                                    <Text color='#707070'>&emsp;{oneOnOne.createdAt}</Text>
                                                </Flex>
                                                {oneOnOne.type === 'RESOURCE' && (
                                                    <>
                                                        <Button
                                                            size='sm'
                                                            variant='ghost'
                                                            onClick={() => handleEditClick(oneOnOne)}
                                                            isLoading={loadingEditing && selectedNote?.id === oneOnOne.id}
                                                        >
                                                            Editar
                                                        </Button>
                                                        <Button
                                                            size='sm'
                                                            variant='ghost'
                                                            colorScheme='red'
                                                            onClick={() => handleDelete(oneOnOne.id)}
                                                            isLoading={loadingDeleting && selectedNote?.id === oneOnOne.id}
                                                        >
                                                            Excluir
                                                        </Button>
                                                    </>
                                                )}
                                            </Flex>
                                        </Flex>
                                        <Text color='#323237'>{oneOnOne.description}</Text>
                                    </S.OneOnOneCard>
                                ))}
                        </S.NotesContainer>
                    )}
                </Box>
            </Flex>

            <Modal isOpen={isOpen} onClose={closeNewModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Criar nova anotação</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction='column' gap='20px'>
                            {leaderName && (
                                <Text color='#707070' fontSize='14px'>
                                    Anotação será escrita para: {leaderName}
                                </Text>
                            )}
                            {isLeader && (
                                <input
                                type="hidden"
                                value="RESOURCE"
                                {...registerCreate('type')}
                            />
                            )}

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
                        <Button variant='ghost' mr={3} onClick={closeNewModal}>
                            Cancelar
                        </Button>
                        <Button
                            colorScheme='blue'
                            onClick={handleSubmitCreate(handleCreate)}
                            disabled={loadingCreating}
                        >
                            {loadingCreating ? <Spinner /> : 'Criar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isEditOpen} onClose={closeEditModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar anotação</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction='column' gap='20px'>
                            {leaderName && (
                                <Text color='#707070' fontSize='14px'>
                                    Anotação será escrita para: {leaderName}
                                </Text>
                            )}
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
                        <Button variant='ghost' mr={3} onClick={closeEditModal}>
                            Cancelar
                        </Button>
                        <Button
                            colorScheme='blue'
                            onClick={handleSubmitEdit(handleEdit)}
                            disabled={loadingEditing}
                        >
                            {loadingEditing ? <Spinner /> : 'Salvar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default MyProfileOneOnOne 