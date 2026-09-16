import "react-datepicker/dist/react-datepicker.css";

import { Flex, Button, forwardRef, Image } from "@chakra-ui/react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

import { ptBR } from "date-fns/locale";
import ArrowDown from "../../../assets/ArrowDown.svg";

interface DatePickerProps extends ReactDatePickerProps {
  currentDate: Date;
  isOpen: boolean;
}

const CustomDatePicker2: React.FC<DatePickerProps> = ({
  currentDate,
  isOpen = false,
  onChange,
  ...props
}) => {
  const CustomInput = forwardRef(({ value, onClick }: any, ref) => (
    <Button
      background="transparent"
      onClick={onClick}
      ref={ref}
      _hover={{ background: "gray.100" }}
      _active={{ background: "gray.200" }}
    >
      {value || "mm/yyyy"} {/* Exibe o texto padrão caso value seja vazio */}
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

export default CustomDatePicker2;
