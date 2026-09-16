import { CustomerProps } from "../../interfaces";

export function handleHideCustomersWithNoResources(
    isChecked: boolean,
    customers: CustomerProps[],
    setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>
) {
    const customersFiltered = customers.filter((c) => {
      return isChecked ? c.resources.length > 0 : c;
    });

    setCustomersFiltered(customersFiltered);
  }