import * as S from './styles'
import {
    Avatar,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text
} from "@chakra-ui/react"
import { memo, useState } from "react"
import { api } from "../../../../services/api"
import { Resource, RoomItemProps } from './interface'
import { roomsArray } from '../../functions/RoomsArray'

function RoomItem({ data, roomName, seats, resources, allResources, idRoom, onUpdateInfoInParent, homeOffice }: RoomItemProps) {
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState<'add' | 'edit' | 'mainModal' | null>(null)
    const [resourceModal, setResourceModal] = useState<Resource>()
    const [mainModal, setMainModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertModal, setShowAlertModal] = useState(false)
    const [selectedDay, setSelectedDay] = useState<string>('')
    const [selectedRoom, setSelectedRoom] = useState<string>('')
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [titleError, setTitleError] = useState("")
    const [confirmRemoveResourceModal, setConfirmRemoveResourceModal] = useState(false)

    const infoSchedule = "id:" + selectedResource?.id + "-sala:" + idRoom + "-dia:" + data.id
    const infoScheduleDelete = "id:" + resourceModal?.id + "-sala:" + idRoom + "-dia:" + data.id + "-idEscala:" + resourceModal?.roomResourceWeekdayId + "-colaborador:" + resourceModal?.id

    const amountResources = resources.length - 1
    const amountAllRoom = amountResources
    const numberOfSeats = seats
    const isThereEmptySpaces = amountAllRoom < numberOfSeats

    const roomId = roomsArray.find(room => room.name === roomName)

    const isHomeOffice = roomName === 'Home-office'
    const showFilledSeats = !isHomeOffice

    let uniqueId = ''

    if (roomId) {
        uniqueId = `dia:${data.id}-sala:${roomId.id.toString()}`
    } else {
        console.log(`Room with name ${roomName} not found.`)
    }

    const handleConfirmClick = () => {
        if (selectedResource && selectedResource.id !== undefined) {
            const diasDesejados = [1, 2, 3, 4, 5]

            const isDuplicate = data.rooms.some(room => {
                return (
                    room.resources?.some(resource => {
                        return (
                            resource.id === selectedResource.id &&
                            diasDesejados.includes(data.id)
                        )
                    })
                )
            })
            setShowModal(false)

            if (!isDuplicate) {
                onUpdateInfoInParent(infoSchedule)
                setShowModal(false)
            } else {
                setShowAlertModal(true)
                setShowAlert(true)
                setTitleError("Recurso já existente em outra sala neste dia")
                setErrorMessage("Este recurso já está em outra sala neste dia. Por favor selecione outro recurso!")
            }
        }
        setMainModal(false)
        setShowModal(false)
    }

    const handleDeleteResource = () => {
        onUpdateInfoInParent(infoScheduleDelete)
        setConfirmRemoveResourceModal(true)
        setShowModal(false)
    }

    const handleDeleteResource1 = () => {
        onUpdateInfoInParent(infoScheduleDelete)
        setShowModal(false)
    }

    function handleSelectResource(value: any) {
        setSelectedResource(value || null)
    }

    const handleUpdateResource = async () => {
        const currentMonth = new Date().getMonth() + 1
        const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1

        try {
            const apiPayloads = [
                {
                    "week_day": data.id,
                    "room_id": idRoom,
                    "month": currentMonth,
                    "resource_id": resourceModal?.id,
                    "new_room_id": Number(selectedRoom),
                    "new_week_day": Number(selectedDay)
                },
                {
                    "week_day": data.id,
                    "room_id": idRoom,
                    "month": nextMonth,
                    "resource_id": resourceModal?.id,
                    "new_room_id": Number(selectedRoom),
                    "new_week_day": Number(selectedDay)
                }
            ]

            const resourceNotConfirmed = resources.find(resource => resource.id)
            if (resourceNotConfirmed?.name == "Tester" && resourceNotConfirmed.id == 84) {
                setShowAlertModal(true)
                setShowAlertModal(true)
                setShowAlert(true)
                setTitleError("Recurso não confirmado")
                setErrorMessage("Confirme o recurso enviando a escala antes de atualizá-lo.")

                return
            }

            const successfulPromises = await Promise.allSettled(apiPayloads.map(payload =>
                api.put('/resource-room-to-day-of-week/update', payload)
            ))

            const successfulCount = successfulPromises.filter(p => p.status === 'fulfilled').length

            if (successfulCount > 0) {
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                setShowAlertModal(true)
                setShowAlert(true)
                setTitleError("Erro ao tentar atualizar")
                setErrorMessage("O colaborador já está nesta ou em outra sala nesse dia")
                console.error("O colaborador já está nesta ou em outra sala nesse dia")
            }

        } catch (error: any) {
            setShowAlertModal(true)
            setShowAlert(true)
            setTitleError("Erro ao tentar atualizar")
            setErrorMessage(error.response.data.message ?? "Erro desconhecido")
            console.error(error.response?.data?.message || "Erro desconhecido")
        }
    }

    return (
        <Flex flexDir='column' gap='50px' style={{ display: !homeOffice && isHomeOffice ? 'none' : 'flex' }} >
            <Flex flexDir='column'>
                <Flex display='flex' flexDir='row-reverse' position='relative' justifyContent='space-between'>
                    <Flex alignItems='flex-end' gap='5px'>
                        <Text color={isHomeOffice ? 'red' : undefined}>{roomName}</Text>
                        {showFilledSeats && <Text color='#B4B4B4'>({amountAllRoom}/{numberOfSeats})</Text>}
                    </Flex>
                </Flex>
                <S.ContainerRoom>
                    {resources.map((resource, index) => {
                        if (resource && resource.id && resource.name !== "Tester") {
                            if (resource.resourceStatus && resource.resourceStatus.status && resource.resourceStatus.status.name === "INATIVO") {
                                return null
                            }
                            return (
                                <Flex key={resource.id} align="center">
                                    <Avatar
                                        height={38}
                                        width={38}
                                        onClick={() => {
                                            setShowModal(true)
                                            setModalType('edit')
                                            setResourceModal(resource)
                                        }}
                                        name={resource.name}
                                        src={resource.photo_url}
                                        title={resource.name}
                                    />
                                </Flex>
                            )
                        } else {
                            return null
                        }
                    })}
                    {!isHomeOffice && isThereEmptySpaces && Array.from({ length: numberOfSeats - amountAllRoom }, (_, i) => (
                        <Avatar key={i}
                            height={22}
                            width={22}
                            onClick={() => {
                                setShowModal(true)
                                setModalType('add')
                            }} />
                    ))}
                    {isHomeOffice && (
                        <Flex flex='1' flexGrow={1} h='100' onClick={() => {
                            setShowModal(true)
                            setModalType('add')
                        }}>
                        </Flex>
                    )}
                    {modalType === 'add' && (
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)} isCentered >
                            <ModalOverlay />
                            <ModalContent bgColor='#EEEFF2' borderRadius='5px' paddingLeft={5} paddingRight={5} paddingBottom={5} minW='600px'>
                                <ModalHeader>
                                    <Text ml='-25px' fontSize='14px' fontWeight={500} color='#494343'>Colaborador</Text>
                                    <ModalCloseButton />
                                </ModalHeader>
                                <ModalBody bgColor='#F9F9FA' borderRadius='5px'>
                                    <Select
                                        value={selectedResource ? selectedResource.id.toString() : ''}
                                        onChange={(e) => {
                                            const resourceId = parseInt(e.target.value, 10)
                                            const selected = allResources.find(resource => resource.id === resourceId)
                                            handleSelectResource(selected || null)
                                        }}
                                    >
                                        <option value="" disabled>Selecione um recurso</option>
                                        {allResources.map(resource => (
                                            <option key={resource.id} value={resource.id}>{resource.name}</option>
                                        ))}
                                    </Select>
                                    <Button borderRadius='30px' bgColor='#239B28' fontSize='16px' color='#FFFFFF' width='100px' height='30px' fontWeight={400} marginTop={1} onClick={handleConfirmClick}>Confirmar</Button>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    )}
                    {modalType === 'edit' && (
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)} isCentered >
                            <ModalOverlay />
                            <ModalContent bgColor='#EEEFF2' borderRadius='5px' paddingLeft={5} paddingRight={5} paddingBottom={5} minW='600px'>
                                <ModalHeader>
                                    <Text ml='-25px' fontSize='14px' fontWeight={500} color='#494343'>Editar escala de {resourceModal?.name}</Text>
                                    <ModalCloseButton />
                                </ModalHeader>
                                <ModalBody bgColor='#F9F9FA' borderRadius='5px' minHeight='200px'>
                                    <Flex w='100%' minH='150px' justifyContent='center' flexDir='column' >
                                        <Flex justifyContent='space-around' alignItems='center' >
                                            <Flex flexDir='column' alignItems='center'>
                                                <Text fontWeight={700}>Dia</Text>
                                                <Select
                                                    value={selectedDay}
                                                    onChange={(e) => setSelectedDay(e.target.value)}>
                                                    <option value="" disabled>Selecione um dia</option>
                                                    <option value="1">Segunda-feira</option>
                                                    <option value="2">Terça-feira</option>
                                                    <option value="3">Quarta-feira</option>
                                                    <option value="4">Quinta-feira</option>
                                                    <option value="5">Sexta-feira</option>
                                                </Select>
                                            </Flex>
                                            <Flex flexDir='column' alignItems='center'>
                                                <Text fontWeight={700}>Sala</Text>
                                                <Select
                                                    value={selectedRoom}
                                                    onChange={(e) => setSelectedRoom(e.target.value)}>
                                                    <option value="" disabled>Selecione uma sala</option>
                                                    {roomsArray.map((room) => (
                                                        <option key={room.id} value={room.id}>
                                                            {room.name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </ModalBody>
                                <ModalFooter>
                                    <Flex justifyContent='space-between' w='100%'>
                                        <Button colorScheme='red' onClick={handleDeleteResource}>Retirar da sala</Button>
                                        <Button colorScheme="green" onClick={handleUpdateResource}>Confirmar</Button>
                                    </Flex>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    )}
                    {showAlert && (
                        <Modal isOpen={showAlertModal} onClose={() => setShowAlertModal(false)} isCentered>
                            <ModalOverlay />
                            <ModalContent bgColor='#EEEFF2' borderRadius='5px' paddingLeft={5} paddingRight={5} paddingBottom={5} minW='600px'>
                                <ModalHeader>
                                    <Text ml='-25px' fontSize='14px' fontWeight={500} color='#494343'>{titleError}</Text>
                                    <ModalCloseButton />
                                </ModalHeader>
                                <ModalBody bgColor='#F9F9FA' borderRadius='5px' minHeight='200px' display='flex' alignItems='center' justifyContent='center'>
                                    <Flex flexDir='column' justifyContent='center' gap='5'>
                                        <Text textAlign='center'>
                                            {errorMessage}
                                        </Text>
                                        <Text textAlign='center'>
                                        </Text>
                                    </Flex>
                                </ModalBody>
                                <ModalFooter justifyContent={false ? 'space-between' : 'center'}>
                                    <Button colorScheme="blue" onClick={() => setShowAlertModal(false)} maxWidth='160px' width='100%' fontWeight={400}>Voltar para escala</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    )}
                    {mainModal && (
                        <Modal isOpen={mainModal} onClose={() => setMainModal(false)} isCentered >
                            <ModalOverlay />
                            <ModalContent bgColor='#EEEFF2' borderRadius='5px' paddingLeft={5} paddingRight={5} paddingBottom={5} minW='600px'>
                                <ModalHeader>
                                    <Text ml='-25px' fontSize='14px' fontWeight={500} color='#494343'>Nova Pessoa</Text>
                                    <ModalCloseButton />
                                </ModalHeader>
                                <ModalBody bgColor='#F9F9FA' borderRadius='5px'>
                                    <Flex marginTop={5}>
                                        <Text style={{ marginBottom: '5px' }}>Novo Recurso</Text>
                                    </Flex>
                                    <Flex>
                                        <Select
                                            value={selectedResource ? selectedResource.id.toString() : ''}
                                            onChange={(e) => {
                                                const resourceId = parseInt(e.target.value, 10)
                                                const selected = allResources.find(resource => resource.id === resourceId)
                                                setSelectedResource(selected || null)
                                            }}
                                        >
                                            <option value="" disabled>Selecione um recurso</option>
                                            {allResources.map(resource => (
                                                <option key={resource.id} value={resource.id}>{resource.name}</option>
                                            ))}
                                        </Select>
                                    </Flex>
                                    <Flex marginTop={5} justifyContent="space-between">
                                        <Flex>
                                            <Button borderRadius='30px' bgColor='#239B28' fontSize='16px' color='#FFFFFF' width='150px' height='30px' fontWeight={400} marginTop={1} onClick={handleConfirmClick}>Confirmar Recurso</Button>
                                        </Flex>
                                        <Flex>
                                            <Button borderRadius='30px' colorScheme="blue" fontSize='16px' color='#FFFFFF' width='150px' height='30px' fontWeight={400} marginTop={1} onClick={() => setMainModal(false)}>Voltar</Button>
                                        </Flex>
                                    </Flex>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    )}
                    {confirmRemoveResourceModal && (
                        <Modal isOpen={confirmRemoveResourceModal} onClose={() => setConfirmRemoveResourceModal(false)} isCentered>
                            <ModalOverlay />
                            <ModalContent padding={5}>
                                <ModalBody>
                                    <Flex flexDir='column' alignItems='center' gap={5}>
                                        <Text fontWeight={600} fontSize='24px'>Tem certeza que deseja remover esse recurso?</Text>
                                        <Text fontSize='19px' textAlign='center'>Ao clicar em confirmar, esse colaborador será removido da escala</Text>
                                    </Flex>
                                </ModalBody>
                                <ModalFooter justifyContent="space-between">
                                    <Button colorScheme='blue' onClick={() => {
                                        setConfirmRemoveResourceModal(false)
                                    }}>Voltar</Button>
                                    <Button colorScheme='red' onClick={() => {
                                        handleDeleteResource1()
                                        setConfirmRemoveResourceModal(false)
                                    }}>Confirmar</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    )}
                </S.ContainerRoom>
            </Flex>
        </Flex>
    )
}

export default memo(RoomItem)