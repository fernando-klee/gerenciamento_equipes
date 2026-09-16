import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Box, Button, Checkbox, Flex, FormControl, FormLabel, InputGroup, Spinner, Stack, Switch } from '@chakra-ui/react'

import { useAuth } from "../../context/AuthContext"

import * as S from './styles'
import Input from "../../components/Forms/Input"

const SignIn: React.FC = () => {
    const { signIn, isLoading } = useAuth()
    const schema = yup.object({
        email: yup.string().required('E-mail é obrigatório').email('E-mail é inválido'),
        password: yup.string().required('Senha é obrigatória')
    }).required()

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema)
    })

    async function handleSignIn(values: any): Promise<void> {
        await signIn(values)
    }

    return (
        <Flex
            as='form'
            flexDir={'column'}
            gap={4}
            padding='0 30px'
            onSubmit={handleSubmit(handleSignIn)}>
                <Flex flexDirection={'column'} position='relative' top='-35px' gap='39px'>
                <Flex flexDirection={'column'} position='relative' top='-40px' gap='35px'>
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
                    placeholder='E-mail'
                    error={formState.errors.email}
                    {...register('email')} />
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
                    placeholder='Senha'
                    type='password'
                    error={formState.errors.password}
                    {...register('password')} />
            <FormControl display='flex' alignItems='center' top='10px'>
                <Flex >
                    <Checkbox id='keep-on' borderRadius='3px' size='sm'/>
                    <FormLabel color={'#F2F2F2'} htmlFor='keep-on' m='0' ml='2' fontSize='12px'>
                        Manter logado
                </FormLabel>
                </Flex>
            </FormControl>
            </Flex>
            <Button
                _hover={{ bg: '#43628B' }}
                type='submit' 
                isDisabled={isLoading} 
                textColor='#FFFFFF'
                fontSize='12px'
                bgGradient='linear(90deg, #0D223E -5.88%, #0F1B2C 51.16%, #0F2140 107.82%)'
                boxShadow='0px 4px 4px rgba(67, 98, 139, 0.21)'
                top='-20px'>
                {isLoading ? <Spinner /> : 'Login'}
            </Button>
            <S.PanelBottom>
                <span>Esqueceu a senha?</span>
                <Link to='/esqueci-minha-senha'>Clique aqui</Link>
            </S.PanelBottom>
            </Flex>
        </Flex>
    )
}

export default SignIn