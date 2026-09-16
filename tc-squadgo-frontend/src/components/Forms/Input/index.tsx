import { FormControl, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage, forwardRef, FormLabel } from '@chakra-ui/react'
import { ForwardRefRenderFunction } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
    name?: string
    label?: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
    ({ name, label, error = null, ...props }, ref) => {
        return (
            <FormControl isInvalid={!!error}>
                {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
                <ChakraInput
                    id={name}
                    name={name}
                    label={label}
                    size={'lg'}
                    textOverflow='ellipsis'
                    ref={ref}
                {...props} />
                {!!error && (
                    <FormErrorMessage>
                        {error.message!.toString()}
                    </FormErrorMessage>
                )}

            </FormControl>
        )
}

const Input = forwardRef(InputBase)
export default Input