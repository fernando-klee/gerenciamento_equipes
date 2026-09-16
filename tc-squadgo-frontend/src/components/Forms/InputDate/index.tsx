import { useState } from 'react'

import { FormControl, Input as ChakraInput, forwardRef, FormLabel } from '@chakra-ui/react'

import "react-datepicker/dist/react-datepicker.css"
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { addYears } from 'date-fns'

import * as S from './styles'

interface InputProps extends ReactDatePickerProps {
    label?: string
}

const InputDate: React.FC<InputProps> = ({ onChange, value, label, ...props }, ref) => {
    const [startDate] = useState<Date>(new Date(value ?? new Date()))

    const CustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
        <FormControl>
            {label && <FormLabel>{label}</FormLabel>}
            <ChakraInput placeholder='dd/mm/yyyy' onChange={onChange} onClick={onClick} ref={ref} value={value} />
        </FormControl>
    ));

    return (
        <S.Container>
            <ReactDatePicker
                onChange={onChange}
                selected={startDate}
                maxDate={addYears(new Date(), 50)}
                // showMonthYearDropdown
                showFullMonthYearPicker
                dateFormat="dd/MM/yyyy"
                {...props}
                customInput={<CustomInput />}
            />
        </S.Container>
    )
}

export default InputDate