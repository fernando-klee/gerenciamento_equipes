import { api } from "../../../../services/api";
import { CustomerProps } from "../../interfaces";

export async function handleLoadCustomers(
    setAllCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>
) {
      await api.get("/customers?qtdPerPage=100").then((res) => {
        const { data } = res.data;
        const allCurrentCustomers: CustomerProps[] = data.map(
          (cr: CustomerProps) => {
            return { ...cr, value: cr.id, label: cr.name };
          }
        );
        setAllCustomers(allCurrentCustomers);

        const currentActiveCustomers = allCurrentCustomers.filter(
          (acc) => acc.status === "ATIVO"
        );
        setCustomers(currentActiveCustomers);
      });
    }