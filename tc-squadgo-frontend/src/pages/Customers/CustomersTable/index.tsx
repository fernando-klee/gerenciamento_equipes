import { memo } from 'react'
import {
    Avatar,
    Box,
    Button,
    Flex,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Stack,
    Skeleton,
    Tooltip
} from '@chakra-ui/react'
import { FaRegEye, FaRegTrashAlt } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { HasPermission } from '../../../components/HasPermission'
import Panel from '../../../components/Panel'
import { CustomerProps } from '../interfaces'

import * as S from './styles'
import TableActionButton from '../../../components/Buttons/TableActionButton'

interface CustomersTableProps {
    customers: CustomerProps[]
    loadingCustomers: boolean
    isLoadingDelete: boolean
    panelTitle: string
    selectCustomer(e: number): void
    deleteCustomer(e: number): void
    viewSelectedCustomer(e: number): void
}

const CustomersTable = memo(({
    customers,
    panelTitle,
    loadingCustomers,
    isLoadingDelete,
    selectCustomer,
    deleteCustomer,
    viewSelectedCustomer }: CustomersTableProps) => {

    return (
        <Panel counter={customers.length.toString()} title={panelTitle} flex={1} position='relative' flexDir={'column'}>
            {loadingCustomers ? (
                <Stack>
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                </Stack>
            ) : (
                <Flex maxWidth={'-webkit-fill-available'} overflowX='auto'>
                    {customers.length > 0 ? (
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>NOME</Th>
                                    <Th>HORAS CONTRATADAS</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {customers.map((e) => (
                                    <Tr key={e.id}>
                                        <Td>
                                            <Flex display='flex' alignItems={'center'} gap='20px'>
                                                <Avatar
                                                    objectFit={'cover'}
                                                    borderRadius='full'
                                                    boxSize='50px'
                                                    name={e.name}
                                                    src={e.image_url}
                                                />
                                                <Text fontWeight={700}>
                                                    {e.name}
                                                </Text>
                                            </Flex>
                                        </Td>
                                        <Td>
                                            <Text fontWeight={700}>
                                                {e.hired_hours}H por mês
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Box display='flex' gap='10px'>
                                                <HasPermission permissions={['update_customer']}>
                                                    <TableActionButton text='Editar' icon={FiEdit} onClick={() => selectCustomer(e.id)} />
                                                </HasPermission>
                                                <HasPermission permissions={['delete_customer']}>
                                                    <Popover>
                                                        <Tooltip hasArrow label={'Excluir'} bg='red.600'>
                                                            <Box display="inline-block">
                                                                <PopoverTrigger>
                                                                    <S.EditCustomerButton>
                                                                        <FaRegTrashAlt size={20} />
                                                                    </S.EditCustomerButton>
                                                                </PopoverTrigger>
                                                            </Box>
                                                        </Tooltip>
                                                        <PopoverContent>
                                                            <PopoverArrow />
                                                            <PopoverCloseButton />
                                                            <PopoverHeader>
                                                                <Flex direction='column' gap='10px'>
                                                                    <Text>Deletar cliente?</Text>
                                                                </Flex>
                                                            </PopoverHeader>
                                                            <PopoverBody>
                                                                <Text>Você tem certeza que deseja deletar este cliente?</Text>
                                                            </PopoverBody>
                                                            <PopoverFooter display='flex' justifyContent={'flex-end'}>
                                                                <Button disabled={isLoadingDelete} colorScheme={'red'} onClick={() => deleteCustomer(e.id)}>
                                                                    {isLoadingDelete && <Spinner marginRight='10px' />}
                                                                    Deletar
                                                                </Button>
                                                            </PopoverFooter>
                                                        </PopoverContent>
                                                    </Popover>
                                                </HasPermission>
                                                <TableActionButton text='Visualizar' icon={FaRegEye} onClick={() => viewSelectedCustomer(e.id)} />
                                            </Box>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    ) : (
                        <Text width='100%' textAlign='center'>Não há clientes neste status</Text>
                    )}
                </Flex>
            )}
        </Panel>
    )
})

export default CustomersTable