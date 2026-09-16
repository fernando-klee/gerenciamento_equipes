import { api } from "../../../services/api"
import { ChangeEvent } from "react"
import { CustomerProps } from "../interfaces"  
import { ToastProps } from "@chakra-ui/react"


export async function handleImageUpdate(
    e: ChangeEvent<HTMLInputElement>,
    selectedCustomer: CustomerProps,
    customers: CustomerProps[],
    setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerProps>>,
    toast: (props: ToastProps) => void
) {
        if (selectedCustomer && e.target.files) {
            const data = new FormData()
            const photo = e.target.files[0] as { size: number, type: string }
            const photoDataSize = photo.size > (1024 * 1024) * 5
            const photoDataType = photo.type !== 'image/png' && photo.type !== 'image/jpeg'

            if (photoDataSize) {
                toast({
                    title: 'Foto não pode ser maior que 5mb!',
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                })
            }

            if (photoDataType) {
                toast({
                    title: 'Imagem deve ser em formato PNG ou JPEG!',
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                })
            }

            if (!photoDataSize && !photoDataType) {
                data.append('image', e.target.files[0])

                api.patch(`/customers/${selectedCustomer.id}`, data)
                    .then(res => {
                        const newCustomerUpdated = res.data as CustomerProps
                        const customerImage = newCustomerUpdated.image_url

                        const oldCustomers = [...customers]
                        const customerIndex = oldCustomers.findIndex(r => r.id === selectedCustomer.id)
                        const oldCurrentCustomer = oldCustomers[customerIndex]
                        oldCurrentCustomer.image_url = customerImage
                        oldCustomers[customerIndex] = oldCurrentCustomer
                        setCustomers(oldCustomers)

                        setSelectedCustomer(oldProps => {
                            return { ...oldProps, image_url: customerImage }
                        })

                        toast({
                            title: 'Foto atualizada!',
                            status: 'success',
                            duration: 4000,
                            isClosable: true
                        })
                    })
                    .catch(err => {
                        toast({
                            title: 'Error ao tentar atualizar foto',
                            status: 'error',
                            duration: 4000,
                            isClosable: true
                        })
                    })
            }
        }
    }