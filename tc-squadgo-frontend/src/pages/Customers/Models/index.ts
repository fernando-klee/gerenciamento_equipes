import { ChangeEvent, useEffect, useState } from "react"
import { History } from "history"
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom"
import { FieldValues, UseFormClearErrors, UseFormReset, UseFormSetValue } from "react-hook-form"
import { ToastProps, useDisclosure, useToast } from "@chakra-ui/react"
import { handleLoadCustomers } from "../functions/handleLoadCustomers"
import { handleViewCustomerFromUrl } from "../functions/handleViewCustomerFromUrl"
import { handleCreateNewCustomer } from "../functions/handleCreateNewCustomer"
import { handleUpdateCustomer } from "../functions/handleUpdateCustomer"
import { handleDeleteCustomer } from "../functions/handleDeleteCustomer"
import { handleViewSelectedCustomer } from "../functions/handleViewSelectedCustomer"
import { handleSelectCustomer } from "../functions/handleSelectCustomer"
import { handleCloseNewCustomerModal } from "../functions/handleCloseNewCustomerModal"
import { onCloseCustomerView } from "../functions/onCloseCustomerView"
import { filterCustomersByName } from "../functions/filterCustomersByName"
import { typeOfCustomers } from "../functions/typeOfCustomers"
import { loadCurrentCustomerProjectsToShowAtStatus } from "../functions/loadCurrentCustomerProjectsToShowAtStatus"
import { handleNewCustomerImage } from "../functions/handleNewCustomerImage"
import { handleImageUpdate } from "../functions/handleImageUpdate"
import { CustomerProjectsProps, CustomerProps, FilterProps } from "../interfaces";


export type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;


