import { Flex, FlexProps, Text } from '@chakra-ui/react'
import colors from '../../styles/colors'

interface PanelProps extends FlexProps {
    title?: string
    counter?: string | number
}

const Panel: React.FC<PanelProps> = ({ title, counter, children, ...props }) => {
    return (
        <Flex
            height={'max-content'}
            position='relative'
            padding={6}
            borderRadius={6}
            width='100%'
            bgColor='#fff'
            boxShadow={'0px 0px 51.358px rgba(221, 221, 221, 0.49)'}
            flex={1}
            {...props}>
            {title && (
                <Flex
                    position={'relative'}
                    top='-60px'
                    left='4px'
                    marginBottom={'-20px'}
                    padding={'30px'}
                    width={'99%'}
                    justify='center'
                    align='center'
                    borderRadius={10}
                    boxShadow='0px 2px 5px 1px #9e00007a'
                    bgColor={colors.general.third}>
                        {title && (
                            <Text
                            fontSize={20}
                            fontWeight={700}
                            color={'white'}>{title}</Text>
                        )}

                        {counter && (
                            <Text
                            position={'absolute'}
                            top={'13px'}
                            right={'13px'}
                            padding={'5px 15px'}
                            fontSize={'17px'}
                            fontWeight={500}
                            borderRadius={'10px'}
                            bgColor={'#fff'}
                            color={'#000'}>{counter}</Text>
                        )}
                </Flex>
            )}
            {children}
        </Flex>
    )
}

export default Panel