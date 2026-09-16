import { FaCamera } from 'react-icons/fa';
//import { useEffect, useState } from 'react'
import { useEffect, useState, useRef } from 'react'
import { Avatar, Button, Flex, Skeleton, Text, useToast, Box } from '@chakra-ui/react'

import { BiWindows } from 'react-icons/bi'
import { IoMdSettings } from 'react-icons/io'
import { MdInfoOutline, MdOutlineFeedback } from 'react-icons/md'
import { TiHome } from 'react-icons/ti'
import { RiChatNewLine } from 'react-icons/ri'


import * as S from './styles'
import { api } from '../../services/api'
import Header from '../../components/Header'
import { useAuth } from '../../context/AuthContext'


interface ResourceProps {
    id: number
    name: string
    email: string
    photo_url: string
    resourceClassification: {
        classification: {
            description: string
        }
    }
}

interface ResourceProfileProps {
    children: React.ReactNode
}

const MyProfile = ({ children }: ResourceProfileProps) => {
    const { user } = useAuth()

    //const toast = useToast()
    const toast = useToast()
    const fileInputRef = useRef<HTMLInputElement>(null) // Referência para o input file

    const [loadingResource, setLoadingResource] = useState(true)
    const [resource, setResource] = useState<ResourceProps>()
    //const [resourceExists, setResourceExists] = useState(true) 
    const [resourceExists, setResourceExists] = useState(true) 
    const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false) //

     // Função para acionar o input file
    const handleEditPhotoClick = () => {
        fileInputRef.current?.click()
    }

    // Função para lidar com a mudança de foto
    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setIsUpdatingPhoto(true)
            
            // Criar FormData para enviar o arquivo
            const formData = new FormData()
            formData.append('photo', file)

            // Enviar para a API
            const response = await api.patch(`/resources/${user.id}/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            // Atualizar a foto exibida
            setResource(prev => ({
                ...prev!,
                photo_url: `${response.data.photo_url}?${Date.now()}` // Adiciona timestamp para evitar cache
            }))

            toast({
                title: 'Foto atualizada com sucesso!',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        } catch (err) {
            toast({
                title: 'Erro ao atualizar foto',
                description: 'Tente novamente mais tarde',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
        } finally {
            setIsUpdatingPhoto(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = '' // Limpa o input para permitir nova seleção
            }
        }
    }

    // ... useEffect permanece o mesmo ...

    useEffect(() => {
        async function loadResource() {
            try {
                const response = await api.get(`/resources/${user.id}/simple-profile`)
                setResource(response.data)
                //console.log(response.data)
            } catch (err: any) {
                if (err.response.status === 404) {
                    setResourceExists(false)
                } else {
                    toast({
                        title: 'Erro ao carregar dados do colaborador',
                        status: 'error',
                        duration: 4000,
                        isClosable: true
                    })
                }
            }

            setLoadingResource(false)
        }

        loadResource()
    }, [user.id, toast])

    return (
        <>
            <Header buttons={[
                {
                    createPermissions: [],
                    title: 'Criar feedback',
                    showCreateButton: false
                }
            ]} />
            <Flex direction={'column'}>
                <S.BackgroundContainer />
                {resourceExists ? (
                    <S.Teste>
                        <S.BackgroundProfile>
                            {loadingResource ? (
                                <>
                                    <Flex gap={'10px'}>
                                        <Skeleton height='100px' width='100px' borderRadius='10px' />
                                        <Flex justifyContent={'center'} direction='column' gap='10px'>
                                            <Skeleton height='20px' width='200px' />
                                            <Skeleton height='20px' width='200px' />
                                        </Flex>
                                    </Flex>
                                </>
                            ) : (
                                <S.ProfileContainer>
                                    <Box className="image-container" 
                                    position="relative">
                                        <Avatar
                                            height={'100px'}
                                            width={'100px'}
                                            size='2xl'
                                            src={resource?.photo_url}
                                            name={resource?.name}
                                            borderRadius='10px'
                                            />
                                        <Button
                                            className="edit-button"
                                            size="xs"
                                            position="absolute"
                                            bottom="5px"
                                            right="5px"
                                            onClick={handleEditPhotoClick}
                                            isLoading={isUpdatingPhoto}
                                            >
                                                <FaCamera size={24}/>
                                        </Button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handlePhotoChange}
                                            />
                                    </Box>
                                    <Flex direction={'column'} gap='4px' ml='15px'>
                                        <Text fontSize='22px' fontWeight={700}>{resource?.name}</Text>
                                        <Text fontSize='17px' color='#797979'>{resource?.resourceClassification.classification.description}</Text>
                                    </Flex>
                                </S.ProfileContainer>
                            )}
                            <S.MenuContainer>
                                <S.MenuItem to={`/meu-perfil/`} exact activeClassName='profile-menu-active'>
                                    <TiHome size={20} color='#254568' />Perfil
                                </S.MenuItem>
                                <S.MenuItem to={`/meu-perfil/projetos`} activeClassName='profile-menu-active'>
                                    <BiWindows size={20} color='#254568' />Projetos
                                </S.MenuItem>
                                <S.MenuItem to={`/meu-perfil/feedbacks`} activeClassName='profile-menu-active'>
                                    <MdOutlineFeedback size={20} color='#254568' />Feedbacks
                                </S.MenuItem>
                                <S.MenuItem to={`/meu-perfil/one-on-one`} activeClassName='profile-menu-active'>
                                    <RiChatNewLine size={20} color='#254568' />One-on-One
                                </S.MenuItem>
                                <S.MenuItem to={`/meu-perfil/skills`} activeClassName='profile-menu-active'>
                                    <IoMdSettings size={20} color='#254568' />Skills
                                </S.MenuItem>
                                <S.MenuItem to={`/meu-perfil/informacoes`} activeClassName='profile-menu-active'>
                                    <MdInfoOutline size={20} color='#254568' />Informações
                                </S.MenuItem>
                            </S.MenuContainer>
                        </S.BackgroundProfile>
                        {resource && (
                            <Flex width='100%' bgColor='#fff' padding='20px' borderRadius='10px'>
                                {children}
                            </Flex>
                        )}
                    </S.Teste>
                ) : (
                    <Text>Recurso não EXISTE</Text>
                )}
            </Flex>
        </>
    )
}

export default MyProfile