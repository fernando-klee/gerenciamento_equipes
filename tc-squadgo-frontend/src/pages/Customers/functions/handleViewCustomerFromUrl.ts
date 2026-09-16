import queryString from 'query-string';
import { CustomerProps } from '../interfaces'

export const handleViewCustomerFromUrl = (
  search: string,
  customers: CustomerProps[],
  setSelectedCustomer: (customer: CustomerProps) => void,
  setCurrentSelectedCustomerStatus: (status: boolean) => void,
  onOpenView: () => void
): void => {
  if (customers.length > 0) {
    const viewCustomer = queryString.parse(search);
    if (viewCustomer.visualizar) {
      const customer_id = Number(viewCustomer.visualizar);
      const currentCustomer = customers.find((c: CustomerProps) => c.id === customer_id);
      
      if (currentCustomer) {
        setSelectedCustomer(currentCustomer);
        setCurrentSelectedCustomerStatus(currentCustomer.status === 'ATIVO');
        onOpenView();
      }
    }
  }
};