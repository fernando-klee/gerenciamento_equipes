import * as S from './styles'
import { Avatar, Flex, Image, Text, Link } from '@chakra-ui/react'
import { LeftResourcesProps } from './interface'
import ArrowRight from '../../../assets/ArrowRight.svg'

export function LeftResources({ isLeader, resources }: LeftResourcesProps) {
    return (
        <Flex flexDir='column' gap={10} width='10%' minW='150px'>
            <Flex flexDir='column'>
                {isLeader === 'Líder' ? (
                    <>
                        <Text mb='10px' fontWeight={700} fontSize='18px'>Colaboradores:</Text>
                        <Flex flexDir='column' alignItems='center'>
                            <Flex
                                pos='relative'
                                top='15px'
                                bgColor='#142644'
                                borderRadius='11'
                                width='85%'
                                height='25px'
                                alignItems='center'
                                justifyContent='center'
                                mt='-10px'
                            >
                                <Avatar
                                    pos='relative'
                                    right='20px'
                                    name='Christian Nwamba'
                                    height={29}
                                    width={29}
                                    src='https://cdn.discordapp.com/avatars/618415871119065088/6783542dbbf368fe17922273587598c6.webp?size=80'
                                />
                                <Text
                                    pos='relative'
                                    right='15px'
                                    color='white'
                                    fontSize='12px'
                                >
                                    (Nome líder) - Líder
                                </Text>
                            </Flex>
                            <Flex
                                justifyContent={'center'}
                                gap={3} padding={5}
                                flexWrap={'wrap'}
                                borderRadius={10}
                                borderColor='#C3C5C9'
                                borderWidth={'1px'}
                            >
                                {[...Array(3)].map((_, index) => (
                                    <Avatar
                                        key={index}
                                        name='Christian Nwamba'
                                        height={29}
                                        width={29}
                                        src='https://cdn.discordapp.com/avatars/857939477930049537/3f00b2ede3f68133935cf0b7196ccc14.webp?size=80'
                                        marginTop='20px'
                                    />
                                ))}
                            </Flex>
                        </Flex>
                    </>
                ) : (
                    <>
                        <Text mb='10px' fontWeight={700} fontSize='18px'>Líderes:</Text>
                        <Flex
                            justifyContent={'center'}
                            gap={3}
                            padding={5}
                            flexWrap={'wrap'}
                            borderRadius={10}
                            borderColor='#C3C5C9'
                            borderWidth={'1px'}
                        >
                            <></>
                        </Flex>
                    </>
                )}
            </Flex>
            <Flex flexDir='column'>
                <Text mb='10px' fontWeight={700} fontSize='18px'>Não alocados:</Text>
                <Flex
                    gap={3}
                    padding={5}
                    flexWrap={'wrap'}
                    borderRadius={10}
                    borderColor='#C3C5C9'
                    borderWidth={'1px'}
                    justifyContent={'center'}
                    maxH='300px'
                    overflowY='auto'
                >
                    {resources.length > 0 ? (
                        <Flex justifyContent='center' flexWrap='wrap' gap={3} />
                    ) : (
                        <Text>Sem colaboradores</Text>
                    )}

                </Flex>
                <Flex flexDir='column'>
                    <Text mb='10px' fontWeight={700} fontSize='18px'>Observações:</Text>
                    <S.BoxObs>
                        <Flex flexDir="row" alignItems="center" marginTop="15px">
                            <Flex width="6px" height="60px" bgColor="#142644" borderRadius="4px" />
                            <Text fontFamily="Roboto" fontSize="14px" ml="10px" mr="5px" fontWeight="bold">
                                Alexander Hamilton
                                <Text color="#999999" fontSize="13px" fontWeight="normal">
                                    Hamilton precisa de...
                                </Text>
                                <Flex display="flex" alignItems="center">
                                    <Link color="#43628B" fontSize="9px" fontWeight="normal">
                                        Ler comentário completo
                                    </Link>
                                    <Image color="#43628B" ml="8px" mt="2px" height="8px" src={ArrowRight} />
                                </Flex>
                            </Text>
                        </Flex>
                        <Flex flexDir="row" alignItems="center" marginTop="15px">
                            <Flex width="6px" height="60px" bgColor="#142644" borderRadius="4px" />
                            <Text fontFamily="Roboto" fontSize="14px" ml="10px" mr="5px" fontWeight="bold">
                                Da Vinci
                                <Text color="#999999" fontSize="13px" fontWeight="normal">
                                    Seus quadros estão...
                                </Text>
                                <Flex display="flex" alignItems="center">
                                    <Link color="#43628B" fontSize="9px" fontWeight="normal">
                                        Ler comentário completo
                                    </Link>
                                    <Image color="#43628B" ml="8px" mt="2px" height="8px" src={ArrowRight} />
                                </Flex>
                            </Text>
                        </Flex>
                        <Flex flexDir="row" alignItems="center" marginTop="15px">
                            <Flex width="6px" height="60px" bgColor="#142644" borderRadius="4px" position="sticky" />
                            <Text fontFamily="Roboto" fontSize="14px" ml="10px" mr="5px" fontWeight="bold">
                                Arnaldo Fritz
                                <Text color="#999999" fontSize="13px" fontWeight="normal">
                                    Passa muito tempo...
                                </Text>
                                <Flex display="flex" alignItems="center">
                                    <Link color="#43628B" fontSize="9px" fontWeight="normal">
                                        Ler comentário completo
                                    </Link>
                                    <Image color="#43628B" ml="8px" mt="2px" height="8px" src={ArrowRight} />
                                </Flex>
                            </Text>
                        </Flex>
                    </S.BoxObs>
                </Flex>
            </Flex>
        </Flex >
    )
}