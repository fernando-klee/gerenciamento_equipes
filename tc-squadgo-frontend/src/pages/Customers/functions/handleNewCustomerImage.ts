import { ToastProps } from "@chakra-ui/react";
import { ChangeEvent } from "react"


export async function handleNewCustomerImage(
    e: ChangeEvent<HTMLInputElement>,
    setNewCustomerImage: React.Dispatch<React.SetStateAction<{
    file: File | null;
    tempImage: string;
    }>>,
    toast: (props: ToastProps) => void
) {
        if (e.target.files) {
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
                setNewCustomerImage({ file: e.target.files[0], tempImage: URL.createObjectURL(e.target.files[0]) })
            }
        }
    }