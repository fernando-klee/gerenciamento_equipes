import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text
} from "@chakra-ui/react"
import { handleConfirmClearResources } from "../functions/HandleConfirmClearResources"

export function DeleteModal(isModalOpen: any, setIsModalOpen: any) {
    return (
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isCentered
        >
            <ModalOverlay />
            <ModalContent padding={5}>
                <ModalBody>
                    <Flex flexDir='column' alignItems='center' gap={5}>
                        <Text
                            fontWeight={600}
                            fontSize='24px'
                        >
                            Tem certeza que deseja excluir?
                        </Text>
                        <Text
                            fontSize='19px'
                            textAlign='center'
                        >
                            Ao clicar em excluir, todos os colaboradores serão removidos da escala
                        </Text>
                    </Flex>
                </ModalBody>
                <ModalFooter justifyContent='space-evenly'>
                    <Button
                        colorScheme="blue"
                        onClick={() => setIsModalOpen(false)}
                        maxWidth='160px'
                        width='100%'
                        fontWeight={400}
                    >
                        Voltar para escala
                    </Button>
                    <Button
                        colorScheme="gray"
                        bgColor='#E3E3E3'
                        onClick={handleConfirmClearResources}
                        maxWidth='160px'
                        width='100%'
                        fontWeight={400}
                    >
                        Excluir
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}