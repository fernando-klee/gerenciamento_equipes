import { Flex, Image } from "@chakra-ui/react"
import LogoCompleta from '../../../assets/logoLogin.svg'
import LogoInferior from '../../../assets/LogoInferior.svg'
import * as S from './styles'
import PanelLogin from "../../../components/Panel/LoginScreen"

interface Props {
    children: React.ReactNode
}

const Auth = ({ children }: Props) => {
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
                    maxHeight='80%'>
                    {children}
                </PanelLogin>
                </Flex>
            </S.Content>
        </Flex>
    )
}

export default Auth