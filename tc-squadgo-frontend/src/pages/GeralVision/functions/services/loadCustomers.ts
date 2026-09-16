import { UseToastOptions } from "@chakra-ui/react";
import { api } from "../../../../services/api";
import { CustomerProps } from "../../Models";

export async function loadCustomers(
    setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    setLoadingCustomers: React.Dispatch<React.SetStateAction<boolean>>, 
    toast: (options: UseToastOptions) => void 
) {
      try {
        const response = await api.get("/customers/with-resources");
        setCustomers(response.data);
        setCustomersFiltered(response.data);
        setLoadingCustomers(false);
      } catch (err) {
        toast({
          title: "Token expirado, por favor, realize novamente o login",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }