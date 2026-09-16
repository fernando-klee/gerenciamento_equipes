import { api } from "../../../../../services/api"
import { format, parseISO } from "date-fns"
import { OneOnOneProps } from "../../interfaces"
import { handleCloseNewModal } from "./handleCloseNewModal"
import { FieldValues, UseFormClearErrors, UseFormReset } from "react-hook-form"

export async function handleCreate(
    data: any,
    setLoadingCreating: React.Dispatch<React.SetStateAction<boolean>>,
    user: any,
    resource_id: string,
    oneOnOnes: OneOnOneProps[],
    setOneOnOnesFiltered: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
    setOneOnOnes: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
    resetCreate: UseFormReset<FieldValues>,
    clearErrorsCreate: UseFormClearErrors<FieldValues>,
    onClose: () => void,
    toast: any
) {
        setLoadingCreating(true)
        try {
            const payload = {
                description: data.description,
                type: data.type,
                leaderId: user.id,
                resourceId: Number(resource_id)
            }

            const response = await api.post('/one-on-one', payload)

            const oneOnOneCreated = response.data as OneOnOneProps
            const oneOnOneCreatedFormatted: any = {
                ...oneOnOneCreated,
                createdAt: format(parseISO(oneOnOneCreated.createdAt), 'dd/MM/yyyy'),
                leaderName: user.name
            }

            const oldOneOnOnes = [...oneOnOnes, oneOnOneCreatedFormatted]
            setOneOnOnesFiltered(oldOneOnOnes)
            setOneOnOnes(oldOneOnOnes)

            toast({
                title: 'Anotação criada com sucesso',
                status: 'success',
                duration: 4000,
                isClosable: true
            })

            handleCloseNewModal(
                resetCreate,
                clearErrorsCreate,
                onClose
            )
            window.location.reload()
        } catch (error: any) {
            console.error('Error creating one-on-one:', error)
            toast({
                title: 'Erro ao criar anotação',
                description: error.response?.data?.message || 'Ocorreu um erro ao criar a anotação',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
        } finally {
            setLoadingCreating(false)
        }
    }