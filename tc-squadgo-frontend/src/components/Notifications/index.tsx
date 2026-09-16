import { useState, useEffect, useMemo } from 'react'

import { Link } from 'react-router-dom'

import { v4 } from 'uuid'

import socketio from 'socket.io-client'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  Text,
  Tooltip,
  useToast,
  Spinner,
  Box
} from '@chakra-ui/react'
import { IoIosNotifications } from 'react-icons/io'

import * as S from './styles'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../services/api'

interface FiltersProps {
  totalNotifications: number,
  current_page: number,
  last_page: number,
  data: NotificationProps[]
}

interface NotificationProps {
  id: number
  uuid: string
  description: string
  created_at: string
  readed: boolean
  type: 'RESOURCES' | 'PROJECTS' | 'CUSTOMERS' | 'VERSION_NOTES' | null
  object_id: number | null
  link: string | null
}

const Notifications: React.FC = () => {
  const { user } = useAuth()
  const toast = useToast()
  const [filters, setFilters] = useState<Omit<FiltersProps, 'data'>>({
    totalNotifications: 0,
    current_page: 1,
    last_page: 1
  })
  const [notifications, setNotifications] = useState<NotificationProps[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(true)
  const [loadingReadNotification, setLoadingReadNotification] = useState(-1)
  const [loadingReadAllNotifications, setLoadingReadAllNotifications] = useState(false)

  const socket = useMemo(() => {
    return socketio(import.meta.env.VITE_API_BASE_URL ?? '', {
      auth: {
        user: {
          name: user.name
        }
      }
    })
  }, [user.name])

  useEffect(() => {
    socket.on(`notification-${user.id}`, (notification: NotificationProps) => {
      if (notification) {
        notification.uuid = v4(),
        notification.created_at = formatDate(notification.created_at)
        notification.link = notificationLink(notification.type, notification.object_id)
        setNotifications((oldNotifications: any) => [notification, ...oldNotifications])
      }
    })

    return () => {
      socket.close()
    }

  }, [socket, user.id])

  useEffect(() => {
    async function loadMoreNotifications() {
      setIsLoadingMore(true)
      const response = await api.get(`/notifications?currentPage=${filters.current_page}`)
      const responseData = response.data
      const notificationsFormatted = responseData.data.map((n: NotificationProps) => {
        return {
          ...n,
          uuid: v4(),
          link: notificationLink(n.type, n.object_id),
          created_at: formatDate(n.created_at)
        }
      })
      setFilters(responseData)
      setNotifications(old => { return [...old, ...notificationsFormatted] })
      setIsLoadingMore(false)
    }

    loadMoreNotifications()
  }, [filters.current_page])

  const hasNotificationsUnred = useMemo(() => {
    const contains = notifications.some(n => !n.readed)
    return contains
  }, [notifications])

  async function loadMoreNotifications() {
    setFilters(old => {
      return { ...old, current_page: old.current_page + 1 }
    })
  }

  async function readNotification(id: number) {
    setLoadingReadNotification(id)
    try {
      await api.patch(`/notifications/${id}`)

      const oldNotifications = [...notifications]
      const notificationIndex = oldNotifications.findIndex(on => on.id === id)
      const notificationUpdated = oldNotifications[notificationIndex]
      notificationUpdated.readed = true
      oldNotifications[notificationIndex] = notificationUpdated

      setNotifications(oldNotifications)

    } catch (err) {
      toast({
        title: 'Erro ao tentar ler notificação',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
    setLoadingReadNotification(-1)
  }

  async function readAllNotifications() {
    setLoadingReadAllNotifications(true)
    try {
      await api.post(`/notifications/read-all`)

      let oldNotifications = [...notifications]
      oldNotifications = oldNotifications.map(o => {
        return { ...o, readed: true }
      })

      setNotifications(oldNotifications)

    } catch (err) {
      toast({
        title: 'Erro ao tentar ler notificações',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
    setLoadingReadAllNotifications(false)
  }

  function formatDate(date: string) {
    return formatDistanceToNow(parseISO(date), { addSuffix: true, locale: ptBR })
  }

  function notificationLink(object_type: string | null, object_id: number | null): string | null {
    if(object_type === 'CUSTOMERS') return `/clientes?visualizar=${object_id}`
    else if(object_type === 'PROJECTS') return `/projetos?visualizar=${object_id}`
    else if (object_type === 'RESOURCES') return `/recursos/${object_id}`
    return null
  }

  return (
    <Popover>
      <Tooltip hasArrow label={'Notificações'} fontWeight={100} bg='#43628B'>
        <Box display="inline-block">
          <PopoverTrigger>
            <S.ActionButton hasUnread={hasNotificationsUnred}>
              <IoIosNotifications size={22} color='#F2F2F2' />
            </S.ActionButton>
          </PopoverTrigger>
        </Box>
      </Tooltip>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader display='flex' justifyContent='center'>
          <Text fontSize='20px'>Notificações</Text>
        </PopoverHeader>
        <PopoverBody maxHeight='400px' overflowY='auto'>
          {notifications.length > 0 ? (
            <Flex flexDirection={'column'}>
              {hasNotificationsUnred && (
                <Button
                  width='max-content'
                  fontSize={'14px'}
                  height='25px'
                  alignSelf={'end'}
                  disabled={loadingReadAllNotifications}
                  marginTop={'10px'}
                  onClick={() => readAllNotifications()}>
                  {loadingReadAllNotifications ? (
                    <Spinner />
                  ) : (
                    <>Marcar todas como lidas</>
                  )}
                </Button>
              )}

              {notifications.map((n) => (
                <Flex
                  key={n.uuid}
                  gap='5px'
                  padding='10px'
                  borderBottom='1px solid #ccc'
                  flexDirection='column'>
                  {!n.readed && (
                    <Tooltip label='Marcar como lido'>
                      <Tag
                        pointerEvents={loadingReadNotification === n.id ? 'none' : 'initial'}
                        cursor={loadingReadNotification === n.id ? 'initial' : 'pointer'}
                        borderRadius='full'
                        colorScheme='blue'
                        width='max-content'
                        onClick={() => readNotification(n.id)}>
                        {loadingReadNotification === n.id ? (
                          <Spinner size='sm' />
                        ) : (
                          <>Novo</>
                        )}
                      </Tag>
                    </Tooltip>
                  )}
                  {n.link ? (
                    <Link to={`${n.link}`}>{n.description}</Link>
                    ) : (
                    <Text>{n.description}</Text>
                  )}
                  <Text fontSize='14px' color='#919191'>{n.created_at}</Text>
                </Flex>
              ))}
              {(notifications.length < filters.totalNotifications)
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
            </Flex>
          ) : (
            <Text>Não há nenhuma notificação</Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover >
  )
}

export default Notifications