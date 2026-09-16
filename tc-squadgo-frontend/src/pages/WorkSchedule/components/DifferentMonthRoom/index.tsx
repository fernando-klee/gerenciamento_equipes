import * as S from './styles'
import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import { DifferentMonthRoomProps } from './interface'

export function DifferentMonthRoom({ rooms }: DifferentMonthRoomProps) {
    return (
        <Flex flexDir='column' width='100%'>
            <Flex justifyContent='space-between'>
                <S.SingleContainer>
                    <S.ContainerDay>
                        <Text fontSize='14px' color='white'>Segunda-Feira</Text>
                    </S.ContainerDay>
                    <Flex flexDir='column' gap='50px'>
                        {Array.from({ length: rooms }, (_, i) => (
                            <>
                                <Flex flexDir='column' key={i}>
                                    <Flex flexDir='row-reverse'>
                                        <Text color='#990000'>Home-Office</Text>
                                    </Flex>
                                    <S.ContainerRoom>
                                        {[...Array(15)].map((_) => (
                                            <Avatar
                                                height={22}
                                                width={22}
                                                name='Dan Abrahmov'
                                                src='https://cdn.discordapp.com/avatars/618415871119065088/6783542dbbf368fe17922273587598c6.webp?size=80'
                                            />
                                        ))}
                                    </S.ContainerRoom>
                                </Flex>
                            </>
                        ))}
                    </Flex>
                </S.SingleContainer>
                <S.SingleContainer>
                    <S.ContainerDay>
                        <Text fontSize='14px' color='white'>Terça-Feira</Text>
                    </S.ContainerDay>
                    <Flex flexDir='column' gap='50px'>
                        {Array.from({ length: rooms }, (_, i) => (
                            <>
                                <Flex flexDir='column' key={i}>
                                    <Flex flexDir='row-reverse'>
                                        <Text color='#990000'>Home-Office</Text>
                                    </Flex>
                                    <S.ContainerRoom>
                                        {[...Array(15)].map((_) => (
                                            <Avatar
                                                height={22}
                                                width={22}
                                                name='Dan Abrahmov'
                                                src='https://cdn.discordapp.com/avatars/618415871119065088/6783542dbbf368fe17922273587598c6.webp?size=80'
                                            />
                                        ))}
                                    </S.ContainerRoom>
                                </Flex>
                            </>
                        ))}
                    </Flex>
                </S.SingleContainer>
                <S.SingleContainer>
                    <S.ContainerDay>
                        <Text fontSize='14px' color='white'>Quarta-Feira</Text>
                    </S.ContainerDay>
                    <Flex flexDir='column' gap='50px'>
                        {Array.from({ length: rooms }, (_, i) => (
                            <>
                                <Flex flexDir='column' key={i}>
                                    <Flex flexDir='row-reverse'>
                                        <Text color='#990000'>Home-Office</Text>
                                    </Flex>
                                    <S.ContainerRoom>
                                        {[...Array(15)].map((_) => (
                                            <Avatar
                                                height={22}
                                                width={22}
                                                name='Dan Abrahmov'
                                                src='https://cdn.discordapp.com/avatars/618415871119065088/6783542dbbf368fe17922273587598c6.webp?size=80'
                                            />
                                        ))}
                                    </S.ContainerRoom>
                                </Flex>
                            </>
                        ))}
                    </Flex>
                </S.SingleContainer>
                <S.SingleContainer>
                    <S.ContainerDay>
                        <Text fontSize='14px' color='white'>Quinta-Feira</Text>
                    </S.ContainerDay>
                    <Flex flexDir='column' gap='50px'>
                        {Array.from({ length: rooms }, (_, i) => (
                            <>
                                <Flex flexDir='column' key={i}>
                                    <Flex flexDir='row-reverse'>
                                        <Text color='#990000'>Home-Office</Text>
                                    </Flex>
                                    <S.ContainerRoom>
                                        {[...Array(15)].map((_) => (
                                            <Avatar
                                                height={22}
                                                width={22}
                                                name='Dan Abrahmov'
                                                src='https://cdn.discordapp.com/avatars/618415871119065088/6783542dbbf368fe17922273587598c6.webp?size=80'
                                            />
                                        ))}
                                    </S.ContainerRoom>
                                </Flex>
                            </>
                        ))}
                    </Flex>
                </S.SingleContainer>
                <S.SingleContainer>
                    <S.ContainerDay>
                        <Text fontSize='14px' color='white'>Sexta-Feira</Text>
                    </S.ContainerDay>
                    <Flex flexDir='column' gap='50px'>
                        {Array.from({ length: rooms }, (_, i) => (
                            <>
                                <Flex flexDir='column' key={i}>
                                    <Flex flexDir='row-reverse'>
                                        <Text color='#990000'>Home-Office</Text>
                                    </Flex>
                                    <S.ContainerRoom>
                                        {[...Array(15)].map((_) => (
                                            <Avatar
                                                height={22}
                                                width={22}
                                                name='Dan Abrahmov'
                                                src='https://cdn.discordapp.com/avatars/618415871119065088/6783542dbbf368fe17922273587598c6.webp?size=80'
                                            />
                                        ))}
                                    </S.ContainerRoom>
                                </Flex>
                            </>
                        ))}
                    </Flex>
                </S.SingleContainer>
            </Flex>
            <Flex width='100%' flexDir='row-reverse' mt='50px' gap='13px'>
                <Button
                    borderRadius='30px'
                    bgColor='#239B28'
                    fontSize='16px'
                    color='#FFFFFF'
                    width='133px'
                    height='52px'
                    fontWeight={400}
                >
                    Enviar escala
                </Button>
                <Button
                    borderRadius='30px'
                    bgColor='#E3E3E3'
                    fontSize='16px'
                    color='#1B1464'
                    width='133px'
                    height='52px'
                    fontWeight={400}
                >
                    Salvar rascunho
                </Button>
            </Flex>
        </Flex>
    )
}