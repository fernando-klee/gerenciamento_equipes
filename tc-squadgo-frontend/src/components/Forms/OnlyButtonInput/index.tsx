import { useState, useRef } from 'react'

import { IoMdSearch } from 'react-icons/io'

import { FormControl, Input as ChakraInput, InputProps as ChakraInputProps, forwardRef, IconButton, Flex } from '@chakra-ui/react'
import { ForwardRefRenderFunction } from 'react'

interface InputProps extends ChakraInputProps {
    name: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
    ({ name, ...props }, ref) => {
        const [isVisible, setIsVisible] = useState(false)
        const inputRef = useRef<HTMLInputElement | null>(null)

        function onBlur() {
            setIsVisible(false)
        }

        function onFocus() {
            setIsVisible(true)
        }

        function onFocusByButton() {
            onFocus()
            inputRef.current?.focus()
        }

        return (
            <Flex>
                <FormControl>
                    <ChakraInput
                        pointerEvents={isVisible ? 'initial' : 'none'}
                        opacity={isVisible ? '1' : '0'}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        id={name}
                        name={name}
                        size={'lg'}
                        textOverflow='ellipsis'
                        ref={inputRef}
                        {...props} />
                </FormControl>
                <IconButton
                    opacity={isVisible ? '0' : '1'}
                    onClick={onFocusByButton}
                    bgColor='transparent'
                    aria-label='Search database'
                    icon={<IoMdSearch size={25} />}
                />
            </Flex>
        )
    }

const OnlyButtonInput = forwardRef(InputBase)
export default OnlyButtonInput