import * as yup from 'yup';
import { updateResourceSchema } from '../../components/UpdateModal';


export async function handleOnSubmit(
  values: any, {
    selectedResource,
    toast,
    leaderId,
    resources,
    setResourcesValues,
    setResourcesFilteredValues,
    resetUpdateResourceModal,
    clearUpdateErrors,
    onCloseUpdate,
    handleUpdateResource,
}: {
    selectedResource: any,
    toast: any,
    leaderId: number | null,
    resources: any[],
    setResourcesValues: (resources: any[]) => void,
    setResourcesFilteredValues: (resources: any[]) => void,
    resetUpdateResourceModal: () => void,
    clearUpdateErrors: () => void,
    onCloseUpdate: () => void,
    handleUpdateResource: any,
}
) {
  try {
    await updateResourceSchema.validate(values, { abortEarly: false });
    handleUpdateResource(
      values,
      selectedResource,
      toast,
      leaderId,
      resources,
      setResourcesValues,
      setResourcesFilteredValues,
      resetUpdateResourceModal,
      clearUpdateErrors,
      onCloseUpdate
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      error.inner.forEach((err) => {
        toast({
          title: "Erro de validação",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
    }
  }
}