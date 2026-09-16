import { Text } from '@chakra-ui/react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import * as S from './styles'

interface Props {
    children: React.ReactNode
}

const Default = ({ children }: Props) => {
    return (
        <S.Wrapper>
            <Sidebar />
            <S.Content>
                <S.Body>
                    {children}
                    <S.Footer>
                        <Text
                            fontSize='14px'
                            color='#838383'
                            fontWeight={700}>
                            © Testing Company 2025, todos os direitos reservados.
                        </Text>
                    </S.Footer>
                </S.Body>
            </S.Content>
        </S.Wrapper>
    )
}

export default Default