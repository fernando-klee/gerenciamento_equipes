import { Box, Button, Divider, Flex, Icon, Image, List, ListItem, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, Text, Tooltip } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useDisclosure, useOutsideClick } from "@chakra-ui/react"
import { IoMdPerson, IoMdSettings } from 'react-icons/io'

import * as S from './styles'
import VersionNotes from '../VersionNotes'
import Notifications from '../Notifications'
import MobileSidebar from '../MobileSidebar'
import { HasPermission } from '../HasPermission'
import CreateButton from '../Buttons/CreateButton'
import { IconType } from 'react-icons'
import LogoutMenu from '../../assets/LogoutMenu.svg'
import PerfilMenu from '../../assets/PerfilMenu.svg'
import ArrowMenu from '../../assets/ArrowMenu.svg'

interface ButtonProps {
    title?: string
    newIcon?: IconType
    onClick?: () => void
    showCreateButton?: boolean
    createPermissions: string[]
}

interface HeaderProps {
    buttons: ButtonProps[]
}

const Header = ({ buttons }: HeaderProps) => {
    const location = useLocation()
    const { user } = useAuth()

    const screenName = () => {
        const currentName = location.pathname.split('/')[1]
        switch (currentName) {
            case 'meu-perfil':
                return 'Meu Perfil'
            case 'dashboard':
                return 'Dashboard'
            case 'projetos':
                return 'Projetos'
            case 'clientes':
                return 'Clientes'
            case 'recursos':
                return 'Colaboradores'
            case 'usuarios':
                return 'Usuários'
            case 'hard-skills':
                return 'Hard Skills'
            case 'grupo-de-permissoes':
                return 'Grupo de Permissões'
            case 'skills':
                return 'Skills'
            case 'escalas':
                return 'Escalas'
            case 'visao-geral':
                return 'Visão Geral'
            default:
                return 'Portal'
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { singOut } = useAuth()

    return (
        <S.Container>
            <MobileSidebar />
            <Flex >
                <Flex direction={'column'} marginLeft={'8px'}>
                    <Text color={'#FAFFFF'} fontWeight={350}>SquadGO</Text>
                    <Text color={'#FAFFFF'} fontWeight={700}>{screenName()}</Text>
                </Flex>
            </Flex>
            {buttons.map((b, index) => (
                <HasPermission key={index} permissions={b.createPermissions}>
                    <CreateButton tooltipText={b.title} icon={b.newIcon} onClick={b.onClick} />
                </HasPermission>
            ))}
            <S.Profile>
                <HasPermission permissions={['view_version_note', 'create_version_note', 'update_version_note']}>
                    <VersionNotes />
                </HasPermission>
                <Notifications />
                <HasPermission permissions={['view_users', 'delete_user', 'create_user', 'update_user', 'view_roles', 'create_role', 'update_role', 'delete_role']}>
                    <Menu>
                        <Tooltip hasArrow label={'Configurações'} fontWeight={100} bg='#43628B'>
                            <Box display="inline-block">
                                <MenuButton
                                    as={S.ActionButton}
                                    width='40px'
                                    bgColor='transparent'
                                    borderRadius='50%'
                                    display='flex'
                                    justifyContent={'center'}
                                    alignItems='center'
                                    padding='0'>
                                    <IoMdSettings size={22} color='#F2F2F2' />
                                </MenuButton>
                            </Box>
                        </Tooltip>
                        <MenuList>
                            <HasPermission permissions={['view_users', 'delete_user', 'create_user', 'update_user']}>
                                <MenuItem to='/usuarios' as={Link}>Usuários</MenuItem>
                            </HasPermission>
                            <HasPermission permissions={['view_roles', 'create_role', 'update_role', 'delete_role']}>
                                <MenuItem to='/grupo-de-permissoes' as={Link}>Grupo de Permissões</MenuItem>
                            </HasPermission>
                        </MenuList>
                    </Menu>
                </HasPermission>
                <Menu isOpen={isOpen}>
                    {user && (
                        <Tooltip hasArrow
                            placement='bottom-start'
                            label={
                                <Stack spacing={0.1}>
                                    <Text fontWeight='bold'>SquadGO</Text>
                                    <Text>{user.name}</Text>
                                    <Text>{user.email}</Text>
                                </Stack>
                            }
                            fontWeight={100}
                            bg='#43628B'>
                            <MenuButton
                                as={S.ActionButton}
                                width='40px'
                                bgColor='transparent'
                                borderRadius='50%'
                                display='flex'
                                justifyContent={'center'}
                                alignItems='center'
                                padding='0'
                                onClick={onOpen}>
                                <IoMdPerson size={22} color='#F2F2F2' />
                            </MenuButton>
                        </Tooltip>
                    )}
                    <MenuList borderTopLeftRadius='10px' borderTopRightRadius='10px' padding='0' minH="0" minW='0' width='100px' height='100px' onClick={onOpen} onMouseLeave={onClose} bgColor='rgba(242, 242, 242, 0.14)' boxShadow='box-shadow: 0px 2.3343539237976074px 5.835885047912598px 0px rgba(0, 0, 0, 0.25)'>
                        <Image src={ArrowMenu} pos='relative' bottom='7px' left='73px'></Image>
                        <MenuItem borderTopLeftRadius='6px' borderTopRightRadius='6px' pos='relative' bottom='8px' marginBottom='-5px' to={`/meu-perfil`} as={Link} bgColor='#43628B' _focus={{ bg: '#254f85' }}>
                            <Flex mb='7px' mt='10px' gap='10px'>
                                <Image width='15px' src={PerfilMenu}></Image>
                                <Text pos='relative' left='8px' color='white'>Perfil</Text>
                            </Flex>
                        </MenuItem>
                        <Divider height='4px' borderColor='black' />
                        <MenuItem borderBottomLeftRadius='6px' borderBottomRightRadius='6px' pos='relative' bottom='7px' onClick={() => singOut()} bgColor='#43628B' _focus={{ bg: '#254f85' }}>
                            <Flex mt='7px' mb='10px' gap='10px'  >
                                <Image pos='relative' right='2px' width='25px' src={LogoutMenu}></Image>
                                <Text color='white'>Sair</Text>
                            </Flex>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </S.Profile>
        </S.Container>
    )
}

export default Header