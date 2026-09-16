import { ChangeEvent, useState } from 'react'
import InputMask from "react-input-mask";
import {
    Avatar,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input as ChakraInput,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Spinner,
    Switch,
    Text,
    useToast,
    WrapItem,
    Heading,
    Icon
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/hooks'

import queryString from 'query-string'

import { useLocation, useHistory } from 'react-router-dom'

import * as yup from 'yup'

import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { MdAccessible, MdPostAdd } from 'react-icons/md'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { api } from '../../services/api'
import CreateButton from '../../components/Buttons/CreateButton'
import Input from '../../components/Forms/Input'

import * as S from './styles'
import { HasPermission } from '../../components/HasPermission'
import { useCustomers } from './Models'
import CustomersTable from './CustomersTable'
import InputDefault from '../../components/Forms/ChakraInput'
import InputDate from '../../components/Forms/InputDate'
import ptBR from 'date-fns/locale/pt-BR'
import { format, parseISO } from 'date-fns'
import Header from '../../components/Header'
import { newCustomerSchema } from './Schemas';
import { FiCamera } from 'react-icons/fi';


const Customers: React.FC = () => {
    const customersHook = useCustomers();

    const {
        control,
        register: registerNewCustomer,
        handleSubmit: handleSubmitNewCustomer,
        formState,
        setValue,
        reset: resetNewCustomerModal,
        clearErrors } = useForm({
            resolver: yupResolver(newCustomerSchema)
        })

    const {
        control: controlUpdate,
        register: registerUpdateCustomer,
        handleSubmit: handleSubmitUpdateCustomer,
        formState: formStateUpdate,
        setValue: setValueUpdate,
        reset: resetUpdateCustomerModal,
        clearErrors: clearUpdateErrors } = useForm({
            resolver: yupResolver(newCustomerSchema)
        })


    return (
        <>
            <Header
                buttons={[
                    {
                        createPermissions: ['create_customer'],
                        newIcon: MdPostAdd,
                        onClick: customersHook.states.onOpen,
                        title: 'Criar cliente'
                    }
                ]} />
            <S.Container>
                <Flex alignItems={'center'}>
                    <Flex marginLeft='auto' alignItems={'center'} gap='10px'>
                        <InputDefault onChange={(e) => customersHook.utils.filterCustomersByName(e.target.value, customersHook.states.customers,
                            customersHook.states.setCustomersFiltered)} size='md' name='name' placeholder='Insira o nome do cliente' />
                    </Flex>
                </Flex>
                <S.TableLineContainer>
                    <CustomersTable
                        customers={customersHook.utils.typeOfCustomers('ATIVO', customersHook.states.customersFiltered)}
                        deleteCustomer={(customer_id) => customersHook.handles.handleDeleteCustomer(
                            customer_id,
                            customersHook.states.setIsLoadingDelete,
                            customersHook.states.customers,
                            customersHook.states.setCustomers,
                            customersHook.states.customersFiltered,
                            customersHook.states.setCustomersFiltered,
                            customersHook.states.toast
                        )}
                        loadingCustomers={customersHook.states.loadingCustomers}
                        selectCustomer={(customer_id) => customersHook.handles.handleSelectCustomer(
                            customer_id,
                            resetUpdateCustomerModal, 
                            clearUpdateErrors, 
                            customersHook.states.customers,
                            customersHook.states.setSelectedCustomer, 
                            setValueUpdate,
                            customersHook.states.setCurrentSelectedCustomerStatus,
                            customersHook.states.onOpenUpdate
                        )}
                        viewSelectedCustomer={(customer_id) => customersHook.handles.handleViewSelectedCustomer(
                            customer_id,
                            customersHook.states.customers,
                            customersHook.states.setSelectedCustomer, 
                            customersHook.states.setCurrentSelectedCustomerStatus, 
                            customersHook.states.onOpenView
                        )}
                        isLoadingDelete={customersHook.states.isLoadingDelete}
                        panelTitle='Ativos' />
                    <CustomersTable
                        customers={customersHook.utils.typeOfCustomers('INATIVO', customersHook.states.customersFiltered)}
                        deleteCustomer={(customer_id) => customersHook.handles.handleDeleteCustomer(
                            customer_id,
                            customersHook.states.setIsLoadingDelete,
                            customersHook.states.customers,
                            customersHook.states.setCustomers,
                            customersHook.states.customersFiltered,
                            customersHook.states.setCustomersFiltered,
                            customersHook.states.toast
                        )}
                        loadingCustomers={customersHook.states.loadingCustomers}
                        selectCustomer={(customer_id) => customersHook.handles.handleSelectCustomer(
                            customer_id,
                            resetUpdateCustomerModal, 
                            clearUpdateErrors, 
                            customersHook.states.customers,
                            customersHook.states.setSelectedCustomer, 
                            setValueUpdate,
                            customersHook.states.setCurrentSelectedCustomerStatus,
                            customersHook.states.onOpenUpdate
                        )}
                        viewSelectedCustomer={(customer_id) => customersHook.handles.handleViewSelectedCustomer(
                            customer_id,
                            customersHook.states.customers,
                            customersHook.states.setSelectedCustomer, 
                            customersHook.states.setCurrentSelectedCustomerStatus, 
                            customersHook.states.onOpenView
                        )}
                        isLoadingDelete={customersHook.states.isLoadingDelete}
                        panelTitle='Inativos' />
                </S.TableLineContainer>
                <Modal isOpen={customersHook.states.isOpen} onClose={() => customersHook.handles.handleCloseNewCustomerModal(
                                customersHook.states.setNewCustomerImage,
                                clearErrors,
                                resetNewCustomerModal,
                                customersHook.states.onClose)}>
                    <ModalOverlay />
                    <ModalContent>
                        <Box as='form' onSubmit={handleSubmitNewCustomer((values) => customersHook.handles.handleCreateNewCustomer(
                            values,
                            customersHook.states.setIsLoadingCreating,
                            customersHook.states.newCustomerImage,
                            customersHook.states.customers,
                            customersHook.states.setCustomers,
                            customersHook.states.setCustomersFiltered,
                            resetNewCustomerModal,
                            () => customersHook.handles.handleCloseNewCustomerModal(customersHook.states.setNewCustomerImage,
                                    clearErrors,
                                    resetNewCustomerModal,
                                    customersHook.states.onClose),
                            customersHook.states.toast
                        ))}>
                            <ModalHeader>Cadastro de clientes</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Flex
                                    flexDir={'column'}
                                    gap={6}
                                    >
                                    <Flex
                                        alignItems='center'
                                        justifyContent='center'>
                                        <WrapItem
                                            position='relative' role='group'>
                                            <Avatar
                                                border='2px solid red'
                                                size='2xl'
                                                src={customersHook.states.newCustomerImage.tempImage} 
                                                 />
                                                <Box
                                                position='absolute'
                                                top={0}
                                                left={0}
                                                width='100%'
                                                height='100%'
                                                borderRadius='full'
                                                bg='blackAlpha.600'
                                                opacity={0}
                                                transition='opacity 0.3s ease-in-out'
                                                pointerEvents='none'
                                                _groupHover={{
                                                    opacity: 1
                                                    }}
                                                />

                                                <Box
                                                    position='absolute'
                                                    top='50%'
                                                    left='50%'
                                                    transform='translate(-50%, -50%)'
                                                    opacity={0}
                                                    transition='opacity 0.3s ease-in-out'
                                                    pointerEvents='none'
                                                    zIndex={1}
                                                    _groupHover={{
                                                        opacity: 1
                                                    }}
                                                    >
                                                    <Icon as={FiCamera} color='white' boxSize={8} />
                                                </Box>
                                            <FormLabel
                                                cursor='pointer'
                                                htmlFor='customer_image'
                                                position='absolute'
                                                height={'100%'}
                                                width={'100%'}
                                                borderRadius='full'
                                                m={0}
                                                zIndex={2}>
                                                <ChakraInput
                                                    display='none'
                                                    id='customer_image'
                                                    type='file'
                                                    onChange={(e) => customersHook.handles.handleNewCustomerImage(e, customersHook.states.setNewCustomerImage, customersHook.states.toast)} />
                                            </FormLabel>
                                        </WrapItem>
                                    </Flex>
                                    <Flex flexDir="column"
                                        gap={6}
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                        >
                                        <Input
                                        maxLength={50}
                                        label="Nome do cliente"
                                        labelSize="lg"
                                        color="gray.700" 
                                        size="lg" mb={4}
                                        error={formState.errors.name}
                                        {...registerNewCustomer('name')}
                                        />
                                    </Flex>
                                    <Flex flexDirection='column'
                                        gap={6}
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                    >
                                        
                                            <Heading size="md" mb={2} color="gray.700" display="flex" alignItems="center" >
                                             Informações do contrato
                                            </Heading>
                                            <Flex display="flex" gap={10}>
                                                <FormControl>
                                                    <FormLabel htmlFor='hired-hours'>Horas contratadas</FormLabel>
                                                    <NumberInput
                                                        size='md'
                                                        width={'100px'}
                                                        defaultValue={0}
                                                        onChange={(value) => setValue('hired_hours', value)}
                                                        min={0}
                                                        max={9999}>
                                                        <NumberInputField id='hired-hours' {...registerNewCustomer('hired_hours')} />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </FormControl>
                                                <FormControl>
                                                    <Box maxW={'max-content'}>
                                                        <FormLabel htmlFor='keep-on'>{customersHook.states.newCustomerStatus ? 'Ativo' : 'Inativo'}</FormLabel>
                                                        <Switch
                                                            id='keep-on'
                                                            defaultChecked={customersHook.states.newCustomerStatus}
                                                            {...registerNewCustomer('status', { onChange: () => customersHook.states.setNewCustomerStatus(!customersHook.states.newCustomerStatus) })} />
                                                    </Box>
                                                </FormControl>
                                            </Flex>
                                        
                                        <Flex justifyContent='space-between' gap={10}>
                                            <FormControl>
                                                <Controller
                                                    control={control}
                                                    name="start_contract_time"
                                                    render={({ field: { onChange, value } }) => (
                                                        <InputDate
                                                            label='Início do contrato'
                                                            dateFormat="dd/MM/yyyy"
                                                            locale={ptBR}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            selected={value}
                                                        />
                                                    )}
                                                />
                                                {formState.errors.start_contract_time && (
                                                    <Text color="red.500" fontSize="sm" mt={1}>
                                                        {String(formState.errors.start_contract_time.message || 'Erro de validação')}
                                                    </Text>
                                                )}
                                            </FormControl>
                                            <FormControl>
                                                <Controller
                                                    control={control}
                                                    name="end_contract_time"
                                                    render={({ field: { onChange, value } }) => (
                                                        <InputDate
                                                            label='Fim do contrato'
                                                            dateFormat="dd/MM/yyyy"
                                                            locale={ptBR}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            selected={value}
                                                        />
                                                    )}
                                                />
                                                {formState.errors.end_contract_time && (
                                                    <Text color="red.500" fontSize="sm" mt={1}>
                                                        {String(formState.errors.end_contract_time.message || 'Erro de validação')}
                                                    </Text>
                                                )}
                                            </FormControl>
                                        </Flex>
                                    </Flex>
                                    <Flex flexDirection='column' 
                                        gap={6}
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                    >
                                            <Heading size="md" mb={2} color="gray.700" display="flex" alignItems="center">
                                             Informações do projeto
                                            </Heading>
                                        <Input
                                            label='Perfil do colaborador'
                                            placeholder=''
                                            maxLength={50}
                                            error={formState.errors.resource_profile}
                                            {...registerNewCustomer('resource_profile')} />
                                        <Input
                                            label='Objetivo do cliente'
                                            maxLength={50}
                                            placeholder=''
                                            error={formState.errors.objective}
                                            {...registerNewCustomer('objective')} />
                                    </Flex>
                                    <Flex flexDirection='column' 
                                        gap={6}
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                    >
                                        <Heading size="md" mb={2} color="gray.700" display="flex" alignItems="center">
                                             Informações do responsável
                                        </Heading>
                                        <Flex gap={5}>
                                            <Input
                                                maxLength={50}
                                                label="Nome"
                                                error={formState.errors.responsible_name}
                                                {...registerNewCustomer('responsible_name')}
                                            />
                                            <Input
                                                maxLength={50}
                                                as={InputMask}
                                                maskChar={null}
                                                mask="+99 (99) 99999-9999"
                                                label="Telefone"
                                                placeholder="+99 (99) 99999-9999"
                                                error={formState.errors.responsible_phone}
                                                {...registerNewCustomer('responsible_phone')}
                                            />
                                        </Flex>
                                        <Input
                                            maxLength={50}
                                            label="E-mail"
                                            placeholder="exemplo@email.com"
                                            error={formState.errors.responsible_email}
                                            {...registerNewCustomer('responsible_email')}
                                        />
                                    </Flex>
                                </Flex>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant='ghost' mr={3} onClick={customersHook.states.onClose}>
                                    Cancelar
                                </Button>
                                <Button type='submit' colorScheme='blue' disabled={customersHook.states.isLoadingCreating}>{customersHook.states.isLoadingCreating ? <Spinner /> : 'Cadastrar'}</Button>
                            </ModalFooter>
                        </Box>
                    </ModalContent>
                </Modal>.
                <Modal isOpen={customersHook.states.isOpenUpdate} onClose={customersHook.states.onCloseUpdate}>
                    <ModalOverlay />
                    <ModalContent>
                        <Box as='form' onSubmit={handleSubmitUpdateCustomer((values) => customersHook.handles.handleUpdateCustomer(
                            values,
                            customersHook.states.setIsLoadingUpdating,
                            customersHook.states.currentSelectedCustomerStatus,
                            customersHook.states.selectedCustomer,
                            customersHook.states.customers,
                            customersHook.states.setCustomers,
                            customersHook.states.customersFiltered,
                            customersHook.states.setCustomersFiltered,
                            resetUpdateCustomerModal,
                            clearUpdateErrors,
                            customersHook.states.setCurrentSelectedCustomerProjects,
                            customersHook.states.onCloseUpdate,
                            customersHook.states.toast
                        ))}>
                            <ModalHeader>{customersHook.states.selectedCustomer.name}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Flex
                                    alignItems='center'
                                    justifyContent='center'>
                                    <WrapItem
                                        position='relative' role='group'>
                                        <Avatar
                                            border='2px solid red'
                                            size='2xl'
                                            name={customersHook.states.selectedCustomer?.name}
                                            src={customersHook.states.selectedCustomer?.image_url}
                                            _hover={{
                                            transform: 'scale(1.05)',
                                            borderColor: 'blue.500',
                                            boxShadow: 'xl'
                                            }} />
                                        <Box
                                            position='absolute'
                                            top={0}
                                            left={0}
                                            width='100%'
                                            height='100%'
                                            borderRadius='full'
                                            bg='blackAlpha.600'
                                            opacity={0}
                                            transition='opacity 0.3s ease-in-out'
                                            pointerEvents='none'
                                            _groupHover={{
                                                opacity: 1
                                            }}
                                        />

                                         <Box
                                            position='absolute'
                                            top='50%'
                                            left='50%'
                                            transform='translate(-50%, -50%)'
                                            opacity={0}
                                            transition='opacity 0.3s ease-in-out'
                                            pointerEvents='none'
                                            zIndex={1}
                                            _groupHover={{
                                                opacity: 1
                                            }}
                                            >
                                            <Icon as={FiCamera} color='white' boxSize={8} />
                                        </Box>

                                        <FormLabel
                                            cursor='pointer'
                                            htmlFor='customer_image'
                                            position='absolute'
                                            height={'100%'}
                                            width={'100%'}
                                            borderRadius='full'
                                            m={0}
                                            zIndex={2}>
                                            <ChakraInput
                                                display='none'
                                                id='customer_image'
                                                type='file'
                                                onChange={(e) => customersHook.handles.handleImageUpdate(e, 
                                                    customersHook.states.selectedCustomer, 
                                                    customersHook.states.customers, 
                                                    customersHook.states.setCustomers, 
                                                    customersHook.states.setSelectedCustomer, 
                                                    customersHook.states.toast)} />
                                        </FormLabel>
                                    </WrapItem>
                                </Flex>
                                <Flex
                                    flexDir={'column'}
                                    gap={6}>
                                    <Flex flexDir="column"
                                        gap={6}
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                        mt={4}>                
                                    <Input
                                        maxLength={50}
                                        label="Nome do cliente"
                                        error={formStateUpdate.errors.name}
                                        {...registerUpdateCustomer('name')}
                                    />
                                    </Flex>
                                    <Flex flexDirection='column'
                                        gap={4} 
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                    >
                                        <Heading size="md" mb={2} color="gray.700" display="flex" alignItems="center" >
                                             Informações do contrato
                                        </Heading>
                                        <Flex flexDir='column' gap='15px'>
                                            <Flex display="flex" gap={10}>
                                                <FormControl>
                                                    <FormLabel htmlFor='hired-hours'>Horas contratadas</FormLabel>
                                                    <NumberInput
                                                        size='md'
                                                        width={'100px'}
                                                        defaultValue={customersHook.states.selectedCustomer.hired_hours}
                                                        onChange={(value) => setValueUpdate('hired_hours', value)}
                                                        min={0}
                                                        max={9999}>
                                                        <NumberInputField id='hired-hours' {...registerUpdateCustomer('hired_hours')} />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </FormControl>
                                                <FormControl>
                                                    <Box maxW={'max-content'}>
                                                        <FormLabel htmlFor='keep-on'>Status</FormLabel>
                                                        <Popover
                                                            onOpen={customersHook.states.onOpenCustomerStatus}
                                                            onClose={customersHook.states.onCloseCustomerStatus}
                                                            returnFocusOnClose={false}
                                                            isOpen={customersHook.states.isOpenCustomerStatus}
                                                            placement='bottom'
                                                            closeOnBlur={true} >
                                                            <PopoverTrigger>
                                                                <Button
                                                                    onClick={() => customersHook.utils.loadCurrentCustomerProjectsToShowAtStatus(customersHook.states.currentSelectedCustomerProjects,
                                                                    customersHook.states.selectedCustomer,
                                                                    customersHook.states.currentSelectedCustomerStatus,
                                                                    customersHook.states.setCurrentSelectedCustomerProjects)}
                                                                    rightIcon={<HiOutlineExclamationCircle />}
                                                                    colorScheme={customersHook.states.currentSelectedCustomerStatus ? 'blue' : 'red'}>
                                                                    {customersHook.states.currentSelectedCustomerStatus ? 'ATIVO' : 'INATIVO'}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                <PopoverArrow />
                                                                <PopoverCloseButton />
                                                                {customersHook.states.currentSelectedCustomerProjects?.isLoading ? (
                                                                    <>
                                                                        <PopoverHeader>
                                                                            <Flex direction='column' gap='10px' mr='20px'>
                                                                                Desativar este cliente?
                                                                            </Flex>
                                                                        </PopoverHeader>
                                                                        <PopoverBody display='flex' justifyContent='center' alignItems='center'>
                                                                            <Spinner size='md' />
                                                                        </PopoverBody>
                                                                        <PopoverFooter display='flex' justifyContent={'flex-end'}>
                                                                            <Button disabled>Desativar</Button>
                                                                        </PopoverFooter>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <PopoverHeader>
                                                                            <Flex direction='column' gap='10px' mr='20px'>
                                                                                <Text fontSize='18px'>
                                                                                    {customersHook.states.currentSelectedCustomerStatus ? `Desativar este cliente?` : `Ativar este cliente?`}
                                                                                </Text>
                                                                            </Flex>
                                                                        </PopoverHeader>
                                                                        <PopoverBody>
                                                                            <Text>
                                                                                {customersHook.states.currentSelectedCustomerStatus ? (
                                                                                    customersHook.states.currentSelectedCustomerProjects?.projects.length === 0 ?
                                                                                        `O cliente não tem nenhum projeto em andamento, portanto sua desativação não impactará em nenhum projeto.`
                                                                                        :
                                                                                        `Este cliente tem ${customersHook.states.currentSelectedCustomerProjects?.projects.length} projeto(s) em andamento, em caso afirmativo, os projetos serão marcados como concluídos e arquivados.`
                                                                                ) :
                                                                                    `O cliente irá ser ativado, e poderão ser criados novos projetos para o mesmo.`
                                                                                }
                                                                            </Text>
                                                                        </PopoverBody>
                                                                        <PopoverFooter display='flex' justifyContent={'flex-end'}>
                                                                            <Button
                                                                                onClick={() => {
                                                                                    customersHook.states.setCurrentSelectedCustomerStatus(!customersHook.states.currentSelectedCustomerStatus)
                                                                                    customersHook.states.onCloseCustomerStatus()
                                                                                }}
                                                                                colorScheme={!customersHook.states.currentSelectedCustomerStatus ? 'blue' : 'red'}>
                                                                                {customersHook.states.currentSelectedCustomerStatus ? 'DESATIVAR' : 'ATIVAR'}
                                                                            </Button>
                                                                        </PopoverFooter>
                                                                    </>
                                                                )}
                                                            </PopoverContent>
                                                        </Popover>
                                                    </Box>
                                                </FormControl>
                                            </Flex>
                                            <Flex justifyContent='space-between' gap={10}>
                                                <FormControl>
                                                    <Controller
                                                    control={controlUpdate}
                                                    name="start_contract_time"
                                                    render={({ field: { onChange, value } }) => (
                                                        <InputDate
                                                        label='Início do contrato'
                                                        dateFormat="dd/MM/yyyy"
                                                        locale={ptBR}
                                                        onChange={onChange}
                                                        onBlur={onChange}
                                                        selected={value}
                                                        />
                                                    )}
                                                    />
                                                    {formStateUpdate.errors.start_contract_time && (
                                                    <FormControl>
                                                        <Text color="red.500" fontSize="sm">
                                                        {String(formStateUpdate.errors.start_contract_time.message || 'Erro de validação')}
                                                        </Text>
                                                    </FormControl>
                                                    )}
                                                </FormControl>
                                                
                                                <FormControl>
                                                    <Controller
                                                    control={controlUpdate}
                                                    name="end_contract_time"
                                                    render={({ field: { onChange, value } }) => (
                                                        <InputDate
                                                        label='Fim do contrato'
                                                        dateFormat="dd/MM/yyyy"
                                                        locale={ptBR}
                                                        onChange={onChange}
                                                        onBlur={onChange}
                                                        selected={value}
                                                        />
                                                    )}
                                                    />
                                                    {formStateUpdate.errors.end_contract_time && (
                                                    <FormControl>
                                                        <Text color="red.500" fontSize="sm">
                                                        {String(formStateUpdate.errors.end_contract_time.message || 'Erro de validação')}
                                                        </Text>
                                                    </FormControl>
                                                    )}
                                                </FormControl>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Flex flexDirection='column' 
                                        gap={4}
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                        >
                                        <Heading size="md" mb={2} color="gray.700" display="flex" alignItems="center">
                                             Informações do projeto
                                        </Heading>
                                        <Input
                                            maxLength={50}
                                            label='Perfil do colaborador'
                                            placeholder=''
                                            error={formStateUpdate.errors.resource_profile}
                                            {...registerUpdateCustomer('resource_profile')} />
                                        <Input
                                            maxLength={50}
                                            label='Objetivo do projeto'
                                            placeholder=''
                                            error={formStateUpdate.errors.objective}
                                            {...registerUpdateCustomer('objective')} />
                                    </Flex>
                                    <Flex flexDirection='column' 
                                        gap={4}
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                        >
                                        <Heading size="md" mb={2} color="gray.700" display="flex" alignItems="center">
                                             Informações do responsável
                                        </Heading>
                                        <Flex gap={5}>
                                            <Input
                                                maxLength={50}
                                                label="Nome"
                                                error={formStateUpdate.errors.responsible_name}
                                                {...registerUpdateCustomer('responsible_name')}
                                            />
                                            <Input
                                                maxLength={50}
                                                as={InputMask}
                                                maskChar={null}
                                                mask="+99 (99) 99999-9999"
                                                label="Telefone"
                                                placeholder="+99 (99) 99999-9999"
                                                error={formStateUpdate.errors.responsible_phone}
                                                defaultValue={customersHook.states.selectedCustomer.responsible_phone || ""}
                                                {...registerUpdateCustomer('responsible_phone')}
                                            />
                                        </Flex>
                                        <Input
                                                maxLength={50}
                                                label="E-maill"
                                                placeholder="E-mail do responsável"
                                                error={formStateUpdate.errors.responsible_email}
                                                {...registerUpdateCustomer('responsible_email')}
                                        />
                                    </Flex>
                                </Flex>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant='ghost' mr={3} onClick={customersHook.states.onCloseUpdate}>
                                    Cancelar
                                </Button>
                                <Button type='submit' colorScheme='blue' disabled={customersHook.states.isLoadingUpdating}>{customersHook.states.isLoadingUpdating ? <Spinner /> : 'Atualizar'}</Button>
                            </ModalFooter>
                        </Box>
                    </ModalContent>
                </Modal>
                <Modal isOpen={customersHook.states.isOpenView} onClose={() => customersHook.utils.onCloseCustomerView( customersHook.states.history, customersHook.states.onCloseView)}>
                    <ModalOverlay />
                    <ModalContent>
                        <Box>
                            <ModalHeader mr={35}>{customersHook.states.selectedCustomer.name}</ModalHeader>
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
                                            name={customersHook.states.selectedCustomer?.name}
                                            src={customersHook.states.selectedCustomer?.image_url} />
                                    </WrapItem>
                                </Flex>
                                <Flex
                                    flexDir={'column'}
                                    gap={4}>
                                    <Flex flexDirection='column' 
                                        gap={4}
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                        mt={4}>
                                        <FormControl>
                                            <FormLabel fontWeight={600}>Nome do cliente</FormLabel>
                                            <Text>{customersHook.states.selectedCustomer.name}</Text>
                                        </FormControl>
                                    </Flex>    
                                    <Flex flexDirection='column' 
                                        gap={4}
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                        mt={2}>
                                            <Heading size="md" mb={2} color="gray.700" display="flex" alignItems="center" >
                                             Informações do contrato
                                            </Heading>
                                        <Flex>
                                            <FormControl>
                                                <FormLabel fontWeight={600}>Horas contratadas</FormLabel>
                                                <Text>{customersHook.states.selectedCustomer.hired_hours}</Text>
                                            </FormControl>
                                            <FormControl>
                                                <Box maxW={'max-content'}>
                                                    <FormLabel fontWeight={600}>Status</FormLabel>
                                                    <Text>{customersHook.states.currentSelectedCustomerStatus ? 'ATIVO' : 'INATIVO'}</Text>
                                                </Box>
                                            </FormControl>
                                        </Flex>
                                        <Flex>
                                            <FormControl>
                                                <FormLabel fontWeight={600}>Início do contrato</FormLabel>
                                                {customersHook.states.selectedCustomer.start_contract_time && (
                                                    <Text>{format(customersHook.states.selectedCustomer.start_contract_time, 'dd/MM/yyyy')}</Text>
                                                )}
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontWeight={600}>Fim do contrato</FormLabel>
                                                {customersHook.states.selectedCustomer.end_contract_time && (
                                                    <Text>{format(customersHook.states.selectedCustomer.end_contract_time, 'dd/MM/yyyy')}</Text>
                                                )}
                                            </FormControl>
                                        </Flex>
                                    </Flex>
                                    <Flex flexDirection='column' 
                                        gap={4}
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                        mt={2}>
                                        <Heading size="md" mb={2} color="gray.700" display="flex" alignItems="center">
                                             Informações do projeto
                                        </Heading>
                                        <FormControl>
                                            <FormLabel fontWeight={600}>Perfil do colaborador</FormLabel>
                                            <Text>{customersHook.states.selectedCustomer.resource_profile}</Text>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel fontWeight={600}>Objetivo do projeto</FormLabel>
                                            <Text>{customersHook.states.selectedCustomer.objective}</Text>
                                        </FormControl>
                                    </Flex>
                                    <Flex flexDirection='column' 
                                        gap={4}
                                        p={6}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        boxShadow="md"
                                        bg="white"
                                        mt={2}>
                                        <Heading size="md" mb={2} color="gray.700" display="flex" alignItems="center">
                                             Informações do responsável
                                        </Heading>
                                        <Flex gap={4}>
                                            <FormControl>
                                                <FormLabel fontWeight={600}>Nome</FormLabel>
                                                <Text>{customersHook.states.selectedCustomer.responsible_name}</Text>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontWeight={600}>Telefone</FormLabel>
                                                <Text>{customersHook.states.selectedCustomer.responsible_phone}</Text>
                                            </FormControl>
                                        </Flex>
                                        <FormControl>
                                            <FormLabel fontWeight={600}>E-mail</FormLabel>
                                            <Text>{customersHook.states.selectedCustomer.responsible_email}</Text>
                                        </FormControl>
                                    </Flex>
                                </Flex>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant='ghost' mr={3} onClick={() => customersHook.utils.onCloseCustomerView( customersHook.states.history, customersHook.states.onCloseView)}>
                                    Fechar
                                </Button>
                            </ModalFooter>
                        </Box>
                    </ModalContent>
                </Modal>
            </S.Container >
        </>
    )
}

export default Customers