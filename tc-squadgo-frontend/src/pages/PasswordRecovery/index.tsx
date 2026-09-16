import { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Button, Flex, Image, Spinner, Text, useToast } from '@chakra-ui/react'

import VerifyIcon from '../../assets/VerifyIcon.svg'
import * as S from './styles'
import Input from "../../components/Forms/Input"
import { api } from '../../services/api'

const PasswordRecovery: React.FC = () => {
    const history = useHistory()
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const schema = yup.object({
        email: yup.string().required('E-mail é obrigatório').email('E-mail é inválido')
    }).required()

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema)
    })

    async function handleSignIn(values: any) {
        setIsLoading(true)

        const { email } = values

        try {
            await api.post('/password-recover', {
                email
            })
            setSuccessMessage(true)
        } catch (err) {
            toast({
                title: 'E-mail inválido',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
        }

        setIsLoading(false)
    }

    return (
        <Flex
            as='form'
            flexDir={'column'}
            gap={4}
            padding='0 30px'
            position='relative'
            top='20px'
            onSubmit={handleSubmit(handleSignIn)}>
                <Flex flexDirection={'column'} position='relative' top='-50px'>
            {
                !successMessage ? (
                    <>
                    <Text color='white' fontWeight='semibold' mb='20px'>Insira seu e-mail</Text>
                    <Input
                        _autofill={{WebkitTransition: 'color 9999s ease-out, background-color 9999s ease-out', WebkitTransitionDelay: '9999s'}}
                        _placeholder={{color: '#C7C7C8', fontWeight: 'normal', fontsize: '16px'}}
                        textColor='white'
                        fontWeight='bold'
                        variant='flushed'
                        fontSize='16px'
                        borderColor={'rgba(67, 98, 139, 0.4)'}
                        focusBorderColor={'rgba(67, 98, 139, 1)'}
                        borderBottomWidth='2px'
                        placeholder='nome@testingcompany.com.br'
                        error={formState.errors.email}
                        {...register('email')} 
                            />
                    <Button 
                        type='submit' 
                        isDisabled={isLoading} 
                        textColor='#FFFFFF'
                        fontSize='12px'
                        _hover={{ bg: '#43628B' }}
                        bgGradient='linear(90deg, #0D223E -5.88%, #0F1B2C 51.16%, #0F2140 107.82%)'
                        boxShadow='0px 4px 4px rgba(67, 98, 139, 0.21)'
                        mt='25px'
                        mb='50px'>
                        {isLoading ? <Spinner /> : 'Enviar'}
                    </Button>
                    <S.PanelBottom>
                        <Link to='/login'>Voltar para login</Link>
                    </S.PanelBottom>
                    </>
                ) : (
                    <Flex justifyContent='center' flexDir='column' alignItems='center'>
                        <Image src={VerifyIcon} height='61px' width='61px'></Image>
                        <Text color='#FFFFFF' fontSize='18px' marginBottom='75px'>Recuperação de senha enviada!</Text>
                        <Flex marginBottom='50px'>
                        <S.PanelBottom>
                            <Link to='/login'>Voltar para login</Link>
                        </S.PanelBottom>
                        </Flex>
                    </Flex>
                )
            }
                </Flex>
        </Flex>
    )
}

export default PasswordRecovery