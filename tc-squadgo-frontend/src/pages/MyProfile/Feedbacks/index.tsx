import { useEffect, useState, useCallback } from 'react'
import { Flex, Spinner, Text } from '@chakra-ui/react'

import { format, parseISO } from 'date-fns'

import { IconType } from 'react-icons'
import { CgGirl } from 'react-icons/cg'
import { HiCheck } from 'react-icons/hi'

import * as S from './styles'
import { api } from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'

interface FeedbackProps {
    id: number
    description: string
    type: string
    created_at: Date | string
    resource: {
        id: number
        name: string
    }
    reporter: {
        id: number
        name: string
    } | null
}

interface FeedbackType {
    type: string
    
}

interface FeedbackButtonProps {
    text: string
    type?: string
    icon: IconType
    iconSize?: number
}

const Feedbacks: React.FC = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [feedbacksFiltered, setFeedbacksFiltered] = useState<FeedbackProps[]>([])
    const [typeSelected, setTypeSelected] = useState<string>('RESOURCE');


    useEffect(() => {
        async function loadFeedbacks() {
            const response = await api.get(`/feedbacks?resource_id=${Number(user.id)}`)
            const feedbacksFormatted = response.data.map((f: FeedbackProps) => {
                return { ...f, created_at: format(parseISO(f.created_at + ''), 'dd/MM/yyyy') }
            })
            setFeedbacksFiltered(feedbacksFormatted)
            setLoading(false)
        }

        loadFeedbacks()
    }, [user.id])

    const feedbacksType = useCallback((type?: string) => {
        if (type) return feedbacksFiltered.filter(f => f.type === type)
        else return feedbacksFiltered
    }, [feedbacksFiltered])

    const FeedbackButton = ({ text, type, icon: Icon, iconSize = 25 }: FeedbackButtonProps) => {
        return (
            <S.FeedbackType isSelected={typeSelected === type} onClick={() => handleChangeFeedbackType(type)}>
                <Flex justifyContent='center' alignItems='center' w='40px' h='40px' bgColor='#323237' padding='7px' borderRadius={'50%'}>
                    <Icon color='#fff' size={iconSize} />
                </Flex>
                <Flex direction='column' alignItems='flex-start'>
                    <Text fontWeight={700} color='#323237'>{text}</Text>
                    {type && (
                        <>
                            {feedbacksType(type).length > 0 && (
                                <Text color='#323237' fontSize='14px'>
                                    <>Último em {feedbacksType(type)[0].created_at}</>
                                </Text>
                            )}
                        </>
                    )}
                    <Text color='#707070' mt='5px'>
                        {feedbacksType(type).length}{feedbacksType(type).length === 1 ? ' feedback' : ' feedbacks'}
                    </Text>
                </Flex>
            </S.FeedbackType>
        )
    }

    const FeedbackButtonSelected: React.FC = () => {
        return <FeedbackButton text='Colaborador' type={typeSelected} icon={CgGirl} />;
    };
    

    const handleChangeFeedbackType = (type?: any) => {
        setTypeSelected(type)
    }

    const feedbackTypeDescription = (feedback: FeedbackProps) => {
        if (feedback.type === 'RESOURCE') return 'Colaborador'
    }

    return (
        <>
        <S.Container>
            {loading ? (
                <Spinner />
            ) : (
                <S.FeedbacksList>
                    <Flex
                        boxShadow={'0px 2px 5px 1px rgba(0,0,0,0.35)'}
                        direction='column'
                        padding='5px'
                        flex={2}
                        gap='20px'
                        bgColor='#fff'
                        borderRadius='10px'>
                        <FeedbackButtonSelected />
                        <Flex padding='20px' direction='column' gap='10px' overflowY={'auto'} maxH='300px'>
                            {feedbacksType(typeSelected).length ? (
                                <>
                                    {feedbacksType(typeSelected).map((f, i) => (
                                        <Flex
                                            boxShadow={'0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)'}
                                            key={f.id}
                                            direction='column'
                                            bgColor='#fff'
                                            padding='15px'
                                            borderRadius={'9px'}
                                            gap='10px'>
                                            <Text color='#000' fontWeight={700}>
                                                {`${f.reporter?.name ?? 'Anônimo'} | ${feedbackTypeDescription(f)}`}
                                            </Text>
                                            <Text wordBreak='break-word' color='#000'>{f.description}</Text>
                                            <Flex alignItems='center' gap='3px'>
                                                <HiCheck color='#000' size={16} />
                                                <Text fontSize='14px' color='#000'><>{f.created_at}</></Text>
                                            </Flex>
                                        </Flex>
                                    ))}
                                </>
                            ) : (
                                <Text>Não há feedbacks nesta categoria</Text>
                            )}
                        </Flex>
                    </Flex>
                </S.FeedbacksList>
            )}            
        </S.Container>
        </>
    )
}

export default Feedbacks