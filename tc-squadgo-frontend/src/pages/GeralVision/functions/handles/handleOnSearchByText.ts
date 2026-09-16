import { CustomerProps } from "../../interfaces";

export function handleOnSearchByText(
    e: React.ChangeEvent<HTMLInputElement>,
    setSearchText: React.Dispatch<React.SetStateAction<string>>,
    customers: CustomerProps[],
    setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>
) {
    setSearchText(e.target.value);
    const value = e.target.value.toLowerCase();

    const customersFiltered = customers.filter((c) => {
      return (
        c.name.toLowerCase().includes(value) ||
        c.resources.some((r) => r.name.toLowerCase().includes(value)) ||
        c.responsibles.some((r) => r.name.toLowerCase().includes(value))
      );
    });

    setCustomersFiltered(customersFiltered);
  }