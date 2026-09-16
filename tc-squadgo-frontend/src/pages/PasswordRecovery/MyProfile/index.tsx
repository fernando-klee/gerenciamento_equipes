import { Box, Button, Flex, Image, InputGroup, InputLeftElement, InputRightElement, Stack, Text, useToast } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import * as yup from 'yup'

import Input from "../../../components/Forms/Input"
import Header from "../../../components/Header"
import { useAuth } from "../../../context/AuthContext"
import { api } from "../../../services/api"
import PasswordImage from "../../assets/PasswordImage.svg"
import PersonCircle from '../../assets/PersonCircle.svg'
import VerifyIconBlue from '../../assets/VerifyIconBlue.svg'
import PersonProfileInput from '../../assets/PersonProfileInput.svg'
import EmailProfileInput from '../../assets/EmailProfileInput.svg'
import PasswordProfileInput from '../../assets/PasswordProfileInput.svg'

import * as S from './styles'
import { IoPersonCircle } from "react-icons/io5"
import { useState } from "react"
import { Wrapper } from "../../_layouts/default/styles"

const MyProfile: React.FC = () => {
    const toast = useToast()
    const { user, updateUser, singOut } = useAuth()
    const [successMessage2, setSuccessMessage2] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    const schema = yup.object({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().required('E-mail é obrigatório').email('E-mail é inválido'),
    }).required()

    const schemaPassword = yup.object({
        password: yup.string().trim()
            .min(6, 'Senha deve ter entre 6 e 10 caracteres')
            .max(10, 'Senha deve ter entre 6 e 10 caracteres')
            .required('Senha atual é obrigatória'),
        newPassword: yup.string().trim()
            .when('password', (password, newPassword) =>
                password ? newPassword
                    .min(6, 'Nova senha deve ter entre 6 e 10 caracteres')
                    .max(10, 'Nova senha deve ter entre 6 e 10 caracteres')
                    .required('Nova senha é obrigatória') : newPassword),
        confirmation: yup.string().trim()
            .when('newPassword', (newPassword, confirmation) =>
                newPassword ? confirmation.required('Confirmação de senha é obrigatória').oneOf([yup.ref('newPassword')], 'Confirmação deve ser igual a nova senha') : confirmation
            )
    }).required()

    const { handleSubmit, formState, register } = useForm({
        resolver: yupResolver(schema)
    })

    const { handleSubmit: handleSubmitPassword, formState: formStatePassword, register: registerPassword, reset: resetPassword } = useForm({
        resolver: yupResolver(schemaPassword),
        mode: 'onSubmit'
    })

    async function handleUpdateUser(values: any): Promise<void> {
        setSuccessMessage2(true)
        await updateUser(values)
    }

    async function handleUpdatePassword(values: any): Promise<void> {
        await api.put('/me/password', values)
            .then(res => {
                setSuccessMessage(true)
                resetPassword()
            })
            .catch(err => {
                toast({
                    title: 'Erro ao atualizar senha',
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                })
            })
    }
    

    return (
        <>
        <Header buttons={[]}/>
        <Flex flexDirection='column' gap='30px' padding={'5px 20px'}>
        <S.PanelsContainer>
                {user && (
                    <S.Content>
                        <Flex flexDir='column'>
                            <Text fontWeight={700} fontSize='18px' ml='80px' mb='30px'>Perfil</Text>
                            <Flex flexDir='row'>
                                <Flex justifyContent='center' width='45%'maxHeight='500px'>
                                    {user && (
                                        <Flex maxW='400px' alignItems='center' width='100%' justifyContent='center'>
                                            <Text maxWidth='140px' fontSize='35px' fontWeight={500} color='#333333' wordBreak='break-word'>Olá, {user.name.split(" ")[0]}!</Text>
                                        <S.ContainerImageLogo>
                                            <Image width='100%' ml='20px' maxWidth='150px' src={PersonCircle}></Image>
                                        </S.ContainerImageLogo>
                                        </Flex>
                                    )}
                                </Flex>
                                <S.Container>
                                    <Flex flexDir='column' width='80%'>
                                        <Flex
                                            onSubmit={(handleSubmit(handleUpdateUser))}
                                            as='form'
                                            width='100%'
                                            >
                                            <Flex flexDir='column' gap='52px' width='100%'>
                                            <S.ContainerInput>
                                                <Text fontSize='18px' textColor='rgba(51, 51, 51, 1)'>Como gostaria de ser chamado(a)?</Text>
                                                <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents='none'
                                                    children={<Image src={PersonProfileInput} pos='relative' right='10px'/>}
                                                />
                                                <Input
                                                    defaultValue={user.name}
                                                    variant='flushed'
                                                    bottom='4px'
                                                    pl='30px'
                                                    _placeholder={{color: '#B4B4B4', fontWeight: 'normal', fontsize: '12px'}}
                                                    placeholder='Digite seu nome completo'
                                                    borderColor='rgba(67, 98, 139, 0.59)'
                                                    borderBottomWidth='2px'
                                                    fontSize='14px'
                                                    error={formState.errors.name}
                                                    {...register('name')}
                                                />
                                                </InputGroup>
                                            </S.ContainerInput>
                                                <S.ContainerInput>
                                                    <Text fontSize='18px' textColor='rgba(51, 51, 51, 1)'>Email:</Text>
                                                    <InputGroup>
                                                    <InputLeftElement
                                                        pointerEvents='none'
                                                        children={<Image src={EmailProfileInput} pos='relative' right='10px'/>}
                                                    />
                                                    <Input
                                                        defaultValue={user.email}
                                                        variant='flushed'
                                                        bottom='4px'
                                                        pl='30px'
                                                        _placeholder={{color: '#B4B4B4', fontWeight: 'normal', fontsize: '12px' }}
                                                        placeholder='nome@testingcompany.com.br'
                                                        borderColor='rgba(67, 98, 139, 0.59)'
                                                        borderBottomWidth='2px'
                                                        fontSize='14px'
                                                        error={formState.errors.email}
                                                        {...register('email')}>
                                                    </Input>
                                                    </InputGroup>
                                                </S.ContainerInput>
                                            </Flex>
                                            <Flex flexDir='row-reverse' width='100%' alignItems='flex-end'>
                                            {
                                                !successMessage2 ? (
                                                    <Flex width='100%' maxWidth='110px'>
                                                        <Button type='submit' bgColor='#0052CC' color='white' _hover={{ bg: '#0065FF' }} borderRadius='11px' height='33px' width='140px' boxShadow='0px 4.411457061767578px 4.411457061767578px 0px #43628B36'>Salvar</Button>
                                                    </Flex>
                                            ) : (
                                                <>
                                                    <Flex width='40%' pos='relative' left='13px'>
                                                        <Flex flexDir='column' width='100%' justifyContent='center' alignItems='center'>
                                                            <Image pos='relative' left='4px' width='100%' maxWidth='50px' src={VerifyIconBlue}></Image>
                                                            <Text fontSize='16px' color='#0052CC'>Perfil atualizado!</Text>
                                                        </Flex>
                                                    </Flex>
                                                </>
                                            )
                                            }
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </S.Container>
                            </Flex>
                        </Flex>
                    </S.Content>
                )}
            </S.PanelsContainer>
            <S.PanelsContainer>
                {user && (
                    <S.Content>
                        <Flex flexDir='column'>
                            <Text fontWeight={700} fontSize='18px' ml='80px' mb='30px'>Senha</Text>
                            <Flex flexDir='row'>
                                <Flex justifyContent='center' width='45%' maxHeight='500px'>
                                    <S.ContainerImageLogo>
                                        <Image src={PasswordImage}></Image>
                                        <Text textColor='rgba(67, 98, 139, 1)' fontSize='15px' textAlign='center' width='40%'>Aumente a segurança da sua conta, utilize caracteres especiais, números e letras maiúsculas para criar sua senha</Text>
                                    </S.ContainerImageLogo>
                                </Flex>
                                <S.Container>
                                    <Flex flexDir='column' width='80%'>
                                        <Flex
                                            onSubmit={(handleSubmitPassword(handleUpdatePassword))}
                                            as='form'
                                            gap='52px'
                                            flexDir='column'
                                            >
                                            <Flex gap='25px'>
                                            <S.ContainerInput>
                                                <Text fontSize='18px' textColor='rgba(51, 51, 51, 1)'>Senha atual:</Text>
                                                <InputGroup>
                                                <InputLeftElement
                                                        pointerEvents='none'
                                                        children={<Image src={PasswordProfileInput} pos='relative' right='10px'/>}
                                                    />
                                                <Input
                                                    autoComplete="new-password"
                                                    variant='flushed'
                                                    bottom='4px'
                                                    pl='30px'
                                                    _placeholder={{color: '#B4B4B4', fontWeight: 'normal', fontsize: '12px' }}
                                                    placeholder='Digite sua senha atual'
                                                    borderColor='rgba(67, 98, 139, 0.59)'
                                                    borderBottomWidth='2px'
                                                    fontSize='14px'
                                                    type='password'
                                                    maxLength={10}
                                                    error={formStatePassword.errors.password}
                                                    {...registerPassword('password')}
                                                />
                                                </InputGroup>
                                            </S.ContainerInput>
                                            <S.ContainerInput>
                                                <Text fontSize='18px' textColor='rgba(51, 51, 51, 1)'>Nova senha:</Text>
                                                <InputGroup>
                                                <InputLeftElement
                                                        pointerEvents='none'
                                                        children={<Image src={PasswordProfileInput} pos='relative' right='10px'/>}
                                                    />
                                                <Input
                                                    variant='flushed'
                                                    bottom='4px'
                                                    pl='30px'
                                                    _placeholder={{color: '#B4B4B4', fontWeight: 'normal', fontsize: '12px' }}
                                                    placeholder='Digite sua senha atual'
                                                    borderColor='rgba(67, 98, 139, 0.59)'
                                                    borderBottomWidth='2px'
                                                    fontSize='14px'
                                                    type='password'
                                                    maxLength={10}
                                                    error={formStatePassword.errors.newPassword}
                                                    {...registerPassword('newPassword')}
                                                />
                                                </InputGroup>
                                            </S.ContainerInput>
                                            </Flex>
                                            <Flex flexDir='row' alignItems='flex-end' gap='30px'>
                                                <S.ContainerInput>
                                                    <Text fontSize='18px' textColor='rgba(51, 51, 51, 1)'>Confirme sua nova senha:</Text>
                                                    <InputGroup>
                                                    <InputLeftElement
                                                        pointerEvents='none'
                                                        children={<Image src={PasswordProfileInput} pos='relative' right='10px'/>}
                                                    />
                                                    <Input
                                                        bottom='4px'
                                                        pl='30px'
                                                        variant='flushed'
                                                        _placeholder={{color: '#B4B4B4', fontWeight: 'normal', fontsize: '12px' }}
                                                        placeholder='Digite sua senha atual'
                                                        borderColor='rgba(67, 98, 139, 0.59)'
                                                        borderBottomWidth='2px'
                                                        fontSize='14px'
                                                        type='password'
                                                        maxLength={10}
                                                        error={formStatePassword.errors.confirmation}
                                                        {...registerPassword('confirmation')}>
                                                    </Input>
                                                    </InputGroup>
                                                </S.ContainerInput>
                                                {
                                                    !successMessage ? (
                                                        <Flex width='100%' maxWidth='110px'>
                                                        <Button type='submit' bgColor='#0052CC' color='white' _hover={{ bg: '#0065FF' }} borderRadius='11px' height='33px' width='140px' boxShadow='0px 4.411457061767578px 4.411457061767578px 0px #43628B36'>Salvar</Button>
                                                        </Flex>
                                                    ):(
                                                        <>
                                                            <Flex flexDir='column' alignItems='center'>
                                                                <Image width='100%' maxWidth='50px' src={VerifyIconBlue}></Image>
                                                                <Text whiteSpace='nowrap' color='#0052CC'>Senha atualizada!</Text>
                                                            </Flex>
                                                        </>
                                                    )
                                                }
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </S.Container>
                            </Flex>
                        </Flex>
                    </S.Content>
                )}
            </S.PanelsContainer>
        </Flex>
        </>
    )
}

export default MyProfile