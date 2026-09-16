import * as S from "./styles"
import { Flex, Text } from "@chakra-ui/react"
import { RoomFilterProps } from "./interface"

export function RoomFilter({ selectedOption }: RoomFilterProps) {
    return (
        <Flex flexDir='column' flex='1' marginTop='-50px'>
            <S.ContainerDayHorizontal>
                <Text fontSize='14px' color='white'>{selectedOption}</Text>
            </S.ContainerDayHorizontal>
            <S.SingleContainerHorizontal>
                <Flex flexDir='row' justifyContent='space-between' width='100%' />
            </S.SingleContainerHorizontal>
        </Flex>
    )
}
