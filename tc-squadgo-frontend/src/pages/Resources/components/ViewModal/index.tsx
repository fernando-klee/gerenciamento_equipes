import {
    Avatar,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    WrapItem
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { ResourceProps } from '../../interfaces'
import { resourceStatusDescription } from '../../functions/utils/ResourceStatusDescription'

export function ViewModal({ selectedResource, onCloseView }:
    { selectedResource: ResourceProps, onCloseView: () => void }) {
    return (
        <ModalContent>
            {selectedResource && (
                <Box>
                    <ModalHeader mr={35}>{selectedResource.name}</ModalHeader>
                    <ModalCloseButton width={'25px'} height={'25px'} />
                    <ModalBody>
                        <Flex
                            alignItems='center'
                            justifyContent='center'>
                            <WrapItem
                                position='relative'>
                                <Avatar
                                    border='2px solid red'
                                    size='2xl'
                                    name={selectedResource.name}
                                    src={selectedResource.photo_url} />
                            </WrapItem>
                        </Flex>
                        <Flex
                            flexDir={'column'}
                            gap={4}>
                            <FormControl>
                                <FormLabel fontWeight={600}>Nome</FormLabel>
                                <Text>{selectedResource.name}</Text>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={600}>E-mail</FormLabel>
                                <Text>{selectedResource.email}</Text>
                            </FormControl>
                            <Flex gap={4}>
                                <FormControl>
                                    <FormLabel fontWeight={600}>Data de admissão</FormLabel>
                                    {selectedResource.admission_date ? (
                                        <Text>{format(selectedResource.admission_date, 'dd/MM/yyyy')}</Text>
                                    ) : (
                                        <Text />
                                    )}
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={600}>Saída de férias</FormLabel>
                                    {selectedResource.vacation_date ? (
                                        <Text>{format(selectedResource.vacation_date, 'dd/MM/yyyy')}</Text>
                                    ) : (
                                        <Text />
                                    )}
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={600}>Retorno de férias</FormLabel>
                                    {selectedResource.backFromVacation ? (
                                        <Text>
                                            {new Date(selectedResource.backFromVacation).toLocaleDateString('pt-BR',
                                                { day: '2-digit', month: '2-digit', year: 'numeric' }
                                            )}
                                        </Text>
                                    ) : (
                                        <Text />
                                    )}
                                </FormControl>
                            </Flex>
                            <Flex>
                                <FormControl>
                                    <FormLabel fontWeight={600}>Previsão de saída da empresa</FormLabel>
                                    {selectedResource.departure_forecast ? (
                                        <Text>{format(selectedResource.departure_forecast, 'dd/MM/yyyy')}</Text>
                                    ) : (
                                        <Text />
                                    )}
                                </FormControl>
                            </Flex>
                            <Flex>
                                <FormControl>
                                    <FormLabel fontWeight={600}>Tipos</FormLabel>
                                    <Flex>
                                        {selectedResource.__types__.length > 0 ? (
                                            <>
                                                {selectedResource.__types__.map((t, i) => (
                                                    <Text key={t.id}>{i >= 1 ? ',' : ''} {t.name}</Text>
                                                ))}
                                            </>
                                        ) : (
                                            <Text>Sem tipos cadastrados</Text>
                                        )}
                                    </Flex>
                                </FormControl>
                                <FormControl width={'max-content'}>
                                    <FormLabel fontWeight={600}>Status</FormLabel>
                                    <Text>
                                        {resourceStatusDescription(
                                            selectedResource.resourceStatus.status.name,
                                            selectedResource.hours_amount)?.description
                                        }
                                    </Text>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={600}>Classificação</FormLabel>
                                    <Text>{selectedResource.resourceClassification?.classification.description}</Text>
                                </FormControl>
                            </Flex>

                            <Flex gap={4}>
                                <FormControl>
                                    <FormLabel fontWeight={600}>Horas</FormLabel>
                                    <Text>{selectedResource?.hours_amount}</Text>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={600}>Líder</FormLabel>
                                    <Text>{selectedResource?.leader ? 'Sim' : 'Não'}</Text>
                                </FormControl>
                            </Flex>
                        </Flex >
                    </ModalBody >
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onCloseView}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Box >
            )}

        </ModalContent >
    )
}