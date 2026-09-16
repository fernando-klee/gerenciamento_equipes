import { api } from "../../../../services/api";
import { AllValuesProps } from "../../Models";

export async function loadValues(
    setAllValues: React.Dispatch<React.SetStateAction<AllValuesProps | undefined>>,
    setLoadingAllValues: React.Dispatch<React.SetStateAction<boolean>>
) {
      const response = await api.get("/geral-vision/all-values");
      setAllValues(response.data);
      setLoadingAllValues(false);
    }