export const useCustomers = () => {
  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const [customersFiltered, setCustomersFiltered] = useState<CustomerProps[]>([])
  const [newCustomerStatus, setNewCustomerStatus] = useState(true)
  const [loadingCustomers, setLoadingCustomers] = useState(true)
  const [filters] = useState<FilterProps>({
      name: '',
      qtdPerPage: 100,
      currentPage: 1
  })
  const { search } = useLocation()
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProps>({} as CustomerProps)
  const [currentSelectedCustomerStatus, setCurrentSelectedCustomerStatus] = useState(false)
  const [currentSelectedCustomerProjects, setCurrentSelectedCustomerProjects] = useState<CustomerProjectsProps>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenView, onOpen: onOpenView, onClose: onCloseView } = useDisclosure()
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure()
  const { onOpen: onOpenCustomerStatus, onClose: onCloseCustomerStatus, isOpen: isOpenCustomerStatus } = useDisclosure()
  const [isLoadingCreating, setIsLoadingCreating] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [newCustomerImage, setNewCustomerImage] = useState<{ file: File | null, tempImage: string }>({
          file: null,
          tempImage: ''
      })
  const [isLoadingUpdating, setIsLoadingUpdating] = useState(false)
  const history = useHistory()
  const toast = useToast()
  

  useEffect(() => {
     handleLoadCustomers(filters,
      setCustomers,
      setCustomersFiltered,
      setLoadingCustomers)
  }, [filters] );


 useEffect(() => {
  handleViewCustomerFromUrl(
    search,
    customers,
    setSelectedCustomer,
    setCurrentSelectedCustomerStatus,
    onOpenView
  );
  // eslint-disable-next-line
}, [customers, search]);


  const handles = {
    handleLoadCustomers: (
    filters: FilterProps,
    setCustomers: SetStateFunction<CustomerProps[]>,
    setCustomersFiltered: SetStateFunction<CustomerProps[]>,
    setLoadingCustomers: SetStateFunction<boolean>
    ) => handleLoadCustomers(
      filters,
      setCustomers,
      setCustomersFiltered,
      setLoadingCustomers
    ),

    handleViewCustomerFromUrl: (
      search: string,
      customers: CustomerProps[],
      setSelectedCustomer: (customer: CustomerProps) => void,
      setCurrentSelectedCustomerStatus: (status: boolean) => void,
      onOpenView: () => void
    ) => handleViewCustomerFromUrl(
      search,
      customers,
      setSelectedCustomer,
      setCurrentSelectedCustomerStatus, 
      onOpenView
    ),

    handleCreateNewCustomer: (
      values: any,
      setIsLoadingCreating: React.Dispatch<React.SetStateAction<boolean>>,
      newCustomerImage: {
      file: File | null;
      tempImage: string;
      },
      customers: CustomerProps[],
      setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
      setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
      resetNewCustomerModal: UseFormReset<FieldValues>,
      closeNewCustomerModal: () => void,
      toast: (props: ToastProps) => void
    ) => handleCreateNewCustomer(
      values,
      setIsLoadingCreating,
      newCustomerImage,
      customers,
      setCustomers,
      setCustomersFiltered,
      resetNewCustomerModal,
      closeNewCustomerModal,
      toast
    ),

     handleUpdateCustomer: (
      values: any,
      setIsLoadingUpdating: React.Dispatch<React.SetStateAction<boolean>>,
      currentSelectedCustomerStatus: boolean,
      selectedCustomer: CustomerProps,
      customers: CustomerProps[],
      setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
      customersFiltered: CustomerProps[],
      setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
      resetUpdateCustomerModal:  UseFormReset<FieldValues>,
      clearUpdateErrors: UseFormClearErrors<FieldValues>,
      setCurrentSelectedCustomerProjects:React.Dispatch<React.SetStateAction<CustomerProjectsProps | undefined>>,
      onCloseUpdate: () => void,
      toast: (props: ToastProps) => void
     ) =>  handleUpdateCustomer(
      values,
      setIsLoadingUpdating,
      currentSelectedCustomerStatus,
      selectedCustomer,
      customers,
      setCustomers,
      customersFiltered,
      setCustomersFiltered,
      resetUpdateCustomerModal,
      clearUpdateErrors,
      setCurrentSelectedCustomerProjects,
      onCloseUpdate,
      toast
     ),

     handleDeleteCustomer: (
      customer_id: number,
      setIsLoadingDelete: React.Dispatch<React.SetStateAction<boolean>>,
      customers: CustomerProps[],
      setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
      customersFiltered: CustomerProps[],
      setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
      toast: (props: ToastProps) => void
     ) => handleDeleteCustomer(
      customer_id,
      setIsLoadingDelete,
      customers,
      setCustomers,
      customersFiltered,
      setCustomersFiltered,
      toast
     ),

     handleViewSelectedCustomer: (
      customer_id: number,
      customers: CustomerProps[],
      setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerProps>>,
      setCurrentSelectedCustomerStatus: React.Dispatch<React.SetStateAction<boolean>>,
      onOpenView: () => void 
     ) => handleViewSelectedCustomer(
      customer_id,
      customers,
      setSelectedCustomer, 
      setCurrentSelectedCustomerStatus, 
      onOpenView
     ),

     handleSelectCustomer: (
      customer_id: number,
      resetUpdateCustomerModal: UseFormReset<FieldValues>,
      clearUpdateErrors: UseFormClearErrors<FieldValues>,
      customers: CustomerProps[],
      setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerProps>>,
      setValueUpdate: UseFormSetValue<FieldValues>,
      setCurrentSelectedCustomerStatus: React.Dispatch<React.SetStateAction<boolean>>,
      onOpenUpdate: () => void
     ) => handleSelectCustomer(
      customer_id,
      resetUpdateCustomerModal, 
      clearUpdateErrors, 
      customers,
      setSelectedCustomer, 
      setValueUpdate,
      setCurrentSelectedCustomerStatus,
      onOpenUpdate
     ),

     handleCloseNewCustomerModal:(
      setNewCustomerImage: React.Dispatch<React.SetStateAction<{
      file: File | null;
      tempImage: string;
      }>>,
      clearErrors: UseFormClearErrors<FieldValues>,
      resetNewCustomerModal: UseFormReset<FieldValues>,
      onClose: () => void
     ) => handleCloseNewCustomerModal(
      setNewCustomerImage,
      clearErrors,
      resetNewCustomerModal,
      onClose  
     ),

     handleNewCustomerImage: (
        e: ChangeEvent<HTMLInputElement>,
        setNewCustomerImage: React.Dispatch<React.SetStateAction<{
        file: File | null;
        tempImage: string;
        }>>,
        toast: (props: ToastProps) => void
     ) => handleNewCustomerImage(
        e,
        setNewCustomerImage, 
        toast
     ),

     handleImageUpdate: (
      e: ChangeEvent<HTMLInputElement>,
      selectedCustomer: CustomerProps,
      customers: CustomerProps[],
      setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
      setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerProps>>,
      toast: (props: ToastProps) => void
     ) => handleImageUpdate(
      e, 
      selectedCustomer, 
      customers, 
      setCustomers, 
      setSelectedCustomer, 
      toast
     )
  }

  const utils = {
    onCloseCustomerView: (
      history: History<unknown>, 
      onCloseView: () => void
    ) => onCloseCustomerView(
      history,
      onCloseView
    ),

    filterCustomersByName: (
      name: string,
      customers: CustomerProps[],
      setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    ) => filterCustomersByName(
      name, 
      customers,
      setCustomersFiltered
    ),

    typeOfCustomers: (
      customerStatus: string,
      customersFiltered:  CustomerProps[]
    ) => typeOfCustomers(
      customerStatus,
      customersFiltered
    ),

    loadCurrentCustomerProjectsToShowAtStatus: (
      currentSelectedCustomerProjects: CustomerProjectsProps | undefined,
      selectedCustomer: CustomerProps,
      currentSelectedCustomerStatus: boolean,
      setCurrentSelectedCustomerProjects: React.Dispatch<React.SetStateAction<CustomerProjectsProps | undefined>>
    ) => loadCurrentCustomerProjectsToShowAtStatus(
      currentSelectedCustomerProjects,
      selectedCustomer,
      currentSelectedCustomerStatus,
      setCurrentSelectedCustomerProjects
    )
  }

  return {
    states: {
      customers,
      customersFiltered,
      setCustomers,
      setCustomersFiltered,
      setLoadingCustomers,
      newCustomerStatus, 
      setNewCustomerStatus,
      loadingCustomers,
      isLoadingDelete, 
      setIsLoadingDelete,
      filters,
      search,
      selectedCustomer,
      setSelectedCustomer,
      isLoadingUpdating,
      setIsLoadingUpdating,
      currentSelectedCustomerStatus,
      setCurrentSelectedCustomerStatus,
      currentSelectedCustomerProjects, 
      setCurrentSelectedCustomerProjects,
      onOpenView,
      isOpenView,
      onCloseView,
      isOpenUpdate,
      onOpenUpdate,
      onCloseUpdate,
      isOpen, 
      onOpen, 
      onClose,
      onOpenCustomerStatus, 
      onCloseCustomerStatus, 
      isOpenCustomerStatus,
      isLoadingCreating, 
      setIsLoadingCreating,
      newCustomerImage, 
      setNewCustomerImage,
      history,
      toast
    },

    handles,
    utils
  }
}