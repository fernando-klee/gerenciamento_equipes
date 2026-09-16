import { Flex, Text } from "@chakra-ui/react"

const NotFound: React.FC = () => {
    return (
        <Flex justifyContent={'center'} alignItems='center'>
            <Text fontSize={'30px'}>Esta página não existe</Text>
        </Flex>
    )
}

export default NotFound