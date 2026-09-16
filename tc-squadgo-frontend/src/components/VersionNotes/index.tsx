import { useState, useEffect } from 'react'
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip
} from '@chakra-ui/react'
import { FaBook } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'

import { v4 } from 'uuid'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import * as S from './styles'
import { api } from '../../services/api'
import Input from '../Forms/Input'
import { Link } from 'react-router-dom'
import { HasPermission } from '../HasPermission'

interface FiltersProps {
  totalVersionNotes: number,
  current_page: number,
  last_page: number,
  data: VersionNoteProps[]
}

interface VersionNoteProps {
  id: number
  uuid: string
  title: string
  link: string
  number: string
}

const VersionNotes: React.FC = () => {
  const toast = useToast()
  const [filters, setFilters] = useState<Omit<FiltersProps, 'data'>>({
    totalVersionNotes: 0,
    current_page: 1,
    last_page: 1
  })
  const [versionNotes, setVersionNotes] = useState<VersionNoteProps[]>([])
  const [versionNoteSelected, setVersionNoteSelected] = useState<VersionNoteProps>()
  const [isLoadingMore, setIsLoadingMore] = useState(true)
  const [isLoadingNew, setIsLoadingNew] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure()

  useEffect(() => {
    async function loadMoreVersionNotes() {
      setIsLoadingMore(true)
      const response = await api.get(`/version-notes?currentPage=${filters.current_page}`)
      const responseData = response.data
      const { current_page, last_page, totalVersionNotes } = responseData
      const versionNotesFormatted = responseData.data.map((vd: VersionNoteProps) => {
        return {...vd, uuid: v4()}
      })
      setFilters({ current_page, last_page, totalVersionNotes})
      setVersionNotes(old => { return [...old, ...versionNotesFormatted] })
      setIsLoadingMore(false)
    }

    loadMoreVersionNotes()
  }, [filters.current_page])

  const newVersionNoteSchema = yup.object({
    title: yup.string()
      .trim()
      .min(3, 'Deve ter no mínimo 3 caracteres válidos')
      .max(40, 'Deve ter até 40 caracteres')
      .matches(/^[a-zA-ZÀ-ÿ0-9 _#-]+$/, "Descrição contém caracteres inválidos")
      .required('Título é obrigatório'),
    link: yup.string()
      .trim()
      .matches(
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Link inválido'
      )
      .min(3, 'Deve ter no mínimo 3 caracteres válidos')
      .max(500, 'Deve ter até 500 caracteres')
      .required('Link é obrigatório'),
    number: yup.string()
      .trim()
      .min(1, 'Deve ter no mínimo 1 caracter válido')
      .max(15, 'Deve ter até 15 caracteres')
      .matches(/^[a-zA-ZÀ-ÿ0-9 _#.-]+$/, "Número da versão contém caracteres inválidos")
      .required('Versão é obrigatória'),
  }).required();

const {
    register,
    handleSubmit,
    formState,
    reset,
    clearErrors
} = useForm({ resolver: yupResolver(newVersionNoteSchema) })

const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: formStateUpdate,
    reset: resetUpdate,
    clearErrors: clearErrorsUpdate
} = useForm({ resolver: yupResolver(newVersionNoteSchema) })

  async function loadMoreNotifications() {
    setFilters(old => {
      return { ...old, current_page: old.current_page + 1 }
    })
  }

  function closeModal() {
    clearErrors()
    reset()
    onClose()
  }

  function closeModalUpdate() {
    clearErrorsUpdate()
    resetUpdate()
    onCloseUpdate()
  }

  function selectVersionNote(versionNote: VersionNoteProps) {
    setVersionNoteSelected(versionNote)
    onOpenUpdate()
  }

  async function handleCreateVersionNote(data: any) {
    setIsLoadingNew(true)
    try {
      const response = await api.post(`/version-notes`, data)
      const versionNoteCreated = response.data as VersionNoteProps
      console.log(versionNoteCreated)
      setVersionNotes(old => { return [ versionNoteCreated, ...old ]})
      toast({
        title: 'Nota de versão criada com sucesso!',
        status: 'success',
        duration: 4000,
        isClosable: true
    })
    closeModal()
    setIsLoadingNew(false)
    } catch(err) {
      toast({
        title: 'Erro ao tentar criar nota de versão',
        status: 'error',
        duration: 4000,
        isClosable: true
    })
    }
  }

  async function handleUpdateVersionNote(data: any) {
    setIsLoadingUpdate(true)
    if(versionNoteSelected) {
      try {
        const response = await api.put(`/version-notes/${versionNoteSelected.id}`, data)
        const versionNoteUpdate = response.data as VersionNoteProps
        const oldVersions = [...versionNotes]
        const versionIndex = oldVersions.findIndex(v => v.id === versionNoteSelected.id)
        oldVersions[versionIndex] = versionNoteUpdate
        setVersionNotes(oldVersions)

        closeModalUpdate()

        toast({
          title: 'Nota de versão atualizada com sucesso!',
          status: 'success',
          duration: 4000,
          isClosable: true
      })
      closeModal()
      setIsLoadingUpdate(false)
      } catch(err) {
        toast({
          title: 'Erro ao atualizar nota de versão',
          status: 'error',
          duration: 4000,
          isClosable: true
      })
      }
    }
  }

  return (
    <>
      <Popover>
        <Tooltip hasArrow label={'Notas da Versão'} fontWeight={100} bg='#43628B'>
          <Box display="inline-block">
            <PopoverTrigger>
              <S.ActionButton>
                <FaBook size={22} color='#F2F2F2' />
              </S.ActionButton>
            </PopoverTrigger>
          </Box>
        </Tooltip>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader display='flex' justifyContent='center'>
            <Text fontSize='20px'>Notas da versão</Text>
          </PopoverHeader>
          <PopoverBody maxHeight='400px' overflowY='auto'>
              <Flex flexDirection={'column'}>
                <HasPermission permissions={['create_version_note']}>
                  <Button
                    width='max-content'
                    fontSize={'14px'}
                    height='25px'
                    alignSelf={'end'}
                    marginTop={'10px'}
                    onClick={() => onOpen()}>
                        Criar nova versão
                  </Button>
                </HasPermission>
                {versionNotes.length > 0 ? (
                  <>
                    {versionNotes.map((n) => (
                      <Flex
                        key={n.uuid}
                        gap='5px'
                        padding='10px'
                        borderBottom='1px solid #ccc'
                        flexDirection='column'>
                        <Text fontSize='14px' color='#919191'>{n.number}</Text>
                        <Flex alignItems={'center'}>
                          <Link to={{ pathname: `https://${n.link}` }} target="_blank">
                            {n.title}
                          </Link>
                          <HasPermission permissions={['update_version_note']}>
                            <S.ActionButton onClick={() => selectVersionNote(n)}>
                              <FiEdit size={20}/>
                            </S.ActionButton>
                          </HasPermission>
                        </Flex>
                      </Flex>
                    ))}
                    {(versionNotes.length < filters.totalVersionNotes)
                      &&
                      (filters.current_page <= filters.last_page) && (
                        <Button disabled={isLoadingMore} marginTop={'10px'} onClick={() => loadMoreNotifications()}>
                          <>
                            {isLoadingMore ? (
                              <Spinner size='sm' />
                            ) : (
                              <>Carregar mais...</>
                            )}
                          </>
                        </Button>
                      )}
                      </>
                ) : (
                  <Text mt='10px'>Não há notas da versão</Text>
                )}
              </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover >
      <Modal isOpen={isOpen} onClose={() => closeModal()}>
          <ModalOverlay />
          <ModalContent>
              <Box as='form' onSubmit={handleSubmit(handleCreateVersionNote)}>
                  <ModalHeader>Nova Nota de Versão</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                      <Flex
                          flexDir={'column'}
                          gap={4}>
                          <Input
                              label='Descrição'
                              placeholder='Nova feature...'
                              error={formState.errors.title}
                              {...register('title')} />
                          <Input
                              label='Link'
                              placeholder='www.documentacao.testingcompany...'
                              error={formState.errors.link}
                              {...register('link')} />
                          <Input
                              label='Versão'
                              placeholder='v1.5'
                              error={formState.errors.number}
                              {...register('number')} />
                      </Flex>
                  </ModalBody>
                  <ModalFooter>
                      <Button
                          variant='ghost'
                          mr={3}
                          onClick={closeModal}
                          disabled={isLoadingNew}>Cancelar</Button>
                      <Button type='submit' colorScheme='blue' disabled={isLoadingNew}>{isLoadingNew ? <Spinner /> : 'Salvar'}</Button>
                  </ModalFooter>
              </Box>
          </ModalContent>
      </Modal>
      <Modal isOpen={isOpenUpdate} onClose={() => closeModalUpdate()}>
          <ModalOverlay />
          <ModalContent>
              <Box as='form' onSubmit={handleSubmitUpdate(handleUpdateVersionNote)}>
                  {versionNoteSelected && (
                    <>
                      <ModalHeader mr={35}>Atualizar {versionNoteSelected.title}</ModalHeader>
                      <ModalCloseButton width={'25px'} height={'25px'} />
                      <ModalBody>
                          <Flex
                              flexDir={'column'}
                              gap={4}>
                              <Input
                                  defaultValue={versionNoteSelected.title}
                                  label='Descrição'
                                  placeholder='Nova feature...'
                                  error={formStateUpdate.errors.title}
                                  {...registerUpdate('title')} />
                              <Input
                                  defaultValue={versionNoteSelected.link}
                                  label='Link'
                                  placeholder='www.documentacao.testingcompany...'
                                  error={formStateUpdate.errors.link}
                                  {...registerUpdate('link')} />
                              <Input
                                  defaultValue={versionNoteSelected.number}
                                  label='Versão'
                                  placeholder='v1.5'
                                  error={formStateUpdate.errors.number}
                                  {...registerUpdate('number')} />
                          </Flex>
                      </ModalBody>
                      <ModalFooter>
                          <Button
                              variant='ghost'
                              mr={3}
                              onClick={closeModalUpdate}
                              disabled={isLoadingUpdate}>Cancelar</Button>
                          <Button type='submit' colorScheme='blue' disabled={isLoadingUpdate}>{isLoadingUpdate ? <Spinner /> : 'Atualizar'}</Button>
                      </ModalFooter>
                    </>
                  )}
              </Box>
          </ModalContent>
      </Modal>
    </>
  )
}

export default VersionNotes