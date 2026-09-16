import { Checkbox, FormLabel, Select } from "@chakra-ui/react";
import InputDefault from "../../../../components/Forms/ChakraInput";
import * as S from "../../styles";

interface ProjectFiltersProps {
  onShowFinishedChange: (show: boolean) => void;
  onTypeChange: (type: string) => void;
  onNameChange: (name: string) => void;
}

export function ProjectFilters({
  onShowFinishedChange,
  onTypeChange,
  onNameChange,
}: ProjectFiltersProps) {
  return (
    <S.FiltersContainer>
      <Checkbox onChange={(e) => onShowFinishedChange(e.target.checked)}>
        Exibir projetos finalizados
      </Checkbox>
      <S.FiltersContainerLeft>
        <S.FilterClassification>
          <FormLabel width="max-content" marginBottom="0">
            Filtrar por:
          </FormLabel>
          <Select
            width={"max-content"}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value={""}>Nenhum...</option>
            <option value="50">Projetos Internos</option>
            <option value="1">Projetos Externos</option>
          </Select>
        </S.FilterClassification>
        <InputDefault
          width={"284px"}
          onChange={(e) => onNameChange(e.target.value)}
          size="md"
          name="name"
          placeholder="Insira o nome do colaborador ou cliente"
        />
      </S.FiltersContainerLeft>
    </S.FiltersContainer>
  );
} 