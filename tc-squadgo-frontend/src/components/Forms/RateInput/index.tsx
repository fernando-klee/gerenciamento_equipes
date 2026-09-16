import { Box, Flex, Tooltip } from "@chakra-ui/react"

interface RateInputProps {
    id: number
    count: number
    value: number
    isEnabled: boolean
    onRate(id: number, point: number): void
}

const RateInput: React.FC<RateInputProps> = ({ id, count, value, isEnabled = true, onRate }) => {

    return (
        <Flex gap='10px'>
            {Array(count).fill(0).map((_, i) => i +1).map(i => (
            <Tooltip key={i} label={i}>
                    <Box
                        {...(isEnabled &&
                            {
                                bgColor: 'blue',
                                onClick:(() => onRate(id, i)),
                                _hover:{ backgroundColor: '#427dbd', borderColor: '#427dbd' },
                                cursor:'pointer'
                            })
                        }
                        borderRadius='50%'
                        border='3px solid #254568'
                        bgColor={i > value ? '#fff' : '#254568'}
                        width={'20px'}
                        height={'20px'}
                    />
            </Tooltip>

            ))}
        </Flex>
    )
}

export default RateInput