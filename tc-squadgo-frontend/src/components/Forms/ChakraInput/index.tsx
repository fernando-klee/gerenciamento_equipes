import { FormControl, Input, InputProps as ChakraInputProps, FormLabel } from '@chakra-ui/react'

interface InputDefaultProps extends ChakraInputProps {
    name: string
    label?: string
}

const InputDefault: React.FC<InputDefaultProps> = ({ name, label, ...props }) => {
    return (
        <FormControl>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Input
                id={name}
                name={name}
                label={label}
                size={'lg'}
                textOverflow='ellipsis'
                border="2px solid"
                borderColor="gray.500"
                _hover={{ borderColor: 'gray.600' }}
                _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                {...props}
                {...props} />
        </FormControl>
    )
}

export default InputDefault