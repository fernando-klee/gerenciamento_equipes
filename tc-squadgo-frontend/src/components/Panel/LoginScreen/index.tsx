import { Flex, FlexProps, Image, Text } from '@chakra-ui/react'
import IconCircle from '../../../assets/iconCircle.svg'

interface PanelProps extends FlexProps {
    title?: string
    counter?: string | number
}

const PanelLogin: React.FC<PanelProps> = ({ title, counter, children, ...props }) => {
    return (
        <Flex
            height={'max-content'}
            position='relative'
            padding={6}
            borderRadius={58}
            width='100%'
            bgColor='rgba(42, 61, 86, 0.8)'
            boxShadow={'0px 0px 15px rgba(0, 0, 0, 0.11)'}
            flex={1}
            {...props}>
            {title && (
                <Flex
                    position={'relative'}
                    top='-80px'
                    width={'100%'}
                    justify='center'
                    align='center'>
                        <Image src={IconCircle}/>
                </Flex>
            )}
            {children}
        </Flex>
    )
}

export default PanelLogin