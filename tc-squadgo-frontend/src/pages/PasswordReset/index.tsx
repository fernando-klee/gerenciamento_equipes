import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Button, Flex, Image, Progress, Spinner, Text, useToast } from '@chakra-ui/react'

import * as S from './styles'
import Input from "../../components/Forms/Input"
import { api } from '../../services/api'
import Panel from '../../components/Panel'
import PanelLogin from '../../components/Panel/LoginScreen'
import LogoInferior from '../../assets/LogoInferior.svg'
import VerifyIcon from '../../assets/VerifyIcon.svg'
import LogoCompleta from '../../assets/logoLogin.svg'

interface ParamsProps {
    token: string
}

const PasswordReset: React.FC = () => {
    const history = useHistory()
    const { token } = useParams<ParamsProps>()
    const toast = useToast()
    const [isLoadingVerifyToken, setIsLoadingVerifyToken] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    useEffect(() => {
        async function checkingToken() {
            try {
                await api.get(`/password-recover/${token}`)
                setIsValid(true)
            } catch (err) { }
            setIsLoadingVerifyToken(false)
        }
        checkingToken()
    }, [token])

    const schemaPassword = yup.object({
        newPassword: yup.string()
            .min(6, 'Senha deve ter entre 6 e 10 caracteres')
            .max(10, 'Senha deve ter entre 6 e 10 caracteres')
            .required('Senha atual é obrigatória'),
        confirmation: yup.string()
            .when('newPassword', (newPassword, confirmation) =>
                newPassword ? confirmation.required('Confirmação de senha é obrigatória').oneOf([yup.ref('newPassword')], 'Confirmação deve ser igual a nova senha') : confirmation
            )
    }).required()

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schemaPassword)
    })

    async function handleUpdatePassword(values: any) {
        setIsLoading(true)
        const { newPassword } = values

        try {
            await api.patch(`/password-recover/${token}`, {
                password: newPassword
            })
            setSuccessMessage(true)
        } catch (err) {
            toast({
                title: 'Ocorreu um erro ao tentar atualizar senha',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
        }

        setIsLoading(false)
    }

    return (
        <Flex height='100vh' overflow={'hidden'}>
            <S.ImageBackground/>
            <S.ContainerImageBottom>
                <Image src={LogoInferior}></Image>
            </S.ContainerImageBottom>
            <S.Content>
            <S.ContainerImageLogo>
                <Image maxWidth={700} src={LogoCompleta} ml='150px'/>
            </S.ContainerImageLogo>
                <Flex
                    flex='1'
                    justify={'center'}
                    align={'center'}
                    height='100vh'>
                    <PanelLogin
                        title='Gestão de equipes TC'
                        flexDir={'column'}
                        marginTop={'20px'}
                        maxWidth='400px'
                        maxHeight='80%'
                        bg='#223249'>
                        {isLoadingVerifyToken ? (
                            <>
                                {!isValid ? (
                                    <Flex flexDirection={'column'}>
                                        <Text alignSelf={'center'} fontSize='20px' marginBottom='10px'>Validando se a recuperação ainda está válida...</Text>
                                        <Progress size='md' borderRadius={'5px'} isIndeterminate />
                                    </Flex>
                                ) : (
                                    <Text alignSelf={'center'} fontSize='20px' marginBottom='10px'>O token expirou ou já foi usado 😡</Text>
                                )}
                            </>
                        ) : (
                            <>
                            {
                             !successMessage ? (
                                <Flex
                                as='form'
                                flexDir={'column'}
                                gap={4}
                                padding='0 30px'
                                onSubmit={handleSubmit(handleUpdatePassword)}>
                                <Flex flexDir='column' gap='35px' top='-25px' position='relative'>
                                <Flex flexDir='column' gap='35px' top='-20px' position='relative'>
                                <Text color='white' fontWeight='semibold' position='relative' top='15'>Recuperação de senha:</Text>
                                <Input
                                    _autofill={{WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out', WebkitTransitionDelay: '9999s'}}
                                    _placeholder={{color: '#C7C7C8', fontWeight: 'normal', fontsize: '15px' }}
                                    textColor='white'
                                    fontWeight='bold'
                                    variant='flushed'
                                    fontSize='16px'
                                    borderColor={'rgba(67, 98, 139, 0.4)'}
                                    focusBorderColor={'rgba(67, 98, 139, 1)'}
                                    borderBottomWidth='2px'
                                    type='password'
                                    placeholder='Digite sua nova senha'
                                    error={formState.errors.newPassword}
                                    {...register('newPassword')}
                                />
                                <Input
                                    _autofill={{WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out', WebkitTransitionDelay: '9999s'}}
                                    _placeholder={{color: '#C7C7C8', fontWeight: 'normal', fontsize: '15px' }}
                                    textColor='white'
                                    fontWeight='bold'
                                    variant='flushed'
                                    fontSize='16px'
                                    borderColor={'rgba(67, 98, 139, 0.4)'}
                                    focusBorderColor={'rgba(67, 98, 139, 1)'}
                                    borderBottomWidth='2px'
                                    type='password'
                                    placeholder='Insira novamente a mesma senha'
                                    error={formState.errors.confirmation}
                                    {...register('confirmation')}
                                />
                                </Flex>
                                <Button 
                                    top='-20px'
                                    disabled={isLoading} 
                                    _hover={{ bg: '#43628B' }}
                                    type='submit' 
                                    isDisabled={isLoading} 
                                    textColor='#FFFFFF'
                                    fontSize='12px'
                                    bgGradient='linear(90deg, #0D223E -5.88%, #0F1B2C 51.16%, #0F2140 107.82%)'
                                    boxShadow='0px 4px 4px rgba(67, 98, 139, 0.21)'>{isLoading && <Spinner marginRight={'5px'} />}Atualizar senha</Button>
                                {!isLoading && (
                                    <S.PanelBottom>
                                        <Link to='/login'>Voltar para login</Link>
                                    </S.PanelBottom>
                                )}
                            </Flex>
                            </Flex>
                             ) : (
                                <Flex justifyContent='center' flexDir='column' alignItems='center'>
                                <Image src={VerifyIcon} height='61px' width='61px'></Image>
                                <Text color='#FFFFFF' fontSize='18px' marginBottom='75px'>Senha atualizada com sucesso!</Text>
                                <Flex marginBottom='50px'>
                                <S.PanelBottom>
                                    <Link to='/login'>Voltar para login</Link>
                                </S.PanelBottom>
                                </Flex>
                                </Flex>
                             )
                            }
                            
                            </>
                        )}
                    </PanelLogin>
                </Flex>
            </S.Content>
        </Flex>

    )
}

export default PasswordReset