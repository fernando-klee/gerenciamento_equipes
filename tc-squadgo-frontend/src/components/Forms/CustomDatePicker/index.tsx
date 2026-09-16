import "react-datepicker/dist/react-datepicker.css";

import { Flex, Button, forwardRef } from "@chakra-ui/react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

import { ptBR } from "date-fns/locale";

interface DatePickerProps extends ReactDatePickerProps {
  currentDate: Date;
  isOpen: boolean;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  currentDate,
  isOpen = false,
  onChange,
  ...props
}) => {
  const CustomInput = forwardRef(({ value, onClick, onChange }: any, ref) => (
    <Button
      background="transparent"
      // _placeholder="mm/yyyy"
      onChange={onChange}
      onClick={onClick}
      ref={ref}
    >
      {value}
    </Button>
  ));
  return (
    <Flex maxWidth={"max-content"}>
      <ReactDatePicker
        dateFormat={"MM/yyyy"}
        onChange={onChange}
        selected={currentDate}
        locale={ptBR}
        {...props}
        customInput={<CustomInput />}
      />
    </Flex>
  );
};

export default CustomDatePicker;
