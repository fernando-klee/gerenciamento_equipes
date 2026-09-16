import { format } from "date-fns";
import { api } from "../../../../services/api";
import { AxiosError } from "axios";

export async function handleSelectOutputEstimateDate(
  values: any,
  idUserToDelete: number | null,
  setShowDateDeleteUserFromProject: React.Dispatch<React.SetStateAction<boolean>>,
  onCloseDelete: () => void,
  toast: any
): Promise<void> {
  try {
    if (!idUserToDelete) {
      throw new Error("ID do usuário a ser excluído não está definido.");
    }

    const { output_estimate } = values;

    const formattedDate = format(new Date(output_estimate), "yyyy-MM-dd");

    await api.put(`/resources/${idUserToDelete}/output-estimate`, {
      resource_id: idUserToDelete,
      new_output_estimate: formattedDate,
    });

    setShowDateDeleteUserFromProject(false);
    onCloseDelete();

    toast({
      title: `Data definida com sucesso!`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (error) {
    console.error(error);
    let errorMessage = "Erro ao definir data!";

    if (
      (error as AxiosError)?.response &&
      (error as AxiosError).response?.data?.message
    ) {
      errorMessage = (error as AxiosError).response?.data.message;
    }

    toast({
      title: errorMessage,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
}