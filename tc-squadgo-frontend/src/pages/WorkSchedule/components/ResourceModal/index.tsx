import { memo } from "react"
import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { format } from "date-fns"
import PersonCircle from '../../../../assets/PersonCircle.svg'

function ResourceModal({isModalOpen, setIsModalOpen, selectedResourceInfo, schedules}: any) {
    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered >
            <ModalOverlay />
            <ModalContent bgColor='#EEEFF2' borderRadius='5px' paddingLeft={5} paddingRight={5} paddingBottom={5} minW='600px'>
                <ModalHeader>
                    <Text ml='-25px' fontSize='14px' fontWeight={500} color='#494343'>Colaborador</Text>
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody bgColor='#F9F9FA' borderRadius='5px'>
                    {selectedResourceInfo && (
                        <>
                            <Flex width='100%' flexDir='column'>
                                <Flex flexDir='column' alignItems='center' mt='20px'>
                                    {selectedResourceInfo?.photo_url ? (
                                        <Image
                                            width='100px'
                                            height='100px'
                                            borderRadius='50%'
                                            objectFit='cover'
                                            src={selectedResourceInfo.photo_url}
                                        />
                                    ) : (
                                        <>
                                            <Image maxW='150px' maxH='100px' borderRadius='50%' src={PersonCircle} />
                                        </>
                                    )}
                                    <Text
                                        color='#494343'
                                        fontSize='16px'
                                        fontWeight={600}
                                    >
                                        {selectedResourceInfo.name}
                                    </Text>
                                    <Text
                                        color='#494343'
                                        fontSize='14px'
                                    >
                                        {selectedResourceInfo.resourceClassification?.classification.description}
                                    </Text>
                                </Flex>
                                <Flex gap={5} mt='20px'>
                                    <Flex flexDir='column' gap={5}>
                                        <Flex flexDir='column' gap={5}>
                                            <Flex flexDir='column'>
                                                <Text
                                                    color='#656C6F'
                                                    fontSize='12px'
                                                    fontWeight={400}
                                                >
                                                    E-mail:
                                                </Text>
                                                <Text
                                                    color='#333'
                                                    fontSize='15px'
                                                    fontWeight={400}
                                                >
                                                    {selectedResourceInfo.email}
                                                </Text>
                                            </Flex>
                                            <Flex flexDir='column'>
                                                <Text
                                                    color='#656C6F'
                                                    fontSize='12px'
                                                    fontWeight={400}
                                                >Data de admissão:
                                                </Text>
                                                <Text
                                                    color='#333'
                                                    fontSize='15px'
                                                    fontWeight={400}
                                                >
                                                    {
                                                        selectedResourceInfo?.admission_date ?
                                                            format(new Date(selectedResourceInfo.admission_date), 'dd/MM/yyyy') :
                                                            'Data de admissão não disponível'
                                                    }
                                                </Text>
                                            </Flex>
                                        </Flex>
                                        <Flex gap={5}>
                                            <Flex flexDir='column'>
                                                <Text
                                                    color='#656C6F'
                                                    fontSize='12px'
                                                    fontWeight={400}
                                                >Informação:
                                                </Text>
                                                <Text
                                                    color='#333'
                                                    fontSize='15px'
                                                    fontWeight={400}
                                                >
                                                    xxxxxxxxxx
                                                </Text>
                                            </Flex>
                                            <Flex flexDir='column'>
                                                <Text
                                                    color='#656C6F'
                                                    fontSize='12px'
                                                    fontWeight={400}
                                                >Dados importantes:
                                                </Text>
                                                <Text
                                                    color='#333'
                                                    fontSize='15px'
                                                    fontWeight={400}
                                                >
                                                    xxxxxxxxxx
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text>Escalas:</Text>
                                        <Flex flexDir="column" h="74%" justifyContent="space-between">
                                            {schedules.map((schedule: any) => (
                                                <Flex key={schedule.id}>
                                                    <Text fontSize="15px" fontWeight={500}>
                                                        {schedule.weekday}:
                                                    </Text>
                                                    <Text fontSize="15px" ml="5px">
                                                        {schedule.room ? schedule.room : 'Não atribuído'}
                                                    </Text>
                                                </Flex>
                                            ))}
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default memo(ResourceModal)